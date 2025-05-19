'use server';

import { contentService } from '@/services/contentService';
import { revalidatePath } from 'next/cache';

/**
 * Get global content (header, footer, etc.)
 */
export async function getGlobalContent() {
  try {
    // Use content service to get global content
    const globalContent = await contentService.getGlobalContent();
    
    if (!globalContent) {
      return {
        error: 'Global content not found',
        status: 404
      };
    }
    
    revalidatePath('/');
    
    return globalContent;
  } catch (error) {
    console.error('Error fetching global content:', error);
    return {
      error: 'Failed to fetch global content',
      status: 500
    };
  }
}

/**
 * Get content for a specific page by slug
 */
export async function getPageContent(slug) {
  try {
    const pageContent = await contentService.getPageBySlug(slug);
    
    if (!pageContent) {
      return {
        error: `Page content not found for slug: ${slug}`,
        status: 404
      };
    }
    
    revalidatePath(`/${slug}`);
    
    return pageContent;
  } catch (error) {
    console.error(`Error fetching page content for ${slug}:`, error);
    return {
      error: `Failed to fetch page content for ${slug}`,
      status: 500
    };
  }
}

/**
 * Get all pages
 */
export async function getAllPages() {
  try {
    const pages = await contentService.getAllPages();
    return pages;
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return {
      error: 'Failed to fetch all pages',
      status: 500
    };
  }
}

/**
 * Sync content file
 */
export async function syncContent() {
  try {
    // Fetch content from the file
    const content = await contentService.getCompleteContent();
    
    if (!content) {
      return {
        status: 'error', 
        message: 'No content found in file to sync'
      };
    }
    
    // Revalidate all paths
    revalidatePath('/');
    
    return { 
      status: 'success', 
      message: 'Content synced successfully',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error syncing content:', error);
    return {
      status: 'error', 
      message: 'Failed to sync content'
    };
  }
}

/**
 * Update global content
 * @param {FormData} formData - Form data containing global content
 */
export async function updateGlobalContent(formData) {
  try {
    // Parse the form data - assuming JSON data is submitted in 'data' field
    const rawData = formData.get('data');
    let globalContent;
    
    try {
      globalContent = JSON.parse(rawData);
    } catch (parseError) {
      console.error('Error parsing global content JSON:', parseError);
      return { 
        success: false, 
        message: 'Invalid JSON format for global content'
      };
    }
    
    // Update global content
    await contentService.updateGlobalContent(globalContent);
    
    // Revalidate paths
    revalidatePath('/');
    
    return {
      success: true,
      message: 'Global content updated successfully'
    };
  } catch (error) {
    console.error('Error updating global content:', error);
    return {
      success: false,
      message: `Failed to update global content: ${error.message}`
    };
  }
}

/**
 * Update page content
 * @param {FormData} formData - Form data containing page content
 */
export async function updatePageContent(formData) {
  try {
    // Get slug and data from form
    const slug = formData.get('slug');
    const rawData = formData.get('data');
    
    if (!slug) {
      return {
        success: false,
        message: 'Page slug is required'
      };
    }
    
    let pageContent;
    try {
      pageContent = JSON.parse(rawData);
    } catch (parseError) {
      console.error('Error parsing page content JSON:', parseError);
      return { 
        success: false, 
        message: 'Invalid JSON format for page content'
      };
    }
    
    // Make sure the slug in the content matches the provided slug
    pageContent.slug = slug;
    
    // Update page content
    await contentService.updatePageBySlug(slug, pageContent);
    
    // Revalidate paths
    revalidatePath('/');
    revalidatePath(`/${slug}`);
    
    return {
      success: true,
      message: `Page "${slug}" updated successfully`
    };
  } catch (error) {
    console.error('Error updating page content:', error);
    return {
      success: false,
      message: `Failed to update page content: ${error.message}`
    };
  }
}

/**
 * Update complete content
 * @param {FormData} formData - Form data containing complete content
 */
export async function updateCompleteContent(formData) {
  try {
    // Parse the form data
    const rawData = formData.get('data');
    let completeContent;
    
    try {
      completeContent = JSON.parse(rawData);
    } catch (parseError) {
      console.error('Error parsing complete content JSON:', parseError);
      return { 
        success: false, 
        message: 'Invalid JSON format for complete content'
      };
    }
    
    // Update content
    await contentService.updateCompleteContent(completeContent);
    
    // Revalidate paths
    revalidatePath('/');
    
    return {
      success: true,
      message: 'Content updated successfully'
    };
  } catch (error) {
    console.error('Error updating complete content:', error);
    return {
      success: false,
      message: `Failed to update content: ${error.message}`
    };
  }
} 