import { useEffect, useState } from 'react';
import { Calendar, BarChart3, ArrowRight, Ticket } from 'lucide-react';
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
          className="absolute bg-white opacity-20 rounded-full animate-pulse"
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
    <section id="hero" className="relative flex justify-center items-center bg-black min-h-screen overflow-hidden">
      {/* Background Image with Red Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-40"
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
      <div className="z-10 relative mx-auto px-6 max-w-6xl text-center">
        <div className="opacity-0 mb-8 translate-y-8 animate-fadeInUp transform">
          <h1 className="mb-4 font-black text-white text-8xl md:text-9xl tracking-tighter">
            EVENT<span className="text-red-600">HIVE</span>
          </h1>
          <div className="bg-red-600 mx-auto mb-8 w-32 h-1"></div>
          <h2 className="mb-6 font-bold text-gray-300 text-2xl md:text-3xl tracking-wider">
            THE COMPLETE EVENT MANAGEMENT PLATFORM
          </h2>
          <p className="mx-auto max-w-3xl text-gray-400 text-lg md:text-xl leading-relaxed">
            We create experiences that captivate audiences from the first moment
          </p>
        </div>

        <div className="opacity-0 translate-y-12 animate-fadeInUp animation-delay-500 transform">
          <button className="group bg-red-600 hover:bg-red-700 hover:shadow-2xl px-12 py-4 rounded-lg font-semibold text-white text-lg hover:scale-105 transition-all duration-300 transform">
            <Link to="/login"> Start Creating Events</Link>
            <ArrowRight className="inline-block ml-2 transition-transform group-hover:translate-x-1 duration-300" />
          </button>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black to-transparent h-32"></div>
    </section>
  );
};

// About Section Component
export const AboutSection = () => {
  return (
    <section id="about" className="relative bg-black py-24 overflow-hidden">
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

      <div className="z-10 relative mx-auto px-6 max-w-7xl">
        <div className="items-center gap-16 grid grid-cols-1 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-semibold text-gray-400 text-sm uppercase tracking-widest">What We Offer</h3>
            <h2 className="mb-8 font-black text-white text-5xl md:text-6xl leading-tight">
              WELCOME TO <span className="text-red-600">EVENTHIVE</span>
            </h2>
            <div className="bg-red-600 mb-8 w-20 h-1"></div>
          </div>

          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              EventHive empowers event organizers to create unforgettable experiences while providing attendees with seamless discovery, registration, and participation.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We&apos;re passionate experts who deliver exceptional results through innovative technology and strategic event management.
            </p>
            <button className="group bg-transparent hover:bg-red-600 mt-8 px-8 py-3 border-2 border-red-600 rounded-lg font-semibold text-red-600 hover:text-white transition-all duration-300">
              LEARN MORE
              <ArrowRight className="inline-block ml-2 transition-transform group-hover:translate-x-1 duration-300" />
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
    <section id="services" className="relative bg-gray-900 py-24 overflow-hidden">
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

      <div className="z-10 relative mx-auto px-6 max-w-7xl text-center">
        <h3 className="mb-4 font-semibold text-gray-400 text-sm uppercase tracking-widest">How We Serve You</h3>
        <h2 className="mb-8 font-black text-white text-5xl md:text-6xl leading-tight">
          WE ARE PROUD TO <span className="text-red-600">SERVE YOU</span> THIS WAY
        </h2>
        <div className="bg-red-600 mx-auto mb-12 w-20 h-1"></div>

        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-gray-300 text-xl leading-relaxed">
            EventHive&apos;s comprehensive platform combines cutting-edge technology with expert event management to deliver extraordinary experiences that connect brands with their audiences.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
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
    <section id="features" className="relative bg-black py-24 overflow-hidden">
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
        <div className="top-0 right-0 absolute bg-gradient-to-l from-red-600/20 to-transparent w-1/2 h-full skew-x-12 origin-top-right transform"></div>
      </div>

      <div className="z-10 relative mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center">
          <h3 className="mb-4 font-semibold text-gray-400 text-sm uppercase tracking-widest">Platform Features</h3>
          <h2 className="mb-8 font-black text-white text-5xl md:text-6xl leading-tight">
            WE LOVE CREATING <span className="text-red-600">AMAZING EVENTS!</span>
          </h2>
          <div className="bg-red-600 mx-auto w-20 h-1"></div>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-900/50 hover:bg-gray-800/50 hover:shadow-2xl backdrop-blur-sm p-8 border border-gray-800 rounded-xl hover:scale-105 transition-all duration-500 transform"
            >
              <div className="mb-6">
                <div className="flex justify-center items-center bg-red-600/20 group-hover:bg-red-600/30 rounded-full w-16 h-16 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="mb-4 font-bold text-white group-hover:text-red-400 text-2xl transition-colors duration-300">
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
    <section id="statistics" className="relative bg-gray-900 py-24 overflow-hidden">
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
        <div className="top-20 left-20 absolute bg-red-600/10 blur-xl rounded-full w-32 h-32 animate-pulse"></div>
        <div className="right-32 bottom-32 absolute bg-white/5 blur-2xl rounded-full w-48 h-48 animate-pulse animation-delay-1000"></div>
        <div className="top-1/2 left-1/3 absolute bg-red-600/15 blur-lg rounded-full w-24 h-24 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="z-10 relative mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center">
          <h3 className="mb-4 font-semibold text-gray-400 text-sm uppercase tracking-widest">Our Impact</h3>
          <h2 className="mb-8 font-black text-white text-5xl md:text-6xl leading-tight">
            SOME FUN FACTS ABOUT <span className="text-red-600">EVENTHIVE</span>
          </h2>
          <div className="bg-red-600 mx-auto w-20 h-1"></div>
        </div>

        <div className="gap-8 grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 transform">
                <div className="mb-2 font-black text-red-600 text-5xl md:text-6xl">
                  {stat.number}
                </div>
                <div className="font-semibold text-gray-300 text-lg uppercase tracking-wider">
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
  const handleClick = () => {
    navigate("/login")
  }

  return (
    <section id="contact" className="relative bg-black py-32 overflow-hidden">
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
        <div className="top-0 left-1/4 absolute bg-red-600/20 blur-3xl rounded-full w-64 h-64"></div>
        <div className="top-20 right-1/4 absolute bg-white/10 blur-2xl rounded-full w-48 h-48"></div>
      </div>

      <div className="z-10 relative mx-auto px-6 max-w-5xl text-center">
        <h2 className="mb-8 font-black text-white text-5xl md:text-7xl leading-tight">
          We Are Your Complete <span className="text-red-600">Event Management</span> Solution
        </h2>
        <p className="mb-12 font-light text-gray-300 text-2xl md:text-3xl">
          Dedicated to Creating Memorable Experiences
        </p>

        <div className="md:flex md:justify-center md:space-x-6 space-y-6 md:space-y-0">
          <button onClick={handleClick} className="group bg-red-600 hover:bg-red-700 hover:shadow-2xl px-12 py-4 rounded-lg w-full md:w-auto font-semibold text-white text-lg hover:scale-105 transition-all duration-300 transform">
            Get Started Today
            <ArrowRight className="inline-block ml-2 transition-transform group-hover:translate-x-1 duration-300" />
          </button>
          <button className="group bg-transparent hover:bg-white px-12 py-4 border-2 border-white rounded-lg w-full md:w-auto font-semibold text-white hover:text-black text-lg transition-all duration-300">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

// Navigation Component
export const Navigation = () => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/90 backdrop-blur-md border-b border-gray-800`}>
      <div className="mx-auto px-6 py-4 max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="font-black text-white text-2xl">
            EVENT<span className="text-red-600">HIVE</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <a href="#features" className="font-medium text-gray-300 hover:text-red-600 transition-colors duration-300">Features</a>
            <a href="#services" className="font-medium text-gray-300 hover:text-red-600 transition-colors duration-300">Services</a>
            <a href="#about" className="font-medium text-gray-300 hover:text-red-600 transition-colors duration-300">About</a>
            <a href="#contact" className="font-medium text-gray-300 hover:text-red-600 transition-colors duration-300">Contact</a>
          </div>

          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 transform">
            <Link to="/login">Sign In</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};