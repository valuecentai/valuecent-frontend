import React, { useState, useEffect } from 'react';
import { DoubleChevronDownIcon } from './Icons';

const ScrollIndicator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Show the indicator after a short delay, but only if user hasn't scrolled
    const timer = setTimeout(() => {
      if (window.scrollY < 50) {
          setIsVisible(true);
      }
    }, 1500);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (!hasScrolled) setHasScrolled(true);
        if (isVisible) setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, hasScrolled]);

  const handleScrollDown = () => {
    const firstSection = document.getElementById('ai-navigator');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-20 transition-all duration-500 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={handleScrollDown}
          className="group relative flex flex-col items-center space-y-1 text-slate-400 hover:text-white transition-colors"
          aria-label="Scroll down to explore"
        >
          <div className="absolute -inset-2 rounded-full bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Explore
          </span>
          <DoubleChevronDownIcon className="relative w-8 h-8 animate-bounce-slow" />
        </button>
      </div>
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce-slow {
            animation: bounce-slow 1.5s infinite;
        }
      `}</style>
    </>
  );
};

export default ScrollIndicator;