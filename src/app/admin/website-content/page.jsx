import { Suspense } from 'react';
import { getCompleteContent, getContentVersionInfo } from '@/actions/contentActions';
import WebsiteContentComponent from './WebsiteContentComponent';

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';

// Metadata for the page
export const metadata = {
  title: 'Admin | Website Content Management',
  description: 'Update website content in MongoDB',
};

// Loading component
function ContentLoading() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

// Safely prepare data to avoid circular references
function sanitizeData(data) {
  if (!data) return {};
  
  try {
    // Convert to JSON and back to break circular references
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error sanitizing data:', error);
    return {};
  }
}

// Server component that fetches data
async function ContentAdmin() {
  try {
    // Fetch complete content using server action
    const completeContent = await getCompleteContent();
    
    // Get version information using server action
    const versionInfo = await getContentVersionInfo();
    
    // Merge version info with content data
    const contentWithVersioning = {
      ...completeContent,
      version: versionInfo.version,
      timestamp: versionInfo.timestamp,
      versionCount: versionInfo.versionCount
    };
    
    // Sanitize data to prevent circular references
    const safeContent = sanitizeData(contentWithVersioning);
    
    return (
      <div>
        <div className="mb-4">
          <h4 className="mb-2">Content Version Information</h4>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1">
                    <strong>Current Version:</strong> v{safeContent.version || 'None'}
                  </p>
                  <p className="mb-1">
                    <strong>Last Updated:</strong> {safeContent.timestamp 
                      ? new Date(safeContent.timestamp).toLocaleString() 
                      : 'Never'}
                  </p>
                  <p className="mb-0">
                    <strong>Total Versions:</strong> {safeContent.versionCount || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <WebsiteContentComponent 
          initialContent={safeContent}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="alert alert-danger">
        <h3>Error Loading Content</h3>
        <p>An error occurred while loading the content: {error.message}</p>
      </div>
    );
  }
}

// Main page component with suspense
export default function WebsiteContentPage() {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="mb-3">Website Content Management</h1>
        <div className="title-underline mx-auto"></div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <Suspense fallback={<ContentLoading />}>
            <ContentAdmin />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 