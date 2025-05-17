# Content Management System

This document explains how content is managed in the system.

## Hybrid Content Management System

This project implements a hybrid content management approach:

1. **File-Based Content**: Content is stored in `src/data/content.json`
2. **MongoDB Storage**: Content can also be stored in MongoDB
3. **Priority System**: Content is loaded with the following priority:
   - First from cache (for performance)
   - Then from local JSON file
   - Finally from MongoDB (if configured)

## Important Commands

### 1. Refresh Cache

```bash
curl http://localhost:3000/api/refresh-cache
```

**Purpose**: Updates the cached content file (`cache/content-cache.json`) with the latest data from the source content file or MongoDB.

### 2. Check Cache Status

```bash
curl http://localhost:3000/api/cache-status
```

**Purpose**: Displays the current status of the cache, including when it was last updated and when it will be updated next.

### 3. Initialize Cache Updater

```bash
curl http://localhost:3000/api/init/cache
```

**Purpose**: Initializes the cache updater service, which automatically refreshes the cache in the background every 10 minutes.

### 4. Sync Content from File to MongoDB

```bash
curl http://localhost:3000/api/sync-content
```

**Purpose**: This command reads the content from the local content file (`src/data/content.json`) and updates the MongoDB database with this content. Use this when you've made changes to the content file and want to apply those changes to the database.

## Running Modes

### File-Only Mode

If no MongoDB connection string is provided in the environment variables, the system operates in "File-Only Mode":

1. All content is loaded from `src/data/content.json`
2. Content updates are written back to this file and the cache
3. No database connection is attempted

### MongoDB Mode

If a MongoDB connection string is provided, the system operates in "MongoDB Mode":

1. Content is first checked in local files
2. If not found or outdated, content is loaded from MongoDB
3. Content updates are written to both the local file and MongoDB
4. Changes in MongoDB are synced back to the local file when needed

## Content Structure

Content is stored with the following structure:

```json
{
  "global": {
    "header": {...},
    "footer": {...},
    // Other global content
  },
  "pages": [
    {
      "slug": "home",
      "title": "Home Page",
      // Page content
    },
    // Other pages
  ]
}
```

## Using Server Actions for Content Management

This project uses Next.js Server Actions for content management instead of traditional API routes. Server Actions allow:

1. Direct server-side updates without the need for separate API endpoints
2. Improved performance through reduced overhead
3. Better type safety and security

### Available Server Actions:

- `getGlobalContent()`: Get global website content
- `getPageContent(slug)`: Get content for a specific page
- `getAllPages()`: Get all available pages
- `updateGlobalContent(formData)`: Update global content
- `updatePageContent(formData)`: Update a specific page
- `updateCompleteContent(formData)`: Update the entire content structure
- `refreshCache()`: Force a cache refresh
- `syncContent()`: Sync content between local file and MongoDB

## Content Workflow Process

1. **Editing Content**:
   - Edit the `src/data/content.json` file directly, or
   - Use the Admin UI (if implemented), or
   - Use the content Server Actions

2. **Syncing Content** (when using MongoDB):
   - Automatic sync happens when content is refreshed from MongoDB
   - Manual sync can be triggered with the sync-content command

3. **Verifying Changes**:
   - Check the website to see content changes
   - Verify the cache status with the cache-status command

## Notes

- The cache is automatically updated every 10 minutes
- The cache is also automatically refreshed when content is updated through the admin panel
- If changes are not appearing on the website, try refreshing the cache manually 