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
function limitObjectDepth(obj, maxDepth = 25, currentDepth = 0) {
  if (currentDepth >= maxDepth) return "[MAX_DEPTH]";
  if (obj === null || typeof obj !== 'object') return obj;
  
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
  console.log('Starting update process with data:', 
    JSON.stringify({
      hasGlobal: !!contentData?.global,
      pagesCount: contentData?.pages?.length || 0,
      pagesSlugs: contentData?.pages?.map(p => p.slug || 'no-slug') || []
    })
  );
  
  try {
    if (!contentData || (!contentData.global && !contentData.pages)) {
      throw new Error('Invalid content data provided');
    }
    
    // Sanitize input data to prevent circular references
    let sanitizedData = sanitizeData(contentData);
    
    // Apply depth limitation to prevent stack overflow
    sanitizedData = limitObjectDepth(sanitizedData);
    
    const result = {};
    const updatedPaths = ['/'];
    
    // Approach 1: Try updating the complete content in one operation
    try {
      console.log('Trying to update complete content in one operation');
      await contentService.updateCompleteContent(sanitizedData);
      result.success = true;
      console.log('Complete content update successful');
    } catch (completeUpdateError) {
      console.error('Complete content update failed, falling back to individual updates:', completeUpdateError);
      
      // Approach 2: Fall back to individual updates if complete update fails
      // Update global content if provided
      if (sanitizedData.global) {
        console.log('Updating global content');
        const globalResult = await contentService.updateGlobalContent(sanitizedData.global);
        result.global = 'updated';
      }
      
      // Update pages if provided
      if (sanitizedData.pages && Array.isArray(sanitizedData.pages)) {
        console.log(`Processing ${sanitizedData.pages.length} pages`);
        const pagesResult = [];
        
        for (const page of sanitizedData.pages) {
          // Ensure page has a slug, use a default if missing
          if (!page.slug) {
            console.warn('Page missing slug, setting default');
            page.slug = page.id || '/';
          }
          
          console.log(`Updating page with slug: ${page.slug}`);
          
          try {
            // Ensure we have all required fields for a page
            if (!page.title) {
              console.warn(`Page ${page.slug} missing title, adding default`);
              page.title = `Page ${page.id || ''}`;
            }
            
            const pageResult = await contentService.updatePageBySlug(page.slug, page);
            console.log(`Page ${page.slug} updated successfully`);
            pagesResult.push({ 
              slug: page.slug, 
              status: 'updated',
              id: page.id || 'unknown'
            });
            
            // Add page path to revalidation list
            if (!updatedPaths.includes(page.slug)) {
              updatedPaths.push(page.slug);
            }
          } catch (error) {
            console.error(`Error updating page ${page.slug}:`, error);
            pagesResult.push({ 
              slug: page.slug, 
              status: 'error', 
              message: error.message,
              id: page.id || 'unknown'
            });
          }
        }
        
        result.pages = pagesResult;
      }
    }
    
    // Revalidate all affected paths
    for (const path of updatedPaths) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }
    
    // Refresh content after updates
    try {
      const refreshResult = await refreshContent();
      result.contentRefreshed = true;
      console.log('Content refreshed successfully:', refreshResult);
    } catch (refreshError) {
      console.error('Error refreshing content:', refreshError);
      result.contentRefreshed = false;
      result.refreshError = refreshError.message;
    }
    
    console.log('Content update completed successfully:', result);
    
    return {
      success: true,
      message: 'Content updated successfully',
      result,
      revalidatedPaths: updatedPaths
    };
  } catch (error) {
    console.error('Error in updateWebsiteContent server action:', error);
    throw new Error(error.message || 'Failed to update website content');
  }
} 