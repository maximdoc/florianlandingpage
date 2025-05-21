'use client';

import { useEffect, useState } from 'react';
import { initializeContent } from '@/actions/initActions';
import { initializeContentData } from '@/hooks/useContent';

export default function ContentInitializer() {
  const [retries, setRetries] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    // Initialize client-side cache first for immediate UI rendering
    initializeContentData();
    
    // Then initialize server-side content for full data synchronization
    async function initContent() {
      try {
        console.log('Initializing server content...');
        const result = await initializeContent();
        
        if (result.status === 'error' && retries < MAX_RETRIES) {
          console.warn(`Content initialization failed, retrying (${retries + 1}/${MAX_RETRIES})...`);
          setTimeout(() => {
            setRetries(prev => prev + 1);
          }, 2000); // Retry after 2 seconds
        } else {
          console.log('Content initializer response:', result);
          
          // After server initialization, refresh client cache
          initializeContentData();
        }
      } catch (error) {
        console.error('Error initializing content:', error);
        
        if (retries < MAX_RETRIES) {
          console.warn(`Content initialization error, retrying (${retries + 1}/${MAX_RETRIES})...`);
          setTimeout(() => {
            setRetries(prev => prev + 1);
          }, 2000); // Retry after 2 seconds
        }
      }
    }
    
    // Slight delay to prioritize client-side rendering first
    const timeoutId = setTimeout(() => {
      initContent();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [retries]);
  
  // This component doesn't render anything
  return null;
} 