import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BrandStory } from '@/components/home/BrandStory';
import { ProjectsShowcase } from '@/components/home/ProjectsShowcase';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>
          {language === 'el' 
            ? 'PROBAGNO | Έπιπλα Μπάνιου Υψηλής Αισθητικής από το 1974'
            : 'PROBAGNO | Luxury Bathroom Furniture Since 1974'}
        </title>
        <meta 
          name="description" 
          content={language === 'el'
            ? 'Με 50+ χρόνια εμπειρίας στον σχεδιασμό και κατασκευή επίπλων μπάνιου, η PROBAGNO αποτελεί συνώνυμο ποιότητας και αισθητικής. Ανακαλύψτε τη συλλογή μας.'
            : 'With 50+ years of experience in bathroom furniture design and manufacturing, PROBAGNO is synonymous with quality and aesthetics. Discover our collection.'}
        />
      </Helmet>
      <Layout>
        <HeroSection />
        <FeaturedProducts />
        <BrandStory />
        <ProjectsShowcase />
      </Layout>
    </>
  );
};

export default Index;
