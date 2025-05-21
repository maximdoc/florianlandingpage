'use client';

import { useState, useEffect, useCallback } from 'react';
import { getGlobalContent, getPageContent, getAllPages } from '@/actions/contentActions';

// Cache for storing content data
const contentCache = {
  global: null,
  pages: {},
  lastFetch: null,
  initialized: false
};

/**
 * Initialize content once at app startup
 */
export function initializeContentData() {
  // If already initialized, skip
  if (contentCache.initialized) return;

  // Set the initialized flag to avoid multiple initialization attempts
  contentCache.initialized = true;

  // Prefetch global content in the background
  getGlobalContent().then(data => {
    if (!data.error) {
      contentCache.global = data;
      contentCache.lastFetch = Date.now();
      
      // Dispatch a custom event to notify all components of content update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('content-updated'));
      }
    }
  }).catch(err => {
    console.error('Error pre-fetching global content:', err);
  });
}

/**
 * Custom hook for fetching global content with cache support
 */
export function useGlobalContent(options = {}) {
  const { cacheDuration = 60000 } = options; // Default cache duration: 1 minute
  const [globalContent, setGlobalContent] = useState(contentCache.global);
  const [loading, setLoading] = useState(!contentCache.global);
  const [error, setError] = useState(null);

  // Initialize content data if not already done
  useEffect(() => {
    initializeContentData();
  }, []);

  // Handler for content update events
  useEffect(() => {
    const handleContentUpdate = () => {
      setGlobalContent(contentCache.global);
      setLoading(false);
    };

    // Listen for content update events
    window.addEventListener('content-updated', handleContentUpdate);
    return () => {
      window.removeEventListener('content-updated', handleContentUpdate);
    };
  }, []);

  // Function to refresh content data
  const refreshContent = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getGlobalContent();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Update cache
      contentCache.global = data;
      contentCache.lastFetch = Date.now();
      
      // Update state
      setGlobalContent(data);
      setError(null);
    } catch (err) {
      console.error('Error refreshing global content:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch content if not in cache or cache is expired
  useEffect(() => {
    const shouldFetch = 
      !contentCache.global || 
      !contentCache.lastFetch || 
      (Date.now() - contentCache.lastFetch > cacheDuration);
    
    if (shouldFetch) {
      refreshContent();
    } else if (contentCache.global && !globalContent) {
      // Content is in cache but not in state
      setGlobalContent(contentCache.global);
      setLoading(false);
    }
  }, [cacheDuration, globalContent, refreshContent]);

  return { 
    globalContent, 
    loading, 
    error, 
    refreshContent 
  };
}

/**
 * Custom hook for fetching page content by slug
 * @param {string} slug - The page slug
 */
export function usePageContent(slug, options = {}) {
  const { cacheDuration = 60000 } = options; // Default cache duration: 1 minute
  const [pageContent, setPageContent] = useState(contentCache.pages[slug]);
  const [loading, setLoading] = useState(!contentCache.pages[slug]);
  const [error, setError] = useState(null);

  // Function to refresh page content
  const refreshContent = useCallback(async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      const data = await getPageContent(slug);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Update cache
      contentCache.pages[slug] = data;
      
      // Update state
      setPageContent(data);
      setError(null);
    } catch (err) {
      console.error(`Error refreshing page content for slug ${slug}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Fetch content if not in cache or no slug provided
  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    
    const pageInCache = contentCache.pages[slug];
    const shouldFetch = !pageInCache;
    
    if (shouldFetch) {
      refreshContent();
    } else if (pageInCache && !pageContent) {
      // Content is in cache but not in state
      setPageContent(pageInCache);
      setLoading(false);
    }
  }, [slug, pageContent, refreshContent]);

  return { 
    pageContent, 
    loading, 
    error, 
    refreshContent 
  };
}

/**
 * Custom hook for fetching all pages
 */
export function useAllPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllPages() {
      try {
        setLoading(true);
        const data = await getAllPages();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setPages(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching all pages:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPages();
  }, []);

  return { pages, loading, error };
} 