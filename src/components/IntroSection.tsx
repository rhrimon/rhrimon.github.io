'use client';

import { useState, useEffect } from 'react';

const IntroSection = () => {
  const [activeTab, setActiveTab] = useState('for-anyone');
  const [showNameIntro, setShowNameIntro] = useState(true);
  const [showTabbedIntro, setShowTabbedIntro] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [previousTab, setPreviousTab] = useState('');
  
  useEffect(() => {
    // Start with name intro visible
    const nameIntroTimer = setTimeout(() => {
      // After 2 seconds, fade out name intro
      setShowNameIntro(false);
      
      // After name intro fades out, show tabbed intro
      const tabbedIntroTimer = setTimeout(() => {
        setShowTabbedIntro(true);
        // Add class to body when tabbed intro is visible
        document.body.classList.add('tabbed-intro-visible');
      }, 600); // Wait for fade-out animation to complete
      
      return () => clearTimeout(tabbedIntroTimer);
    }, 2000);
    
    // Cleanup function to remove the class when component unmounts
    return () => {
      clearTimeout(nameIntroTimer);
      document.body.classList.remove('tabbed-intro-visible');
    };
  }, []);

  const handleTabClick = (tab: string) => {
    if (tab === activeTab) return;
    
    setPreviousTab(activeTab);
    setFadingOut(true);
    
    // First fade out current tab
    setTimeout(() => {
      setActiveTab(tab);
      setFadingOut(false);
    }, 100); // Match the fadeOut animation duration of 0.3s
  };

  return (
    <section id="intro" className="section">
      <div className="container h-screen flex flex-col items-center justify-center">
        {/* Name Intro */}
        <h1 
          className={`text-[4.5rem] sm:text-[5.5rem] lg:text-[20rem] font-medium mb-4 transition-opacity duration-300 
            ${showNameIntro ? 'visible' : 'fade-out'} 
            ${!showNameIntro && !showTabbedIntro ? 'custom-hidden' : ''}`}
          style={{ 
            lineHeight: '1.1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: showNameIntro ? '80vh' : '0',
          }}
        >
          rimon<br />hasan
        </h1>
        
        {/* Tabbed Intro */}
        <div 
          id="tabbed-intro"
          className={`w-full max-w-[1200px] mx-auto absolute top-0 left-0 right-0 px-4 sm:px-0 ${
            showTabbedIntro ? 'visible' : 'custom-hidden'
          }`}
          style={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10vh 0 5rem',
          }}
        >
          {/* Tab Buttons */}
          <div className="intro-tabs flex flex-nowrap gap-4 sm:gap-6 md:gap-8 mb-0 w-full z-10 max-w-[870px] overflow-x-auto pb-2 px-4 sm:px-0 scrollbar-hide mx-auto">
            <button
              className={`tab-btn text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'for-anyone' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('for-anyone')}
            >
              for anyone
            </button>
            <button
              className={`tab-btn text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'recruiters' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('recruiters')}
            >
              recruiters
            </button>
            <button
              className={`tab-btn text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'qa' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('qa')}
            >
              QA
            </button>
            <button
              className={`tab-btn text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'engineers' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('engineers')}
            >
              engineers
            </button>
            <button
              className={`tab-btn text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'designers' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('designers')}
            >
              designers
            </button>
            <button
              className={`tab-btn text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === 'product-managers' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('product-managers')}
            >
              product managers
            </button>
          </div>
          
          {/* Static Heading */}
          <h2 className="static-heading text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-medium mt-0 mb-3 leading-tight w-full text-left max-w-[870px] mx-auto">
            hello there
          </h2>
          
          {/* Tab Content */}
          <div className="intro-content max-w-[870px] relative min-h-[400px] flex flex-col items-start justify-start w-full pb-8 md:pb-12 mx-auto">
            <div className={`tab-content ${activeTab === 'for-anyone' && !fadingOut ? 'active' : ''} ${previousTab === 'for-anyone' && fadingOut ? 'fade-out' : ''}`}>
              <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                i&apos;m a QA engineer
              </h3>
              <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                who loves to break things
              </h3>
            </div>
            
            <div className={`tab-content ${activeTab === 'recruiters' && !fadingOut ? 'active' : ''} ${previousTab === 'recruiters' && fadingOut ? 'fade-out' : ''}`}>
              <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                i&apos;m a QA engineer with over 10 years of experience in both manual and automated software testing
              </h3>
              <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                i <span className="text-[#35C589]">am</span> currently looking for a new role
              </h3>
            </div>
            
            <div className={`tab-content ${activeTab === 'qa' && !fadingOut ? 'active' : ''} ${previousTab === 'qa' && fadingOut ? 'fade-out' : ''}`}>
              <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                i&apos;m a QA engineer who thinks the best teams are built on trust and curiosity
              </h3>
            </div>
            
            <div className={`tab-content ${activeTab === 'engineers' && !fadingOut ? 'active' : ''} ${previousTab === 'engineers' && fadingOut ? 'fade-out' : ''}`}>
              <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                i&apos;m a QA engineer who believes that tight collaboration with devs is the best way to craft bulletproof code
              </h3>
            </div>
            
            <div className={`tab-content ${activeTab === 'designers' && !fadingOut ? 'active' : ''} ${previousTab === 'designers' && fadingOut ? 'fade-out' : ''}`}>
              <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                i&apos;m a QA engineer who knows thoughtful design deserves a thoughtful execution
              </h3>
            </div>
            
            <div className={`tab-content ${activeTab === 'product-managers' && !fadingOut ? 'active' : ''} ${previousTab === 'product-managers' && fadingOut ? 'fade-out' : ''}`}>
              <h3 className="text-3xl md:text-[3rem] font-medium mt-0 mb-1 leading-tight w-full text-left">
                i&apos;m a QA engineer who makes sure the product vision is always backed by quality
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 