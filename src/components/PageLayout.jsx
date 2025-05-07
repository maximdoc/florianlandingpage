'use client';

import Navbar from './Navbar';
import Footer from './Footer';

export default function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="page-content">
        {children}
      </main>
      <Footer />
    </>
  );
} 