'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { updateWebsiteContent } from './WebsiteContentAction';
import { refreshContentFromDatabase } from '@/actions/contentActions';

// The client component for editing website content via JSON
export default function WebsiteContentComponent({ initialContent }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [jsonContent, setJsonContent] = useState('');
  const [jsonError, setJsonError] = useState('');
  
  // Initialize the textarea with the stringified initial content
  useEffect(() => {
    try {
      const formattedJson = JSON.stringify(initialContent, null, 2);
      setJsonContent(formattedJson);
    } catch (error) {
      console.error('Error stringifying initial content:', error);
      setJsonContent('{}');
      setJsonError('Failed to load initial content. Please check the data format.');
    }
  }, [initialContent]);
  
  // Handle refresh button click
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setStatusMessage('Refreshing content from database...');
    setStatusType('info');
    
    try {
      // Use the server action to refresh content
      await refreshContentFromDatabase();
      
      // Force reload to get fresh data
      window.location.reload();
    } catch (error) {
      console.error('Error refreshing content:', error);
      setStatusMessage(`Error refreshing: ${error.message || 'Failed to refresh content'}`);
      setStatusType('danger');
      setIsRefreshing(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('Updating content...');
    setStatusType('info');
    setJsonError('');
    
    try {
      // Try parsing the JSON to validate it
      let contentData;
      try {
        contentData = JSON.parse(jsonContent);
      } catch (parseError) {
        setJsonError('Invalid JSON format. Please check your input.');
        setStatusMessage('Invalid JSON format');
        setStatusType('danger');
        setIsSubmitting(false);
        return;
      }
      
      // Sanitize the content data by removing MongoDB-specific fields
      // This prevents validation errors when MongoDB tries to cast fields
      const sanitizedContent = {
        global: contentData.global || {},
        pages: contentData.pages || []
      };
      
      // Call the server action to update content
      const result = await updateWebsiteContent(sanitizedContent);
      
      // Handle success
      console.log('Update result:', result);
      setStatusMessage('Content updated successfully!');
      setStatusType('success');
      
      // Force reload after a short delay to ensure we get fresh data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error updating content:', error);
      setStatusMessage(`Error: ${error.message || 'Failed to update content'}`);
      setStatusType('danger');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Extract version info for display
  const versionInfo = initialContent.version 
    ? `v${initialContent.version} - ${new Date(initialContent.timestamp).toLocaleString()}`
    : 'Not versioned';
  
  // Display active status if available
  const activeStatus = initialContent.active !== undefined 
    ? initialContent.active ? 'Active' : 'Inactive'
    : '';
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Status message */}
        {statusMessage && (
          <div className={`alert alert-${statusType} mt-3 mb-4`} role="alert">
            {statusMessage}
          </div>
        )}
        
        <div className="d-flex justify-content-end mb-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="me-2"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh from Database'}
          </Button>
        </div>
        
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Page Content Editor</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="jsonEditor" className="form-label fw-bold">
                Content for landing page. Database information:
              </label>
              
              <div className="small text-muted mb-2">
                <pre style={{ margin: 0 }}>
                  version: {versionInfo}
                  active: {activeStatus}
                  timestamp: {initialContent.timestamp ? new Date(initialContent.timestamp).toISOString() : 'N/A'}
                </pre>
              </div>
              
              {jsonError && (
                <div className="alert alert-danger py-2 mb-2">
                  {jsonError}
                </div>
              )}
              
              <textarea
                id="jsonEditor"
                className="form-control font-monospace"
                rows="25"
                value={jsonContent}
                onChange={(e) => setJsonContent(e.target.value)}
                style={{ resize: 'vertical' }}
              ></textarea>
              <small className="text-muted">
                Paste the complete JSON content structure here
              </small>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="px-5"
          >
            {isSubmitting ? 'Updating...' : 'Save Content'}
          </Button>
        </div>
      </form>
    </div>
  );
} 