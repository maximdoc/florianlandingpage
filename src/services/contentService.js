'use server';

import fs from 'fs';
import path from 'path';
import Content from '@/models/Content';
import { connectToDatabase } from '@/lib/mongodb';

// Path to the content JSON file
const CONTENT_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'content.json');

// Cache for content data
let contentCache = null;
let lastDbFetchTime = 0;
const CACHE_TTL = 10000; // Reduced from 60000 to 10000 (10 seconds) for more frequent checks

/**
 * Read content from the JSON file
 * @returns {Object|null} The content from the JSON file or null if not found
 */
function readContentFile() {
  try {
    if (!fs.existsSync(CONTENT_JSON_PATH)) {
      console.log('Content file does not exist');
      return null;
    }
    
    const contentData = JSON.parse(fs.readFileSync(CONTENT_JSON_PATH, 'utf8'));
    return contentData;
  } catch (error) {
    console.error('Error reading content file:', error);
    return null;
  }
}

/**
 * Write content to the JSON file
 * @param {Object} content - The content to write
 * @returns {boolean} Success status
 */
function writeContentFile(content) {
  try {
    fs.writeFileSync(CONTENT_JSON_PATH, JSON.stringify(content, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing content file:', error);
    return false;
  }
}

/**
 * Fetch content from database
 * @param {boolean} forceRefresh - Whether to bypass cache and force a fresh fetch
 * @returns {Object|null} The content from the database or null if not found
 */
async function fetchContentFromDb(forceRefresh = false) {
  try {
    // Check if we should use the cache
    const now = Date.now();
    if (!forceRefresh && contentCache && now - lastDbFetchTime < CACHE_TTL) {
      return contentCache;
    }

    // Connect to database
    await connectToDatabase();
    
    // Get the active content version
    const dbContent = await Content.findOne({ active: true })
      .sort({ version: -1 })
      .lean();
    
    if (!dbContent) {
      return null;
    }
    
    // Update cache
    contentCache = dbContent;
    lastDbFetchTime = now;
    
    return dbContent;
  } catch (error) {
    console.error('Error fetching content from database:', error);
    return null;
  }
}

/**
 * Check for updates in the database in the background and update the static file
 * This doesn't block the initial response
 */
async function checkForUpdatesInBackground() {
  try {
    console.log('Checking for content updates in the database...');
    const dbContent = await fetchContentFromDb(true); // Force refresh from database
    
    // If we have content from the database, update the static file
    if (dbContent) {
      // Format content for the file (remove MongoDB specific fields)
      const fileContent = {
        global: dbContent.global || {},
        pages: dbContent.pages || []
      };
      
      // Write to file
      writeContentFile(fileContent);
      
      // Update cache
      contentCache = dbContent;
      lastDbFetchTime = Date.now();
      console.log('Content updated from database, timestamp:', dbContent.timestamp);
    }
  } catch (error) {
    console.error('Error checking for updates in background:', error);
  }
}

/**
 * Refresh content directly from the database
 * This is a public method that can be called to force an immediate refresh
 */
async function refreshContentFromDb() {
  try {
    console.log('Forcing content refresh from database...');
    // Clear cache first
    contentCache = null;
    lastDbFetchTime = 0;
    
    // Force fetch fresh content
    const dbContent = await fetchContentFromDb(true);
    
    if (!dbContent) {
      console.log('No content found in database during refresh');
      return null;
    }
    
    // Format content for the file (remove MongoDB specific fields)
    const fileContent = {
      global: dbContent.global || {},
      pages: dbContent.pages || []
    };
    
    // Write to file
    writeContentFile(fileContent);
    
    console.log('Content successfully refreshed from database, version:', dbContent.version);
    
    return {
      ...fileContent,
      version: dbContent.version,
      timestamp: dbContent.timestamp
    };
  } catch (error) {
    console.error('Error refreshing content from database:', error);
    return null;
  }
}

/**
 * Get complete content collection
 * Prioritizes fast loading from static file, then checks for DB updates
 */
export async function getCompleteContent() {
  try {
    // First, read from the static file for fast loading
    const fileContent = readContentFile();
    
    // Schedule a background check for updates 
    // This won't block the response
    setTimeout(() => checkForUpdatesInBackground(), 0);
    
    if (!fileContent) {
      // If static file is not available, fallback to DB
      console.log('Static file not available, falling back to database');
      const dbContent = await fetchContentFromDb();
      return dbContent ? {
        global: dbContent.global || {},
        pages: dbContent.pages || [],
        version: dbContent.version,
        timestamp: dbContent.timestamp
      } : null;
    }
    
    return fileContent;
  } catch (error) {
    console.error('Error fetching complete content:', error);
    throw error;
  }
}

/**
 * Get global content (header, footer, etc.)
 */
export async function getGlobalContent() {
  try {
    // Read from static file first
    const content = readContentFile();
    
    // Schedule background check
    setTimeout(() => checkForUpdatesInBackground(), 0);
    
    if (!content || !content.global) {
      // Fallback to database
      const dbContent = await fetchContentFromDb();
      return dbContent?.global || null;
    }
    
    return content.global;
  } catch (error) {
    console.error('Error fetching global content:', error);
    throw error;
  }
}

/**
 * Get content for a specific page by slug
 * @param {string} slug - The page slug
 */
export async function getPageBySlug(slug) {
  try {
    // Read from static file first
    const content = readContentFile();
    
    // Schedule background check
    setTimeout(() => checkForUpdatesInBackground(), 0);
    
    if (!content || !content.pages || content.pages.length === 0) {
      // Fallback to database
      const dbContent = await fetchContentFromDb();
      if (!dbContent || !dbContent.pages) return null;
      
      return dbContent.pages.find(page => page.slug === slug) || null;
    }
    
    // Find the page with the matching slug
    const page = content.pages.find(page => page.slug === slug);
    
    if (!page) {
      console.log(`Page with slug "${slug}" not found in file`);
      return null;
    }
    
    return page;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Get all pages
 */
export async function getAllPages() {
  try {
    // Read from static file first
    const content = readContentFile();
    
    // Schedule background check
    setTimeout(() => checkForUpdatesInBackground(), 0);
    
    if (!content || !content.pages) {
      // Fallback to database
      const dbContent = await fetchContentFromDb();
      return dbContent?.pages || [];
    }
    
    return content.pages;
  } catch (error) {
    console.error('Error fetching all pages:', error);
    throw error;
  }
}

/**
 * Update global content
 * @param {Object} globalContent - The global content to update
 */
export async function updateGlobalContent(globalContent) {
  try {
    // Read current content from file
    let content = readContentFile() || { global: {}, pages: [] };
    
    // Update file content
    content.global = globalContent;
    writeContentFile(content);
    
    // Update in database
    await connectToDatabase();
    
    // Get the latest version
    const latestContent = await Content.findOne({}).sort({ version: -1 }).lean();
    const newVersion = latestContent ? (parseInt(latestContent.version, 10) || 0) + 1 : 1;
    
    // Set all existing versions to inactive
    if (latestContent) {
      await Content.updateMany({}, { active: false });
    }
    
    // Create new version
    await Content.create({
      version: newVersion,
      active: true,
      timestamp: new Date(),
      global: globalContent,
      pages: content.pages
    });
    
    // Invalidate cache
    contentCache = null;
    
    return { 
      global: globalContent,
      pages: content.pages,
      version: newVersion,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error updating global content:', error);
    throw error;
  }
}

/**
 * Update page by slug
 * @param {string} slug - The page slug
 * @param {Object} pageData - The page data to update
 */
export async function updatePageBySlug(slug, pageData) {
  try {
    // Read current content from file
    let content = readContentFile() || { global: {}, pages: [] };
    
    // Find page index
    const pageIndex = content.pages.findIndex(page => page.slug === slug);
    
    // Update pages in file content
    if (pageIndex === -1) {
      content.pages.push(pageData);
    } else {
      content.pages[pageIndex] = pageData;
    }
    
    // Write to file
    writeContentFile(content);
    
    // Update in database
    await connectToDatabase();
    
    // Get the latest version
    const latestContent = await Content.findOne({}).sort({ version: -1 }).lean();
    const newVersion = latestContent ? (parseInt(latestContent.version, 10) || 0) + 1 : 1;
    
    // Set all existing versions to inactive
    if (latestContent) {
      await Content.updateMany({}, { active: false });
    }
    
    // Create new version
    await Content.create({
      version: newVersion,
      active: true,
      timestamp: new Date(),
      global: content.global,
      pages: content.pages
    });
    
    // Invalidate cache
    contentCache = null;
    
    return pageData;
  } catch (error) {
    console.error(`Error updating page with slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Update complete content
 * @param {Object} completeContent - The complete content to update
 */
export async function updateCompleteContent(completeContent) {
  try {
    // Prepare content for file update (remove MongoDB specific fields)
    const fileContent = {
      global: completeContent.global || {},
      pages: completeContent.pages || []
    };
    
    // Update file
    writeContentFile(fileContent);
    
    // Update in database
    await connectToDatabase();
    
    // Get the latest version
    const latestContent = await Content.findOne({}).sort({ version: -1 }).lean();
    const newVersion = latestContent ? (parseInt(latestContent.version, 10) || 0) + 1 : 1;
    
    // Set all existing versions to inactive
    if (latestContent) {
      await Content.updateMany({}, { active: false });
    }
    
    // Create new version - IMPORTANT: don't use version from input data
    await Content.create({
      version: newVersion,
      active: true,
      timestamp: new Date(),
      global: completeContent.global || {},
      pages: completeContent.pages || []
    });
    
    // Invalidate cache
    contentCache = null;
    
    return {
      ...fileContent,
      version: newVersion,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error updating complete content:', error);
    throw error;
  }
}

/**
 * Get content version info
 */
export async function getContentVersionInfo() {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Get the active content version
    const activeContent = await Content.findOne({ active: true })
      .sort({ version: -1 })
      .select('version timestamp')
      .lean();
    
    if (!activeContent) {
      return { version: 0, timestamp: null, versionCount: 0 };
    }
    
    // Get version count
    const versionCount = await Content.countDocuments({});
    
    // Ensure version is a valid number
    const version = parseInt(activeContent.version, 10) || 0;
    
    return {
      version,
      timestamp: activeContent.timestamp,
      versionCount
    };
  } catch (error) {
    console.error('Error getting content version info:', error);
    return { version: 0, timestamp: null, versionCount: 0 };
  }
}

/**
 * Get all content versions (for admin panel)
 */
export async function getAllVersions() {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Get all versions with basic info
    const versions = await Content.find({})
      .select('version active timestamp')
      .sort({ version: -1 })
      .lean();
    
    return versions;
  } catch (error) {
    console.error('Error getting all content versions:', error);
    return [];
  }
}

/**
 * Get a specific version of content
 * @param {number} version - The version number
 */
export async function getVersionedContent(version) {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Get specific version
    const versionedContent = await Content.findOne({ version })
      .lean();
    
    if (!versionedContent) {
      return null;
    }
    
    return {
      global: versionedContent.global || {},
      pages: versionedContent.pages || [],
      version: versionedContent.version,
      active: versionedContent.active,
      timestamp: versionedContent.timestamp
    };
  } catch (error) {
    console.error(`Error getting content version ${version}:`, error);
    return null;
  }
}

/**
 * Activate a specific version of content
 * @param {number} version - The version to activate
 */
export async function activateVersion(version) {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Set all versions to inactive
    await Content.updateMany({}, { active: false });
    
    // Set the specified version to active
    const result = await Content.updateOne(
      { version }, 
      { active: true }
    );
    
    if (result.modifiedCount === 0) {
      throw new Error(`Version ${version} not found`);
    }
    
    // Get the activated content
    const activatedContent = await Content.findOne({ version }).lean();
    
    // Update file
    const fileContent = {
      global: activatedContent.global || {},
      pages: activatedContent.pages || []
    };
    
    writeContentFile(fileContent);
    
    // Invalidate cache
    contentCache = null;
    
    return {
      global: activatedContent.global || {},
      pages: activatedContent.pages || [],
      version: activatedContent.version,
      active: true,
      timestamp: activatedContent.timestamp
    };
  } catch (error) {
    console.error(`Error activating content version ${version}:`, error);
    throw error;
  }
}

/**
 * Force a refresh of content from the database
 * Call this when you need to ensure you have the latest content
 */
export async function refreshContentFromDatabase() {
  return await refreshContentFromDb();
} 