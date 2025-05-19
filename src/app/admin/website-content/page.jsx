import { Suspense } from 'react';
import { contentService } from '@/services/contentService';
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
    // Fetch complete content from MongoDB
    const completeContent = await contentService.getCompleteContent();
    
    // Sanitize data to prevent circular references
    const safeContent = sanitizeData(completeContent);
    
    return (
      <WebsiteContentComponent 
        initialContent={safeContent}
      />
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