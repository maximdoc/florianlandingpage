import { getPageBySlug, getAllSections } from '@/utils/contentUtils';
import BenefitsSection from '@/components/sections/BenefitsSection';
import CTASection from '@/components/sections/CTASection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import SolutionSection from '@/components/sections/SolutionSection';
import IntroSection from '@/components/sections/IntroSection';

export const metadata = {
  title: 'SlingRFP - Government Contracting Made Easy',
  description: 'Transform your business with efficient government contracting solutions.',
};

/**
 * Компонент для динамического отображения секций на основе их типа
 */
const SectionRenderer = ({ section }) => {
  switch (section.type) {
    case 'hero':
      return <IntroSection key={section.id} />;
    case 'solution':
      return <SolutionSection key={section.id} />;
    case 'benefits':
      return <BenefitsSection key={section.id} />;
    case 'features':
      return <FeaturesSection key={section.id} />;
    case 'cta':
      return <CTASection key={section.id} />;
    default:
      return null;
  }
};

export default function Home() {
  // Получаем данные главной страницы из JSON
  const homePage = getPageBySlug('/');
  
  // Если данных нет, показываем загрузочное сообщение
  if (!homePage) {
    return <div>Loading...</div>;
  }
  
  // Получаем метаданные из страницы
  if (homePage.meta) {
    metadata.title = homePage.meta.title;
    metadata.description = homePage.meta.description;
  }
  
  // Получаем все секции страницы в порядке, указанном в JSON
  const sections = homePage.sections || [];
  
  // Отображаем секции в порядке из JSON-файла
  return (
    <main>
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
} 