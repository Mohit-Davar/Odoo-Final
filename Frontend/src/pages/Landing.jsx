import { useEffect, useState } from 'react';
import { Navigation, HeroSection, AboutSection, ServicesSection, FeaturesGrid, StatisticsSection, FinalCTASection } from '@/components/Landing.jsx';
import { CustomStyles, LoadingAnimation } from '@/components/ui/Home_UI.jsx';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);



  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <CustomStyles />

      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturesGrid />
        <StatisticsSection />
        <AboutSection />
        <FinalCTASection />
      </main>

      <Footer />
    </>

  );
}
