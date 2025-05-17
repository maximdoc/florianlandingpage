'use client';

import { useState, useEffect } from 'react';
import { getGlobalContent, getPageContent, getAllPages } from '@/actions/contentActions';

/**
 * Custom hook for fetching global content
 */
export function useGlobalContent() {
  const [globalContent, setGlobalContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGlobalContent() {
      try {
        setLoading(true);
        const data = await getGlobalContent();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setGlobalContent(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching global content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGlobalContent();
  }, []);

  return { globalContent, loading, error };
}

/**
 * Custom hook for fetching page content by slug
 * @param {string} slug - The page slug
 */
export function usePageContent(slug) {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPageContent() {
      if (!slug) return;
      
      try {
        setLoading(true);
        // Remove leading slash if present
        const normalizedSlug = slug.startsWith('/') ? slug.substring(1) : slug;
        const data = await getPageContent(normalizedSlug);
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setPageContent(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching page content for ${slug}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPageContent();
  }, [slug]);

  return { pageContent, loading, error };
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