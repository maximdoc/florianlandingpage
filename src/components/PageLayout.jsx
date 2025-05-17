'use client';

import Navbar from './Navbar';
import Footer from './Footer';

export default function PageLayout({ children }) {
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
        {children}
      </main>
      <Footer />
    </>
  );
} 