'use client';

import { useState, useEffect } from 'react';

export default function TourismHero() {
  const [scrollY, setScrollY] = useState(0);
  const [currentDestination, setCurrentDestination] = useState(0);

  const destinations = [
    { name: 'Santorini', country: 'Greece', image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Kyoto', country: 'Japan', image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Patagonia', country: 'Argentina', image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [destinations.length]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0e27]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@300;400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Outfit', sans-serif;
          overflow-x: hidden;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(60px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.8);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .text-shimmer {
          background: linear-gradient(90deg, #fff 0%, #a8b3ff 50%, #fff 100%);
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .grain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.03;
          z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Grain texture overlay */}
      <div className="grain" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-float"
          style={{ 
            background: 'radial-gradient(circle, #667eea 0%, transparent 70%)',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute top-1/2 -left-32 w-80 h-80 rounded-full blur-3xl animate-float"
          style={{ 
            background: 'radial-gradient(circle, #f093fb 0%, transparent 70%)',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute -bottom-32 right-1/4 w-72 h-72 rounded-full blur-3xl animate-float"
          style={{ 
            background: 'radial-gradient(circle, #4facfe 0%, transparent 70%)',
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-6 md:py-8 animate-fade-in">
        <div className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          Wanderluxe
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-light text-white/80">
          <a href="#" className="hover:text-white transition-colors duration-300">Destinations</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Experiences</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Stories</a>
          <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300">
            Plan Trip
          </button>
        </div>
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl w-full mx-auto">
          {/* Eyebrow text */}
          <div className="text-center mb-6 animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs md:text-sm text-white/70 font-light tracking-wider uppercase">
              Discover the Extraordinary
            </span>
          </div>

          {/* Main headline */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-center mb-6 leading-tight animate-slide-up"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              animationDelay: '0.4s',
              opacity: 0
            }}
          >
            <span className="block text-shimmer">
              Journey Beyond
            </span>
            <span className="block text-white mt-2">
              Boundaries
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-base md:text-xl lg:text-2xl text-center text-white/60 max-w-3xl mx-auto mb-12 font-light leading-relaxed animate-slide-up"
            style={{ 
              animationDelay: '0.6s',
              opacity: 0
            }}
          >
            Curated adventures to the world&apos;s most breathtaking destinations. 
            Where luxury meets authentic exploration.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up"
            style={{ 
              animationDelay: '0.8s',
              opacity: 0
            }}
          >
            <button className="group relative px-8 md:px-10 py-4 md:py-5 bg-white text-[#0a0e27] rounded-full font-medium text-sm md:text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-auto">
              <span className="relative z-10">Explore Destinations</span>
              <div className="absolute inset-0 bg-linear-to-r from-[#667eea] to-[#764ba2] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="px-8 md:px-10 py-4 md:py-5 bg-transparent border-2 border-white/30 text-white rounded-full font-medium text-sm md:text-base backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto">
              Watch Stories
            </button>
          </div>

          {/* Featured Destinations Carousel */}
          <div 
            className="animate-scale-in"
            style={{ 
              animationDelay: '1s',
              opacity: 0
            }}
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="relative h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
                {destinations.map((dest, index) => (
                  <div
                    key={dest.name}
                    className="absolute inset-0 transition-all duration-1000 ease-in-out"
                    style={{
                      background: dest.image,
                      opacity: currentDestination === index ? 1 : 0,
                      transform: currentDestination === index ? 'scale(1)' : 'scale(1.1)',
                    }}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <div className="text-white/60 text-sm md:text-base font-light mb-2 tracking-wider uppercase">
                        {dest.country}
                      </div>
                      <div 
                        className="text-4xl md:text-6xl font-bold text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {dest.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {destinations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentDestination(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentDestination === index ? 'w-12 bg-white' : 'w-6 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-wider font-light">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
