import React, { useState } from 'react';
import {
  Header,
  HeroSection,
  FeatureHighlights,
  CategoriesCarousel,
  HowItWorksSection,
  CommunityCallout,
  DownloadCTA,
  Footer
} from '@/components/home_ui.jsx';

function Homepage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CAF0F8] via-[#CAF0F8] to-[#B8E6F0] relative overflow-x-hidden">
      {/* Subtle grainy overlay */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Cg fill-opacity=%220.03%22%3E%3Cpolygon fill=%22%23000%22 points=%2250 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40%22/%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      
      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <FeatureHighlights />
        <CategoriesCarousel 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <HowItWorksSection />
        <CommunityCallout />
        <DownloadCTA />
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;