import React from 'react';
import { Menu, X, MapPin, Camera, Bell, Filter, Shield, Construction, Lightbulb, Droplets, Trash2, AlertTriangle, Verified as Barrier, ChevronLeft, ChevronRight, Download, Smartphone, Play, Eye, Users, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Google Fonts import
const GoogleFontsLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
);

// Add Google Fonts to document head
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = ()=>{
    navigate("/login");
  }

  return (
    <header className="relative z-50 px-4 sm:px-6 lg:px-8 py-6">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            LocalFix
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-black font-medium hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            How it Works
          </a>
          <a href="#features" className="text-black font-medium hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Features
          </a>
          <a href="#categories" className="text-black font-medium hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Categories
          </a>
          <a href="#download" className="text-black font-medium hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Download
          </a>
          <a href="#faq" className="text-black font-medium hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            FAQ
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button onClick={handleLogin} className="bg-black text-[#CAF0F8] px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#CAF0F8] bg-opacity-95 backdrop-blur-md border border-white border-opacity-20 rounded-b-lg shadow-lg md:hidden">
            <div className="px-6 py-4 space-y-4">
              <a href="#how-it-works" className="block text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                How it Works
              </a>
              <a href="#features" className="block text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Features
              </a>
              <a href="#categories" className="block text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Categories
              </a>
              <a href="#download" className="block text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Download
              </a>
              <a href="#faq" className="block text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                FAQ
              </a>
              <button onClick={handleLogin} className="w-full bg-black text-[#CAF0F8] px-6 py-3 rounded-lg font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export const HeroSection = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Effortlessly Report Neighborhood Issues
              </h1>
              <p className="text-lg sm:text-xl text-black leading-relaxed font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Empower your community—quickly report, track, and resolve local problems like potholes, water leaks, or garbage, all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleLogin} className="bg-black text-[#CAF0F8] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <Camera size={20} />
                Report an Issue
              </button>
              <button className="border-2 border-black text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-black hover:text-[#CAF0F8] hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <Play size={20} />
                See How it Works
              </button>
            </div>
          </div>

          {/* Right content - Illustration placeholder */}
          <div className="relative">
            <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white border-opacity-20">
              <div className="aspect-square bg-gradient-to-br from-black to-gray-600 rounded-xl flex items-center justify-center text-[#CAF0F8] text-6xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <MapPin size={80} />
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-4 bg-black bg-opacity-20 rounded"></div>
                <div className="h-4 bg-black bg-opacity-10 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeatureHighlights = () => {
  const features = [
    {
      icon: <Eye size={32} />,
      title: "Local Visibility Only",
      description: "See and submit issues within 3-5 km—all based on your location."
    },
    {
      icon: <Camera size={32} />,
      title: "Quick & Easy Reporting",
      description: "Describe, snap up to 5 photos, and send. Verified or anonymous."
    },
    {
      icon: <Bell size={32} />,
      title: "Track Status",
      description: "Follow every update from reporting to resolution."
    },
    {
      icon: <Filter size={32} />,
      title: "Map & Filters",
      description: "View all active issues as pins; filter by distance, category, or status."
    },
    {
      icon: <Shield size={32} />,
      title: "Safe & Moderated",
      description: "Flag spam, with community auto-moderation and admin review."
    }
  ];

  return (
    <section id="features" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Powerful Features for Your Community
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white border-opacity-30 hover:shadow-xl hover:scale-105 transition-all duration-200">
              <div className="text-black mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {feature.title}
              </h3>
              <p className="text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CategoriesCarousel = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { icon: <Construction size={40} />, name: "Roads", label: "Road issues and infrastructure" },
    { icon: <Lightbulb size={40} />, name: "Lighting", label: "Street lighting problems" },
    { icon: <Droplets size={40} />, name: "Water", label: "Water leaks and drainage" },
    { icon: <Trash2 size={40} />, name: "Cleanliness", label: "Garbage and cleanliness" },
    { icon: <AlertTriangle size={40} />, name: "Safety", label: "Safety concerns" },
    { icon: <Barrier size={40} />, name: "Obstructions", label: "Blocked pathways" }
  ];

  return (
    <section id="categories" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Supported Categories
          </h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`bg-white bg-opacity-30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white border-opacity-30 hover:shadow-xl hover:scale-105 transition-all duration-200 text-center cursor-pointer ${
                  activeCategory === index ? 'ring-2 ring-black' : ''
                }`}
                onClick={() => setActiveCategory(index)}
                role="button"
                tabIndex={0}
                aria-label={category.label}
              >
                <div className="text-black mb-3 flex justify-center">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Locate & Report",
      description: "Open the app, describe the issue, add photos, and submit your report instantly.",
      icon: <MapPin size={32} />
    },
    {
      number: "2",
      title: "Track & Engage",
      description: "Monitor progress, engage with community updates, and stay informed throughout the process.",
      icon: <Users size={32} />
    },
    {
      number: "3",
      title: "Get Notified When Fixed",
      description: "Receive automatic notifications when your reported issue has been resolved by local authorities.",
      icon: <CheckCircle size={32} />
    }
  ];

  return (
    <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white border-opacity-30 hover:shadow-xl transition-all duration-200">
                <div className="bg-black text-[#CAF0F8] w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {step.number}
                </div>
                <div className="text-black mb-4 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CommunityCallout = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-xl border border-white border-opacity-40 text-center">
          <div className="flex items-center justify-center mb-6">
            <Star className="text-black mr-2" size={32} />
            <span className="text-3xl font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>2,000+</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Local Issues Resolved
          </h3>
          <p className="text-lg text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            See trending problems and play your part in making your community better.
          </p>
        </div>
      </div>
    </section>
  );
};

export const DownloadCTA = () => {
  return (
    <section id="download" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Download LocalFix and start reporting issues in your neighborhood today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="px-4 sm:px-6 lg:px-8 py-16 border-t border-black border-opacity-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              LocalFix
            </h3>
            <p className="text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Empowering communities to report and resolve local issues together.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Product
            </h4>
            <div className="space-y-2">
              <a href="#features" className="block text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>Features</a>
              <a href="#categories" className="block text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>Categories</a>
              <a href="#how-it-works" className="block text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>How it Works</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Support
            </h4>
            <div className="space-y-2">
              <a href="#faq" className="block text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>FAQ</a>
              <a href="#contact" className="block text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>Contact</a>
              <a href="#help" className="block text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>Help Center</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Legal
            </h4>
            <div className="space-y-2">
              <a href="#privacy" className="block text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>Privacy Policy</a>
              <a href="#terms" className="block text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'Montserrat, sans-serif' }}>Terms of Service</a>
              <a href="#admin" className="block text-black hover:opacity-70 transition-opacity font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Admin Login</a>
            </div>
          </div>
        </div>

        <div className="border-t border-black border-opacity-10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-black font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              © 2024 LocalFix. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#social" className="text-black hover:opacity-70 transition-opacity" aria-label="Social media">
                <Users size={20} />
              </a>
              <a href="#social" className="text-black hover:opacity-70 transition-opacity" aria-label="Social media">
                <Star size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};