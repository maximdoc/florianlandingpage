# High-Converting Landing Page - Next.js Project

A complete Next.js project for a high-converting landing page with theme switching functionality, responsive design, and MongoDB integration.

## Features

- Modern Next.js application using App Router
- JavaScript ES6+ standards
- Bootstrap framework integration for responsive styling
- MongoDB connection configuration with Mongoose ODM
- Theme switching functionality with system preference detection and localStorage persistence
- Dark/light mode with smooth transitions
- Professional typography and clean interface
- Complete landing page with various sections:
  - Hero section
  - Problem/Solution section
  - Benefits section
  - Before/After comparison
  - Features section
  - Testimonials
  - FAQ section
  - Final CTA with form

## Tech Stack

- Next.js (latest stable version)
- React 18+
- Bootstrap 5
- MongoDB/Mongoose
- next-themes for theme management

## Project Structure

```
/website-project
  /public             # Static assets
    /images           # Image assets
  /src                # Source code
    /app              # Next.js App Router pages
    /components       # React components
      /sections       # Landing page section components
    /lib              # Utilities and MongoDB connection
    /models           # MongoDB schemas
    /styles           # Global CSS files
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website-project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
   # or for local development
   MONGODB_URI=mongodb://localhost:27017/workflow-app
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## MongoDB Integration with File Fallback

This project implements a hybrid content management approach that uses both MongoDB and local JSON files:

### How It Works

1. **Dual Content Sources**:
   - Content is stored in both MongoDB and local file (`src/data/content.json`)
   - The system prioritizes local file content when available
   - If content isn't found in the file, it falls back to MongoDB
   
2. **Flexible Operation Modes**:
   - **File-Only Mode**: Runs without MongoDB connection (no MONGODB_URI set)
   - **MongoDB Mode**: Uses both file and database when MONGODB_URI is provided
   
3. **Automatic Synchronization**:
   - Updates to content are written to both the file and MongoDB
   - Changes from MongoDB are synced back to the file
   - The cache system provides performance optimization

### Setup

1. Create a `.env.local` file in the root directory based on `templates/sample.env.local`
2. To use MongoDB, add your connection string to the `.env.local` file:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

3. For file-only mode, simply don't provide the MONGODB_URI value or remove it

### Security Best Practices

- **NEVER commit your `.env.local` file to version control**
- Keep MongoDB credentials private and secure
- Use a dedicated MongoDB user with limited permissions
- Enable IP address allowlisting in MongoDB Atlas
- Regularly rotate your database passwords
- Monitor database access and set up alerts for suspicious activity

### Data Management

To import content from `src/data/content.json` to MongoDB:

```bash
npm install  # Install dependencies if you haven't already
npm run import-content
```

### Using Server Actions

This project uses Next.js Server Actions instead of API routes for improved performance:

```jsx
// Example of using a server action to update content
'use client';

import { updateGlobalContent } from '@/actions/contentActions';

export default function ContentForm() {
  const handleSubmit = async (formData) => {
    const result = await updateGlobalContent(formData);
    console.log(result);
  };

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="data" value={JSON.stringify(content)} />
      <button type="submit">Update Content</button>
    </form>
  );
}
```

See the [CONTENT-MANAGEMENT-README.md](./CONTENT-MANAGEMENT-README.md) for more details on content management.

## Theme Switching

The application includes a theme switching feature that:
- Detects system preference on initial load
- Persists theme preference in localStorage
- Provides smooth transitions between themes (0.3s)
- Has WCAG AA compliant contrast ratios
- Uses CSS variables for consistent styling

## Modern Architecture with Server Actions

This project follows Next.js best practices by utilizing Server Actions for server-side operations rather than traditional API routes. This approach offers several benefits:

- **Improved Performance**: Direct server calls without additional HTTP requests
- **Simplified Development**: Co-location of server logic with related components
- **Enhanced Security**: Secure, encrypted server actions with built-in validation
- **Better Developer Experience**: Simpler code organization and maintenance

### Server Actions Directory Structure

```
src/
  ├── actions/               # Server actions
  │   ├── contentActions.js  # Content management actions
  │   ├── cacheActions.js    # Cache management actions
  │   ├── initActions.js     # Initialization actions
  │   └── revalidateActions.js # Path revalidation actions
  ├── app/                   # Next.js App Router
  │   ├── page.js            # Server Component (default route)
  │   └── admin/             # Admin section
  │       └── website-content/ # Content management
  ├── components/            # Reusable components
  ├── hooks/                 # Custom React hooks
  └── services/              # Data services
```

### Using Server Actions

Server actions can be used in three main ways:

1. **Direct calls in Server Components**:
   ```jsx
   // In a Server Component
   import { getGlobalContent } from '@/actions/contentActions';
   
   export default async function Page() {
     const content = await getGlobalContent();
     return <div>{content.title}</div>;
   }
   ```

2. **Function calls in Client Components**:
   ```jsx
   'use client';
   
   import { refreshCache } from '@/actions/contentActions';
   
   export default function RefreshButton() {
     const handleRefresh = async () => {
       await refreshCache();
     };
     
     return <button onClick={handleRefresh}>Refresh Cache</button>;
   }
   ```

3. **Form actions for data mutations**:
   ```jsx
   'use client';
   
   import { updateContent } from '@/actions/contentActions';
   
   export default function ContentForm() {
     return (
       <form action={updateContent}>
         <input name="title" />
         <button type="submit">Save</button>
       </form>
     );
   }
   ```

For more details, see the [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) file.

## Deployment

### Vercel (Recommended)

1. Create a Vercel account if you don't have one: [https://vercel.com/signup](https://vercel.com/signup)
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Configure your environment variables in Vercel:
   - Go to your Vercel project dashboard
   - Navigate to **Settings** > **Environment Variables**
   - Add `MONGODB_URI` with your MongoDB connection string
   - Make sure to enable the variable for **Production**, **Preview**, and **Development** environments

4. For better security and ease of setup, use the official MongoDB Atlas integration:
   - In MongoDB Atlas, go to **Integrations** > **Vercel**
   - Follow the steps to connect your Atlas cluster to your Vercel project
   - This will automatically set up environment variables and IP allowlisting

5. Deploy your application:
   ```bash
   vercel
   ```
   
6. Follow the prompts to complete the deployment.

### Troubleshooting Vercel Deployment

If you encounter MongoDB connection issues:

1. Verify your environment variables are correctly set in Vercel dashboard
2. Check that you've added proper network access in MongoDB Atlas
3. Ensure your MongoDB user has the correct permissions
4. Check for deprecated MongoDB connection options in your code

### Other Hosting Options

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```
2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting for reduced bundle size
- CSS variables for efficient theming
- MongoDB connection pooling for improved database performance

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the excellent framework
- Bootstrap team for the responsive CSS framework
- MongoDB and Mongoose teams for the database solution

## File-Only Content Management Version

**IMPORTANT: This is the file-only version of the content management system that doesn't require MongoDB.**

This version of the project manages content using local JSON files instead of a MongoDB database. All content is:
1. Initially loaded from `src/data/content.json`
2. Cached in the `cache/content-cache.json` file
3. Updated directly in both files when changes are made

### How It Works

The content management system uses the following approach:
- Content is initially read from `src/data/content.json`
- When content is requested, it first checks the cache
- If the cache is stale or doesn't exist, it reads from the content.json file
- When content is updated, both the cache and source JSON file are updated

### Getting Started

1. Clone this repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Content Structure

Content is stored in a JSON file with the following structure:

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

### Content Modification

Content can be modified directly by:
1. Editing the JSON file in `src/data/content.json`
2. Using the Admin UI if implemented
3. Using the content API endpoints if implemented

After modification, the development server will automatically use the updated content.
