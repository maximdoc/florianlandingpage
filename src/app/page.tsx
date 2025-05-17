import HeroSection from '@/components/sections/HeroSection';
import SolutionSection from '@/components/sections/SolutionSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageLayout from '@/components/PageLayout';
import { Metadata } from 'next';
import { getGlobalContent, getAllPages } from '@/actions/contentActions';

// Disable caching for the main page
export const dynamic = 'force-dynamic';

interface PageMeta {
  title: string;
  description: string;
}

interface PageData {
  meta: PageMeta;
  [key: string]: any;
}

// Dynamically generate metadata from MongoDB
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Get all pages and find the homepage
    const pages = await getAllPages();
    const homePage = Array.isArray(pages) 
      ? pages.find(page => page.id === 'home' || page.slug === '/') 
      : null;
    
    // Check that homePage exists and has meta property
    if (homePage && homePage.meta) {
      const { meta } = homePage;
      
      return {
        title: meta.title,
        description: meta.description,
      };
    }
    
    // If homePage not found, try to get global content
    const globalContent = await getGlobalContent();
    if (globalContent && !globalContent.error) {
      return {
        title: globalContent.title || 'SlingRFP - Government Contracting Made Easy',
        description: globalContent.description || 'Transform your business with efficient government contracting solutions',
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  // Return default values if metadata couldn't be retrieved
  return {
    title: 'SlingRFP - Government Contracting Made Easy',
    description: 'Transform your business with efficient government contracting solutions',
  };
}

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <SolutionSection />
      <BenefitsSection />
      <ComparisonSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </PageLayout>
  );
}
