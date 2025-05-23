'use client';

import { useEffect, useState } from 'react';

export default function BootstrapClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side once mounted
    setIsClient(true);
    
    // Import Bootstrap JS on the client side
    const loadBootstrap = async () => {
      await import('bootstrap/dist/js/bootstrap.bundle.min.js');
    };
    
    loadBootstrap();
  }, []);

  return null;
} 