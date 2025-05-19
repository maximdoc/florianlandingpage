'use server';

import { revalidatePath } from 'next/cache';
import { contentService } from '@/services/contentService';

/**
 * Function to refresh content without caching
 */
async function refreshContent() {
  try {
    // Fetch fresh content from JSON file
    console.log('Refreshing content...');
    const content = await contentService.getCompleteContent();
    
    if (!content) {
      console.error('No content found in file');
      return { 
        status: 'error',
        message: 'No content found in file'
      };
    }
    
    console.log('Content refreshed successfully');
    return { 
      status: 'success',
      message: 'Content refreshed successfully',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error refreshing content:', error);
    return {
      status: 'error',
      message: `Failed to refresh content: ${error.message}`
    };
  }
}

/**
 * Safely serialize data to break any circular references
 * 
 * @param {Object} data - Data to sanitize
 * @returns {Object} Sanitized data without circular references
 */
function sanitizeData(data) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error sanitizing data:', error);
    throw new Error('Invalid data structure: contains circular references');
  }
}

/**
 * Limit the depth of nested objects to prevent maximum call stack size exceeded errors
 * 
 * @param {Object} obj - Object to process
 * @param {number} maxDepth - Maximum allowed depth
 * @param {number} currentDepth - Current depth (for recursion)
 * @returns {Object} - Processed object with limited depth
 */
function limitObjectDepth(obj, maxDepth = 10, currentDepth = 0) {
  // Handle null, undefined, or primitive values
  if (obj === null || obj === undefined || typeof obj !== 'object') return obj;
  
  // Stop if we've reached max depth
  if (currentDepth >= maxDepth) return "[MAX_DEPTH]";
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => limitObjectDepth(item, maxDepth, currentDepth + 1));
  }
  
  // Handle objects
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = limitObjectDepth(obj[key], maxDepth, currentDepth + 1);
    }
  }
  return result;
}

/**
 * Server action to update website content in JSON file
 * 
 * @param {Object} contentData - Object containing global and page content
 * @returns {Object} Result of the update operation
 */
export async function updateWebsiteContent(contentData) {
  console.log('Starting update process');
  
  try {
    if (!contentData) {
      throw new Error('No content data provided');
    }
    
    if (!contentData.global && (!contentData.pages || !Array.isArray(contentData.pages) || contentData.pages.length === 0)) {
      throw new Error('Invalid content structure: must include global content or pages array');
    }
    
    // Create a safe copy to work with, avoiding circular references or deep nesting
    try {
      // Sanitize input data to prevent circular references
      let sanitizedData = sanitizeData(contentData);
      
      // Apply depth limitation to prevent stack overflow
      sanitizedData = limitObjectDepth(sanitizedData, 10);
      
      const result = {};
      const updatedPaths = ['/'];
      
      // Update complete content with sanitized data
      console.log('Updating complete content');
      await contentService.updateCompleteContent(sanitizedData);
      
      console.log('Content updated successfully');
      
      // Revalidate all affected paths
      console.log('Revalidating paths');
      for (const path of updatedPaths) {
        revalidatePath(path);
        console.log(`Revalidated path: ${path}`);
      }
      
      return {
        success: true,
        message: 'Content updated successfully',
        revalidatedPaths: updatedPaths
      };
    } catch (error) {
      console.error('Error processing content data:', error);
      throw new Error(`Failed to process content data: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in updateWebsiteContent server action:', error);
    throw new Error(error.message || 'Failed to update website content');
  }
} 