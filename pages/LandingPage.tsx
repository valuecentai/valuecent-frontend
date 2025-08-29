import React, { useState, useRef, useEffect } from 'react';
import { View } from '../types';
import { getAiCareerSuggestion } from '../services/geminiService';
import { CompassIcon, MagicWandIcon, LayoutGridIcon, BrainCircuitIcon, ExternalLinkIcon } from '../components/Icons';
import AnimatedBackground from '../components/AnimatedBackground';
import TypingIndicator from '../components/TypingIndicator';

interface LandingPageProps {
  navigateTo: (view: View) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigateTo }) => {
  // State for AI feature
  const [careerGoal, setCareerGoal] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const textElement = heroElement.querySelector('h1');
    if (!textElement) return;

    const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = heroElement.getBoundingClientRect();
        // Calculate position from -0.5 to 0.5
        const xPos = (e.clientX - left) / width - 0.5;
        const yPos = (e.clientY - top) / height - 0.5;
        
        const maxRotate = 15; // degrees

        const rotateY = xPos * maxRotate * 1.5;
        const rotateX = -yPos * maxRotate;
        
        textElement.style.transition = 'transform 0.1s ease-out';
        textElement.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        textElement.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        textElement.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    heroElement.addEventListener('mousemove', handleMouseMove);
    heroElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);


  // FIX: handleAnalyzeCareer is now async to properly await the AI response.
  const handleAnalyzeCareer = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!careerGoal.trim() || isAnalyzing) return;

      setIsAnalyzing(true);
      setAiSuggestion('');

      // Get AI-powered suggestion
      const suggestion = await getAiCareerSuggestion(careerGoal);
      setAiSuggestion(suggestion);
      setIsAnalyzing(false);
  };

  return (
    <div>
        {/* Hero Section */}
        <section ref={heroRef} className="relative flex items-center justify-center text-center py-20 md:py-40 overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="hero-text-container valuecent-animated-gradient mb-4 text-7xl md:text-8xl">
                    {'Valuecent'.split('').map((letter, index) =>
                        <span key={index} className="hover-letter">{letter}</span>
                    )}
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto orange-gradient-text">
                    The Future of Professional Learning.
                </p>
            </div>
        </section>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-8">
                    {/* Main AI Feature Card */}
                    <section id="ai-navigator" className="soft-outset relative overflow-hidden p-8">
                        <div className="relative z-10">
                            <div className="flex justify-center items-center gap-3 mb-4">
                                <CompassIcon className="w-10 h-10 text-blue-500"/>
                                <h2 className="text-3xl font-bold text-[var(--fg)]">Navigate Your Future with AI</h2>
                            </div>
                            <p className="text-lg text-[var(--fg-muted)] mb-8 max-w-3xl mx-auto text-center">
                               Not sure where to start? Describe your career goal, and our AI will suggest a learning path for you.
                            </p>
                            <form onSubmit={handleAnalyzeCareer} className="flex flex-col sm:flex-row gap-4 items-center max-w-2xl mx-auto">
                                <input
                                    type="text"
                                    value={careerGoal}
                                    onChange={(e) => setCareerGoal(e.target.value)}
                                    placeholder="e.g., 'Become a leader in digital finance'"
                                    className="w-full px-5 py-3 bg-[var(--secondary-bg)] rounded-full text-[var(--secondary-fg)] placeholder-[var(--fg-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] soft-inset"
                                    disabled={isAnalyzing}
                                />
                                <button
                                    type="submit"
                                    disabled={isAnalyzing || !careerGoal.trim()}
                                    className="flex-shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 disabled:bg-[var(--bg-disabled)] disabled:cursor-not-allowed disabled:scale-100"
                                >
                                    <MagicWandIcon className="w-5 h-5"/>
                                    <span>Analyze</span>
                                </button>
                            </form>
                            
                            {(isAnalyzing || aiSuggestion) && (
                                <div className="mt-6 text-left max-w-2xl mx-auto p-6 bg-[var(--secondary-bg)] rounded-xl soft-inset">
                                    {isAnalyzing ? (
                                        <TypingIndicator text="AI is analyzing" />
                                    ) : (
                                        <p className="text-[var(--secondary-fg)] whitespace-pre-wrap">{aiSuggestion}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Quick Access Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* AI Expert Card */}
                        <a
                            href="https://notebooklm.google.com/notebook/f0ce5b70-bdb6-4879-8313-0f64f2498130"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="soft-outset soft-outset-hover soft-inset-press block relative p-8 cursor-pointer overflow-hidden group"
                        >
                            <div className="flex items-center relative z-10">
                                <div className="mr-6">
                                    <div className="w-16 h-16 rounded-lg bg-purple-500/20 dark:bg-purple-500/10 flex items-center justify-center ring-1 ring-purple-500/30 dark:ring-purple-500/20 group-hover:ring-purple-400/50 transition-all duration-300">
                                        <BrainCircuitIcon className="w-9 h-9 text-purple-400 dark:text-purple-500 group-hover:text-purple-300 dark:group-hover:text-purple-400 transition-colors duration-300" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--fg)] flex items-center gap-2">
                                        <span>AI-Expert for Experts</span>
                                        <ExternalLinkIcon className="w-5 h-5 text-[var(--fg-subtle)] group-hover:text-[var(--fg-muted)] transition-colors" />
                                    </h2>
                                    <p className="text-lg text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors duration-300">
                                        Unlock unparalleled insights with our most advanced AI.
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* Explore Courses Card */}
                        <div 
                            onClick={() => navigateTo({ page: 'courses' })}
                            className="soft-outset soft-outset-hover soft-inset-press relative p-8 cursor-pointer overflow-hidden group"
                        >
                            <div className="flex items-center relative z-10">
                                <div className="mr-6">
                                    <div className="w-16 h-16 rounded-lg bg-blue-500/20 dark:bg-blue-500/10 flex items-center justify-center ring-1 ring-blue-500/30 dark:ring-blue-500/20">
                                        <LayoutGridIcon className="w-8 h-8 text-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--fg)]">Explore Courses</h2>
                                    <p className="text-lg text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors duration-300">
                                        Browse our complete course catalog to start your learning journey.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>{`
          /* --- START OF HERO TEXT STYLES --- */
          .hero-text-container {
              font-weight: 800;
              letter-spacing: -0.05em;
              transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), text-shadow 0.3s ease;
              will-change: transform;
          }
          .hero-text-container:hover {
            text-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 25px rgba(79, 70, 229, 0.3);
          }
  
          .valuecent-animated-gradient {
              background: linear-gradient(
                  90deg, 
                  #3b82f6,
                  #6366f1,
                  #0ea5e9,
                  #6366f1,
                  #3b82f6
              );
              background-size: 200% 200%;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: gradient-animation 6s ease infinite;
          }

          .orange-gradient-text {
              background-image: linear-gradient(90deg, #f59e0b, #ef4444, #f59e0b);
              background-size: 200% 200%;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: 600;
              animation: gradient-animation 4s ease infinite;
          }
  
          @keyframes gradient-animation {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
          }
  
          .hover-letter {
              display: inline-block;
              transform-origin: bottom;
              cursor: pointer;
              transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
                          filter 0.3s ease;
          }
  
          .hover-letter:hover {
              transform: translateY(-10px) scale(1.1);
              filter: drop-shadow(0 6px 10px rgba(59, 130, 246, 0.5));
          }
          /* --- END OF HERO TEXT STYLES --- */
        `}</style>
    </div>
  );
};

export default LandingPage;