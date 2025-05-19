import fs from 'fs';
import path from 'path';

// Path to the content JSON file
const CONTENT_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'content.json');

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
 * Content service for managing website content
 * Works directly with the local JSON file
 */
export const contentService = {
  /**
   * Get complete content collection
   */
  async getCompleteContent() {
    try {
      // Read content directly from the JSON file
      const content = readContentFile();
      
      if (!content) {
        console.log('No content available from file');
        return null;
      }
      
      return content;
    } catch (error) {
      console.error('Error fetching complete content:', error);
      throw error;
    }
  },

  /**
   * Get global content (header, footer, etc.)
   */
  async getGlobalContent() {
    try {
      // Read from JSON file
      const content = readContentFile();
      
      if (!content || !content.global) {
        console.log('Global content not found in file');
        return null;
      }
      
      return content.global;
    } catch (error) {
      console.error('Error fetching global content:', error);
      throw error;
    }
  },

  /**
   * Get content for a specific page by slug
   * @param {string} slug - The page slug
   */
  async getPageBySlug(slug) {
    try {
      // Read from JSON file
      const content = readContentFile();
      
      if (!content || !content.pages || content.pages.length === 0) {
        console.log(`No pages found in file when looking for slug "${slug}"`);
        return null;
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
  },

  /**
   * Get all pages
   */
  async getAllPages() {
    try {
      // Read from JSON file
      const content = readContentFile();
      
      if (!content || !content.pages) {
        console.log('No pages found in file');
        return [];
      }
      
      return content.pages;
    } catch (error) {
      console.error('Error fetching all pages:', error);
      throw error;
    }
  },

  /**
   * Update global content
   * @param {Object} globalContent - The global content to update
   */
  async updateGlobalContent(globalContent) {
    try {
      // Read current content
      let content = readContentFile();
      
      if (!content) {
        // Create new content if it doesn't exist
        content = { global: globalContent, pages: [] };
      } else {
        // Update existing content
        content.global = globalContent;
      }
      
      // Update the file
      fs.writeFileSync(CONTENT_JSON_PATH, JSON.stringify(content, null, 2), 'utf8');
      
      return content;
    } catch (error) {
      console.error('Error updating global content:', error);
      throw error;
    }
  },

  /**
   * Update page by slug
   * @param {string} slug - The page slug
   * @param {Object} pageData - The page data to update
   */
  async updatePageBySlug(slug, pageData) {
    try {
      // Read current content
      let content = readContentFile();
      
      if (!content) {
        // Create new content if it doesn't exist
        content = { 
          global: {}, 
          pages: [pageData] 
        };
      } else {
        // Make sure pages array exists
        if (!content.pages) {
          content.pages = [];
        }
        
        // Find the page index
        const pageIndex = content.pages.findIndex(page => page.slug === slug);
        
        if (pageIndex === -1) {
          // Page not found, add it
          content.pages.push(pageData);
        } else {
          // Update existing page
          content.pages[pageIndex] = pageData;
        }
      }
      
      // Update the file
      fs.writeFileSync(CONTENT_JSON_PATH, JSON.stringify(content, null, 2), 'utf8');
      
      return pageData;
    } catch (error) {
      console.error(`Error updating page with slug ${slug}:`, error);
      throw error;
    }
  },

  /**
   * Update complete content
   * @param {Object} completeContent - The complete content to update
   */
  async updateCompleteContent(completeContent) {
    try {
      // Validate the content structure
      if (!completeContent) {
        throw new Error('Content cannot be null or undefined');
      }

      // Make sure we have at least a global object and pages array
      if (!completeContent.global) {
        completeContent.global = {};
      }
      
      if (!completeContent.pages || !Array.isArray(completeContent.pages)) {
        completeContent.pages = [];
      }
      
      // Create a temporary file path
      const tempFilePath = `${CONTENT_JSON_PATH}.temp`;
      
      // First write to a temporary file
      fs.writeFileSync(tempFilePath, JSON.stringify(completeContent, null, 2), 'utf8');
      
      // Verify the temporary file exists and is valid JSON
      try {
        const testRead = JSON.parse(fs.readFileSync(tempFilePath, 'utf8'));
        
        // If we can read it back successfully, move it to the actual file
        fs.renameSync(tempFilePath, CONTENT_JSON_PATH);
      } catch (validationError) {
        // Clean up the temp file if it exists
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
        throw new Error(`Generated invalid JSON: ${validationError.message}`);
      }
      
      return completeContent;
    } catch (error) {
      console.error('Error updating complete content:', error);
      throw error;
    }
  }
}; 