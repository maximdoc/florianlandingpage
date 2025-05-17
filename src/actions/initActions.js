'use server';

import { getCompleteContent } from '@/services/contentService';
import { revalidatePath } from 'next/cache';

/**
 * Initialize the content
 */
export async function initializeContent() {
  try {
    console.log('Initializing content...');
    const content = await getCompleteContent();
    
    if (!content) {
      return {
        status: 'error',
        message: 'No content found in file for initialization'
      };
    }
    
    // Revalidate root path
    revalidatePath('/');
    
    return {
      status: 'success',
      message: 'Content initialized successfully',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error initializing content:', error);
    return {
      status: 'error',
      message: 'Failed to initialize content: ' + error.message
    };
  }
} 