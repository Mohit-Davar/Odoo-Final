import { useEffect, useState } from 'react';
import { Navigation, HeroSection, AboutSection, ServicesSection, FeaturesGrid, StatisticsSection, FinalCTASection } from '@/components/HomeComponent.jsx';
import { ScrollProgress, CustomStyles, LoadingAnimation } from '@/components/ui/home_ui.jsx';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);



  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <CustomStyles />
      <ScrollProgress />
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FeaturesGrid />
        <StatisticsSection />
        <FinalCTASection />
      </main>
      <Footer/>
    </div>
  );
}
