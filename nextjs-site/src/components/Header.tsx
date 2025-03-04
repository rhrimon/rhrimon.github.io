'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'work', 'values', 'about', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6">
      <nav className="container">
        <ul className="flex justify-center space-x-8 md:space-x-12">
          <li>
            <Link 
              href="#intro" 
              className={`text-sm md:text-base hover:text-gray-400 transition-colors duration-300 ${activeSection === 'intro' ? 'text-white' : 'text-gray-500'}`}
            >
              intro
            </Link>
          </li>
          <li>
            <Link 
              href="#work" 
              className={`text-sm md:text-base hover:text-gray-400 transition-colors duration-300 ${activeSection === 'work' ? 'text-white' : 'text-gray-500'}`}
            >
              work
            </Link>
          </li>
          <li>
            <Link 
              href="#values" 
              className={`text-sm md:text-base hover:text-gray-400 transition-colors duration-300 ${activeSection === 'values' ? 'text-white' : 'text-gray-500'}`}
            >
              values
            </Link>
          </li>
          <li>
            <Link 
              href="#about" 
              className={`text-sm md:text-base hover:text-gray-400 transition-colors duration-300 ${activeSection === 'about' ? 'text-white' : 'text-gray-500'}`}
            >
              about
            </Link>
          </li>
          <li>
            <Link 
              href="#contact" 
              className={`text-sm md:text-base hover:text-gray-400 transition-colors duration-300 ${activeSection === 'contact' ? 'text-white' : 'text-gray-500'}`}
            >
              contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 