import { getGlobalContent, getPageContent, getAllPages as getAllPagesAction } from '@/actions/contentActions';

/**
 * Function to get the base URL considering the current environment
 * @returns {string} Base URL
 */
function getBaseUrl() {
  // If code is running in browser
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // If code is running on server
  // Use Vercel environment variables or localhost
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // For local development
  return 'http://localhost:3000';
}

/**
 * Gets global site settings
 * @returns {Promise<Object>} Global site settings
 */
export const getGlobalSettings = async () => {
  try {
    const globalContent = await getGlobalContent();
    
    if (globalContent.error) {
      console.error('Failed to fetch global settings:', globalContent.error);
      return {};
    }
    return globalContent;
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return {};
  }
};

/**
 * Gets page data by ID
 * @param {string} pageId - Page ID
 * @returns {Promise<Object|null>} Page data or null if page not found
 */
export const getPageById = async (pageId) => {
  try {
    // Get all pages
    const pages = await getAllPagesAction();
    return Array.isArray(pages) ? pages.find(page => page.id === pageId) || null : null;
  } catch (error) {
    console.error(`Error fetching page with ID ${pageId}:`, error);
    return null;
  }
};

/**
 * Gets page data by slug
 * @param {string} slug - Page slug
 * @returns {Promise<Object|null>} Page data or null if page not found
 */
export const getPageBySlug = async (slug) => {
  try {
    // For home page, use a special route
    if (slug === '/' || slug === '') {
      // Get all pages and find the page with id='home'
      const pages = await getAllPagesAction();
      return Array.isArray(pages) ? pages.find(page => page.id === 'home') || null : null;
    }
    
    // Normalize slug, removing initial slash if present
    const normalizedSlug = slug.startsWith('/') ? slug.substring(1) : slug;
    const pageData = await getPageContent(normalizedSlug);
    
    if (pageData.error) {
      console.error(`Failed to fetch page with slug ${slug}:`, pageData.error);
      return null;
    }
    
    return pageData;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
};

/**
 * Gets section by ID
 * @param {string} pageId - Page ID
 * @param {string} sectionId - Section ID
 * @returns {Promise<Object|null>} Section data or null if section not found
 */
export const getSectionById = async (pageId, sectionId) => {
  try {
    const page = await getPageById(pageId);
    if (!page) return null;
    
    return page.sections.find(section => section.id === sectionId) || null;
  } catch (error) {
    console.error(`Error fetching section with ID ${sectionId} from page ${pageId}:`, error);
    return null;
  }
};

/**
 * Gets all sections for a page
 * @param {string} pageId - Page ID
 * @returns {Promise<Array>} Array of page sections or empty array if page not found
 */
export const getAllSections = async (pageId) => {
  try {
    const page = await getPageById(pageId);
    if (!page) return [];
    
    return page.sections || [];
  } catch (error) {
    console.error(`Error fetching sections from page ${pageId}:`, error);
    return [];
  }
};

/**
 * Gets all sections of a specific type for a page
 * @param {string} pageId - Page ID
 * @param {string} sectionType - Section type
 * @returns {Promise<Array>} Array of sections of specified type or empty array
 */
export const getSectionsByType = async (pageId, sectionType) => {
  try {
    const page = await getPageById(pageId);
    if (!page) return [];
    
    return page.sections.filter(section => section.type === sectionType) || [];
  } catch (error) {
    console.error(`Error fetching sections of type ${sectionType} from page ${pageId}:`, error);
    return [];
  }
};

/**
 * Gets all pages
 * @returns {Promise<Array>} Array of all pages
 */
export const getAllPages = async () => {
  try {
    const pages = await getAllPagesAction();
    
    if (!Array.isArray(pages)) {
      console.error('Failed to fetch pages:', pages.error || 'Invalid data format');
      return [];
    }
    
    return pages;
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return [];
  }
}; 