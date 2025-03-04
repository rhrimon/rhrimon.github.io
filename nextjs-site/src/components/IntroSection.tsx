'use client';

import { useState, useEffect } from 'react';

const IntroSection = () => {
  const [activeTab, setActiveTab] = useState('for-anyone');
  const [showNameIntro, setShowNameIntro] = useState(true);
  const [showTabbedIntro, setShowTabbedIntro] = useState(false);

  useEffect(() => {
    // Start with name intro visible
    const nameIntroTimer = setTimeout(() => {
      // After 2 seconds, fade out name intro
      setShowNameIntro(false);
      
      // After name intro fades out, show tabbed intro
      const tabbedIntroTimer = setTimeout(() => {
        setShowTabbedIntro(true);
      }, 1000); // Wait for fade-out animation to complete
      
      return () => clearTimeout(tabbedIntroTimer);
    }, 2000);
    
    return () => clearTimeout(nameIntroTimer);
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section id="intro" className="section">
      <div className="container">
        {/* Name Intro */}
        <h1 
          className={`text-6xl md:text-8xl lg:text-9xl font-medium mb-4 transition-opacity duration-500 ${
            showNameIntro ? 'opacity-100' : 'opacity-0'
          } ${!showNameIntro && !showTabbedIntro ? 'hidden' : ''}`}
          style={{ 
            animation: showNameIntro ? 'fadeIn 0.5s ease-in-out' : 'fadeOut 1s ease-in-out',
            lineHeight: '1.1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          rimon<br />hasan
        </h1>
        
        {/* Tabbed Intro */}
        <div 
          className={`w-full max-w-[870px] mx-auto transition-opacity duration-500 ${
            showTabbedIntro ? 'opacity-100' : 'opacity-0 hidden'
          }`}
          style={{ 
            animation: showTabbedIntro ? 'fadeIn 1s ease-in-out' : '',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10vh 2rem 5rem',
          }}
        >
          {/* Tab Buttons */}
          <div className="flex flex-nowrap gap-8 mb-0 w-full z-10 max-w-[870px] overflow-x-auto pb-2 scrollbar-hide">
            <button
              className={`text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'for-anyone' ? 'text-white opacity-100' : 'text-[#666564] opacity-70'
              }`}
              onClick={() => handleTabClick('for-anyone')}
            >
              for anyone
            </button>
            <button
              className={`text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'recruiters' ? 'text-white opacity-100' : 'text-[#666564] opacity-70'
              }`}
              onClick={() => handleTabClick('recruiters')}
            >
              recruiters
            </button>
            <button
              className={`text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'qa' ? 'text-white opacity-100' : 'text-[#666564] opacity-70'
              }`}
              onClick={() => handleTabClick('qa')}
            >
              QA
            </button>
            <button
              className={`text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'engineers' ? 'text-white opacity-100' : 'text-[#666564] opacity-70'
              }`}
              onClick={() => handleTabClick('engineers')}
            >
              engineers
            </button>
            <button
              className={`text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'designers' ? 'text-white opacity-100' : 'text-[#666564] opacity-70'
              }`}
              onClick={() => handleTabClick('designers')}
            >
              designers
            </button>
            <button
              className={`text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'product-managers' ? 'text-white opacity-100' : 'text-[#666564] opacity-70'
              }`}
              onClick={() => handleTabClick('product-managers')}
            >
              product managers
            </button>
          </div>
          
          {/* Static Heading */}
          <h2 className="text-4xl font-medium mt-0 mb-3 leading-tight w-full text-left max-w-[870px]">
            hello there
          </h2>
          
          {/* Tab Content */}
          <div className="max-w-[870px] relative min-h-[400px] flex flex-col items-start justify-start w-full pb-12">
            {activeTab === 'for-anyone' && (
              <div className="w-full animate-fadeIn">
                <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                  i&apos;m a QA engineer
                </h3>
                <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                  who loves to break things
                </h3>
              </div>
            )}
            
            {activeTab === 'recruiters' && (
              <div className="w-full animate-fadeIn">
                <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                  i&apos;m a QA engineer with over 10 years of experience in both manual and automated software testing
                </h3>
                <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                  i <span className="text-[#35C589]">am</span> currently looking for a new role
                </h3>
              </div>
            )}
            
            {activeTab === 'qa' && (
              <div className="w-full animate-fadeIn">
                <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                  i&apos;m a QA engineer who thinks the best teams are built on trust and curiosity
                </h3>
              </div>
            )}
            
            {activeTab === 'engineers' && (
              <div className="w-full animate-fadeIn">
                <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                  i&apos;m a QA engineer who believes that tight collaboration with devs is the best way to craft bulletproof code
                </h3>
              </div>
            )}
            
            {activeTab === 'designers' && (
              <div className="w-full animate-fadeIn">
                <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                  i&apos;m a QA engineer who knows thoughtful design deserves a thoughtful execution
                </h3>
              </div>
            )}
            
            {activeTab === 'product-managers' && (
              <div className="w-full animate-fadeIn">
                <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                  i&apos;m a QA engineer who makes sure the product vision is always backed by quality
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 