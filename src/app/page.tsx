import HeroSection from '@/components/sections/HeroSection';
import SolutionSection from '@/components/sections/SolutionSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import PageLayout from '@/components/PageLayout';

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
