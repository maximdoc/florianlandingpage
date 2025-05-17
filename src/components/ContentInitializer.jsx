'use client';

import { useEffect, useState } from 'react';
import { initializeContent } from '@/actions/initActions';

export default function ContentInitializer() {
  const [retries, setRetries] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    // Initialize the content when the component mounts
    async function initContent() {
      try {
        console.log('Initializing content...');
        const result = await initializeContent();
        
        if (result.status === 'error' && retries < MAX_RETRIES) {
          console.warn(`Content initialization failed, retrying (${retries + 1}/${MAX_RETRIES})...`);
          setTimeout(() => {
            setRetries(prev => prev + 1);
          }, 2000); // Retry after 2 seconds
        } else {
          console.log('Content initializer response:', result);
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
    
    initContent();
  }, [retries]);
  
  // This component doesn't render anything
  return null;
} 