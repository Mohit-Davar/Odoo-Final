
// Custom CSS animations and utilities
export const CustomStyles = () => (
  <style jsx global>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }
    
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    
    @keyframes glow {
      0%, 100% {
        text-shadow: 0 0 20px rgba(183, 30, 9, 0.5);
      }
      50% {
        text-shadow: 0 0 30px rgba(183, 30, 9, 0.8), 0 0 40px rgba(183, 30, 9, 0.4);
      }
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 1s ease-out forwards;
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-glow {
      animation: glow 3s ease-in-out infinite;
    }
    
    .animation-delay-500 {
      animation-delay: 0.5s;
    }
    
    .animation-delay-1000 {
      animation-delay: 1s;
    }
    
    .animation-delay-1500 {
      animation-delay: 1.5s;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .text-shimmer {
      background: linear-gradient(
        90deg,
        #f5f5f5 0%,
        #ffffff 50%,
        #f5f5f5 100%
      );
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s ease-in-out infinite;
    }
    
    .bg-noise {
      background-image: 
        radial-gradient(circle at 25% 25%, rgba(183, 30, 9, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    }
    
    .backdrop-blur-strong {
      backdrop-filter: blur(20px);
    }
    
    /* Parallax Effect */
    .parallax {
      transform: translateZ(0);
      transition: transform 0.1s ease-out;
    }
    
    /* Red Glow Effect */
    .red-glow {
      box-shadow: 
        0 0 20px rgba(183, 30, 9, 0.3),
        0 0 40px rgba(183, 30, 9, 0.2),
        0 0 60px rgba(183, 30, 9, 0.1);
    }
    
    /* Gradient Text */
    .gradient-text {
      background: linear-gradient(135deg, #f5f5f5 0%, #b71e09 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #000203;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #b71e09;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #d62c0a;
    }
    
    /* Smooth Scrolling */
    html {
      scroll-behavior: smooth;
    }
    
    /* Dark Selection */
    ::selection {
      background: rgba(183, 30, 9, 0.3);
      color: #f5f5f5;
    }
    
    /* Atmospheric Effects */
    .atmospheric-bg::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(ellipse at top left, rgba(183, 30, 9, 0.1) 0%, transparent 50%),
        radial-gradient(ellipse at top right, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at bottom center, rgba(183, 30, 9, 0.08) 0%, transparent 50%);
      pointer-events: none;
    }
    
    /* Enhanced Hover Effects */
    .hover-lift {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hover-lift:hover {
      transform: translateY(-4px);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(183, 30, 9, 0.2);
    }
    
    /* Text Reveal Animation */
    .text-reveal {
      overflow: hidden;
    }
    
    .text-reveal::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #b71e09;
      transform: translateX(-100%);
      animation: reveal 1.5s ease-out forwards;
    }
    
    @keyframes reveal {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    
    /* Cinematic Vignette */
    .vignette::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
        ellipse at center,
        transparent 0%,
        transparent 65%,
        rgba(0, 2, 3, 0.4) 100%
      );
      pointer-events: none;
    }
  `}</style>
);

// Loading Animation Component
export const LoadingAnimation = () => (
  <div className="z-50 fixed inset-0 flex justify-center items-center bg-black">
    <div className="text-center">
      <div className="mb-4 font-black text-white text-4xl animate-glow">
        EVENT<span className="text-red-600">HIVE</span>
      </div>
      <div className="bg-red-600 mx-auto w-16 h-1 animate-pulse"></div>
    </div>
  </div>
);