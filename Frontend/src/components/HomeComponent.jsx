import React, { useEffect, useState } from 'react';
import { Calendar, Users, BarChart3, Clock, Globe, Zap, ArrowRight, Ticket, CreditCard, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Floating Particles Component
export const FloatingParticles = ({ count = 50 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// Hero Section Component
export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background Image with Red Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-black/70 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Floating Particles */}
      <FloatingParticles count={60} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-8 transform translate-y-8 opacity-0 animate-fadeInUp">
          <h1 className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tighter">
            EVENT<span className="text-red-600">HIVE</span>
          </h1>
          <div className="h-1 w-32 bg-red-600 mx-auto mb-8"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-6 tracking-wider">
            THE COMPLETE EVENT MANAGEMENT PLATFORM
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We create experiences that captivate audiences from the first moment
          </p>
        </div>
        
        <div className="transform translate-y-12 opacity-0 animate-fadeInUp animation-delay-500">
          <button className="group bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <Link to="/login"> Start Creating Events</Link>
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

// About Section Component
export const AboutSection = () => {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background with Red Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/60 via-black/80 to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-gray-400 text-sm font-semibold tracking-widest mb-4 uppercase">What We Offer</h3>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
              WELCOME TO <span className="text-red-600">EVENTHIVE</span>
            </h2>
            <div className="h-1 w-20 bg-red-600 mb-8"></div>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              EventHive empowers event organizers to create unforgettable experiences while providing attendees with seamless discovery, registration, and participation.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We're passionate experts who deliver exceptional results through innovative technology and strategic event management.
            </p>
            <button className="group bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 mt-8">
              LEARN MORE
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section Component
export const ServicesSection = () => {
  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/90 to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-gray-400 text-sm font-semibold tracking-widest mb-4 uppercase">How We Serve You</h3>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
          WE ARE PROUD TO <span className="text-red-600">SERVE YOU</span> THIS WAY
        </h2>
        <div className="h-1 w-20 bg-red-600 mx-auto mb-12"></div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            EventHive's comprehensive platform combines cutting-edge technology with expert event management to deliver extraordinary experiences that connect brands with their audiences.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            From intimate corporate gatherings to large-scale conferences, our platform provides the tools and insights needed to create memorable moments that drive engagement and achieve business objectives.
          </p>
        </div>
      </div>
    </section>
  );
};

// Features Grid Component
export const FeaturesGrid = () => {
  const features = [
    {
      icon: Calendar,
      title: "Event Creation & Management",
      description: "Comprehensive tools for planning, organizing, and managing events of any scale with intuitive workflows and real-time collaboration."
    },
    {
      icon: Ticket,
      title: "Ticketing & Payments",
      description: "Seamless ticket sales, secure payment processing, and automated attendee management with customizable pricing structures."
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Advanced analytics and reporting tools to track performance, understand attendee behavior, and optimize future events."
    }
  ];

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background with Geometric Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black/90 to-black"></div>
        
        {/* Geometric Red Overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/20 to-transparent transform skew-x-12 origin-top-right"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-gray-400 text-sm font-semibold tracking-widest mb-4 uppercase">Platform Features</h3>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            WE LOVE CREATING <span className="text-red-600">AMAZING EVENTS!</span>
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:bg-gray-800/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center group-hover:bg-red-600/30 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Statistics Section Component
export const StatisticsSection = () => {
  const stats = [
    { number: "5K+", label: "Events Created" },
    { number: "100K+", label: "Attendees Served" },
    { number: "50+", label: "Countries Reached" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Bokeh Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-gray-900/80 to-black/90"></div>
        
        {/* Bokeh Effects */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-red-600/10 blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 rounded-full bg-white/5 blur-2xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-red-600/15 blur-lg animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-gray-400 text-sm font-semibold tracking-widest mb-4 uppercase">Our Impact</h3>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            SOME FUN FACTS ABOUT <span className="text-red-600">EVENTHIVE</span>
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <div className="text-5xl md:text-6xl font-black text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-300 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section Component
export const FinalCTASection = () => {

  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/login")
  }

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Concert Crowd Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-red-900/20 to-black/80"></div>
        
        {/* Stage Lighting Effects */}
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-red-600/20 blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
          We Are Your Complete <span className="text-red-600">Event Management</span> Solution
        </h2>
        <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light">
          Dedicated to Creating Memorable Experiences
        </p>
        
        <div className="space-y-6 md:space-y-0 md:space-x-6 md:flex md:justify-center">
          <button onClick={handleClick} className="group bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full md:w-auto">
            Get Started Today
            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-300 w-full md:w-auto">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

// Navigation Component
export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-black text-white">
            EVENT<span className="text-red-600">HIVE</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-red-600 transition-colors duration-300 font-medium">Features</a>
            <a href="#" className="text-gray-300 hover:text-red-600 transition-colors duration-300 font-medium">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-red-600 transition-colors duration-300 font-medium">About</a>
            <a href="#" className="text-gray-300 hover:text-red-600 transition-colors duration-300 font-medium">Contact</a>
          </div>
          
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
           <Link to="/login">Sign In</Link> 
          </button>
        </div>
      </div>
    </nav>
  );
};