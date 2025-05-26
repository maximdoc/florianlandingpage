'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AdditionalCtasSection from './sections/AdditionalCtasSection';

export default function PageLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Navbar />
      <main 
        className="page-content"
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          boxSizing: 'border-box',
          overflowX: 'hidden'
        }}
      >
        <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
          {children}
        </div>
      </main>
      <Footer />
      <AdditionalCtasSection />
    </>
  );
} 