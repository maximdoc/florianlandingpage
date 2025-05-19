'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { updateWebsiteContent } from './WebsiteContentAction';

// The simplified client component for editing website content via JSON
export default function WebsiteContentComponent({ initialContent }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('Validating content...');
    setStatusType('info');
    setJsonError('');
    
    try {
      // Try parsing the JSON to validate it
      let contentData;
      try {
        contentData = JSON.parse(jsonContent);
      } catch (parseError) {
        setJsonError(`Invalid JSON format: ${parseError.message}`);
        setStatusMessage('Failed: Invalid JSON format');
        setStatusType('danger');
        setIsSubmitting(false);
        return;
      }
      
      // Validate basic structure
      if (!contentData || typeof contentData !== 'object') {
        setJsonError('Content must be a valid JSON object');
        setStatusMessage('Failed: Invalid content structure');
        setStatusType('danger');
        setIsSubmitting(false);
        return;
      }
      
      // Check for required structure
      if (!contentData.global && (!contentData.pages || !Array.isArray(contentData.pages) || contentData.pages.length === 0)) {
        setJsonError('Content must contain either "global" object or non-empty "pages" array');
        setStatusMessage('Failed: Missing required content structure');
        setStatusType('danger');
        setIsSubmitting(false);
        return;
      }
      
      // Limit object size to avoid potential issues
      const jsonSize = new Blob([jsonContent]).size;
      if (jsonSize > 5 * 1024 * 1024) { // 5MB limit
        setJsonError('Content is too large (>5MB). Please reduce size.');
        setStatusMessage('Failed: Content too large');
        setStatusType('danger');
        setIsSubmitting(false);
        return;
      }
      
      setStatusMessage('Updating content...');
      
      // Call the server action to update content
      const result = await updateWebsiteContent(contentData);
      
      // Handle success
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
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Status message */}
        {statusMessage && (
          <div className={`alert alert-${statusType} mt-3 mb-4`} role="alert">
            {statusMessage}
          </div>
        )}
        
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
                  page:
                  version:
                  active:
                  timestamp:
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