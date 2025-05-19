# High-Converting Landing Page - Next.js Project

A complete Next.js project for a high-converting landing page with theme switching functionality and responsive design using local JSON file for content management.

## Features

- Modern Next.js application using App Router
- JavaScript ES6+ standards
- Bootstrap framework integration for responsive styling
- Local JSON file content management
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
- Local JSON file for content management
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
    /services         # Content service for JSON file management
    /data             # Content JSON file
    /styles           # Global CSS files
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

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

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## File-Only Content Management

This project uses a local JSON file for content management:

### How It Works

1. **Local Content Source**:
   - Content is stored in local file (`src/data/content.json`)
   - The system reads and writes to this file directly
   
2. **Content Management**:
   - Updates to content are written to the local JSON file
   - The contentService provides an API for reading and writing content

### Data Management

Content is managed through the `src/data/content.json` file which contains all website content.

### Using Server Actions

The project uses Next.js Server Actions for content management instead of traditional API routes. Server Actions allow:

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

## Deployment

### Deploying to Vercel

1. Create a Vercel account if you don't have one: [https://vercel.com/signup](https://vercel.com/signup)
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy your application:
   ```bash
   vercel
   ```
   
4. Follow the prompts to complete the deployment.

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the excellent framework
- Bootstrap team for the responsive CSS framework
