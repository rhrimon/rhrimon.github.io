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
          className={`text-6xl md:text-8xl font-semibold mb-4 transition-opacity duration-500 ${
            showNameIntro ? 'opacity-100' : 'opacity-0'
          } ${!showNameIntro && !showTabbedIntro ? 'hidden' : ''}`}
          style={{ 
            animation: showNameIntro ? 'fadeIn 0.5s ease-in-out' : 'fadeOut 1s ease-in-out',
          }}
        >
          rimon<br />hasan
        </h1>
        
        {/* Tabbed Intro */}
        <div 
          className={`w-full max-w-3xl transition-opacity duration-500 ${
            showTabbedIntro ? 'opacity-100' : 'opacity-0 hidden'
          }`}
          style={{ 
            animation: showTabbedIntro ? 'fadeIn 1s ease-in-out' : '',
          }}
        >
          {/* Tab Buttons */}
          <div className="flex flex-wrap mb-8 border-b border-gray-700">
            <button
              className={`mr-6 pb-2 text-sm md:text-base transition-colors duration-300 ${
                activeTab === 'for-anyone' ? 'text-white border-b-2 border-white' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('for-anyone')}
            >
              for anyone
            </button>
            <button
              className={`mr-6 pb-2 text-sm md:text-base transition-colors duration-300 ${
                activeTab === 'recruiters' ? 'text-white border-b-2 border-white' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('recruiters')}
            >
              recruiters
            </button>
            <button
              className={`pb-2 text-sm md:text-base transition-colors duration-300 ${
                activeTab === 'qa' ? 'text-white border-b-2 border-white' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick('qa')}
            >
              QA
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'for-anyone' && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl md:text-3xl font-medium mb-4">
                  I&apos;m a software engineer with a passion for building products that people love.
                </h3>
                <p className="text-gray-300 mb-4">
                  Currently working at <a href="#" className="text-white hover:text-gray-400">Company Name</a>, 
                  where I focus on creating intuitive and performant user experiences.
                </p>
                <p className="text-gray-300">
                  I believe in clean code, thoughtful design, and continuous learning.
                </p>
              </div>
            )}
            
            {activeTab === 'recruiters' && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl md:text-3xl font-medium mb-4">
                  Experienced software engineer with a focus on frontend development.
                </h3>
                <p className="text-gray-300 mb-4">
                  My technical skills include JavaScript, TypeScript, React, Next.js, and more.
                  I have X years of experience building web applications and working in team environments.
                </p>
                <p className="text-gray-300">
                  Looking for opportunities where I can contribute to meaningful projects and continue growing as a developer.
                </p>
              </div>
            )}
            
            {activeTab === 'qa' && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl md:text-3xl font-medium mb-4">
                  Quality and attention to detail are at the core of my work.
                </h3>
                <p className="text-gray-300 mb-4">
                  I believe in thorough testing, documentation, and maintaining high standards in everything I build.
                </p>
                <p className="text-gray-300">
                  My approach includes automated testing, code reviews, and continuous improvement.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection; 