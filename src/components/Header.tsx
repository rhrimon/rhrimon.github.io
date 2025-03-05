'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type SectionType = 'intro' | 'work' | 'values' | 'about' | 'contact';

const Header = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuAnimating, setMenuAnimating] = useState(false);
  const [tabbedIntroVisible, setTabbedIntroVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<SectionType, HTMLElement>>(new Map());

  // Check if tabbed intro is visible
  useEffect(() => {
    const checkTabbedIntroVisible = () => {
      setTabbedIntroVisible(document.body.classList.contains('tabbed-intro-visible'));
    };
    
    // Initial check
    checkTabbedIntroVisible();
    
    // Set up a mutation observer to watch for class changes on the body
    const observer = new MutationObserver(checkTabbedIntroVisible);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Function to handle link clicks
  const handleLinkClick = (section: SectionType, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection(section);
    
    // Close mobile menu if open with animation
    if (mobileMenuOpen) {
      // Start fade-out animation
      setMenuAnimating(true);
      // Wait for animation to complete before hiding menu
      setTimeout(() => {
        setMobileMenuOpen(false);
        setMenuAnimating(false);
      }, 300); // Match the duration in CSS (0.3s)
    }
    
    // Scroll to the section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Update URL hash without causing a scroll
      window.history.pushState(null, '', `#${section}`);
    }
  };

  useEffect(() => {
    // Get all sections
    const sections: SectionType[] = ['intro', 'work', 'values', 'about', 'contact'];
    
    // Store references to all sections
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        sectionRefs.current.set(section, element);
      }
    });

    // Check if there's a hash in the URL on initial load
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.includes(hash as SectionType)) {
      setActiveSection(hash as SectionType);
      
      // Scroll to the section after a short delay to ensure the page is fully loaded
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      }, 100);
    }

    // Create a new IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the section that is most visible
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        
        if (visibleSections.length > 0) {
          // Sort by visibility ratio (how much of the section is visible)
          visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          
          // Get the most visible section
          const mostVisibleSection = visibleSections[0];
          const sectionId = mostVisibleSection.target.id as SectionType;
          
          if (sections.includes(sectionId)) {
            setActiveSection(sectionId);
            
            // Update URL hash without causing a scroll
            if (window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, '', `#${sectionId}`);
            }
          }
        }
      },
      {
        // Root is the viewport
        root: null,
        // Margin around the root
        rootMargin: '-10% 0px -10% 0px',
        // Threshold is the percentage of the target's visibility
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    // Observe all sections
    sectionRefs.current.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    // Handle hash change events
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sections.includes(hash as SectionType)) {
        setActiveSection(hash as SectionType);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      // Disconnect the observer when the component unmounts
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      // Remove event listener
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Handle menu open/close with animation
  const handleMenuToggle = () => {
    if (mobileMenuOpen) {
      // Start fade-out animation
      setMenuAnimating(true);
      // Wait for animation to complete before hiding menu
      setTimeout(() => {
        setMobileMenuOpen(false);
        setMenuAnimating(false);
      }, 300); // Match the duration in CSS (0.3s)
    } else {
      setMobileMenuOpen(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6">
      {/* Center navbar - visible only on intro section and when tabbed intro is visible */}
      <nav className={`container transition-all duration-300 ease ${
        activeSection === 'intro' && tabbedIntroVisible
          ? 'opacity-100 transform translate-y-0 navbar-center' 
          : 'opacity-0 transform -translate-y-10 pointer-events-none'
      }`}>
        <ul className="flex justify-center space-x-10 md:space-x-14">
          <li>
            <Link 
              href="#intro" 
              className={`text-base md:text-lg hover:text-white transition-colors duration-300 ${activeSection === 'intro' ? 'text-white active' : 'text-gray-500'}`}
              onClick={(e) => handleLinkClick('intro', e)}
              aria-current={activeSection === 'intro' ? 'page' : undefined}
            >
              intro
            </Link>
          </li>
          <li>
            <Link 
              href="#work" 
              className={`text-base md:text-lg hover:text-white transition-colors duration-300 ${activeSection === 'work' ? 'text-white active' : 'text-gray-500'}`}
              onClick={(e) => handleLinkClick('work', e)}
              aria-current={activeSection === 'work' ? 'page' : undefined}
            >
              work
            </Link>
          </li>
          <li>
            <Link 
              href="#values" 
              className={`text-base md:text-lg hover:text-white transition-colors duration-300 ${activeSection === 'values' ? 'text-white active' : 'text-gray-500'}`}
              onClick={(e) => handleLinkClick('values', e)}
              aria-current={activeSection === 'values' ? 'page' : undefined}
            >
              values
            </Link>
          </li>
          <li>
            <Link 
              href="#about" 
              className={`text-base md:text-lg hover:text-white transition-colors duration-300 ${activeSection === 'about' ? 'text-white active' : 'text-gray-500'}`}
              onClick={(e) => handleLinkClick('about', e)}
              aria-current={activeSection === 'about' ? 'page' : undefined}
            >
              about
            </Link>
          </li>
          <li>
            <Link 
              href="#contact" 
              className={`text-base md:text-lg hover:text-white transition-colors duration-300 ${activeSection === 'contact' ? 'text-white active' : 'text-gray-500'}`}
              onClick={(e) => handleLinkClick('contact', e)}
              aria-current={activeSection === 'contact' ? 'page' : undefined}
            >
              contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right-aligned navbar - visible when not on intro section (desktop only) */}
      <div className={`fixed top-6 right-8 z-50 transition-all duration-300 ease ${
        activeSection !== 'intro'
          ? 'navbar-visible' 
          : 'navbar-hidden'
      }`}>
        <nav className="hidden md:block">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link 
                href="#intro" 
                className={`text-sm hover:text-white transition-colors duration-300 ${activeSection === 'intro' ? 'text-white active' : 'text-gray-500'}`}
                onClick={(e) => handleLinkClick('intro', e)}
                aria-current={activeSection === 'intro' ? 'page' : undefined}
              >
                intro
              </Link>
            </li>
            <li>
              <Link 
                href="#work" 
                className={`text-sm hover:text-white transition-colors duration-300 ${activeSection === 'work' ? 'text-white active' : 'text-gray-500'}`}
                onClick={(e) => handleLinkClick('work', e)}
                aria-current={activeSection === 'work' ? 'page' : undefined}
              >
                work
              </Link>
            </li>
            <li>
              <Link 
                href="#values" 
                className={`text-sm hover:text-white transition-colors duration-300 ${activeSection === 'values' ? 'text-white active' : 'text-gray-500'}`}
                onClick={(e) => handleLinkClick('values', e)}
                aria-current={activeSection === 'values' ? 'page' : undefined}
              >
                values
              </Link>
            </li>
            <li>
              <Link 
                href="#about" 
                className={`text-sm hover:text-white transition-colors duration-300 ${activeSection === 'about' ? 'text-white active' : 'text-gray-500'}`}
                onClick={(e) => handleLinkClick('about', e)}
                aria-current={activeSection === 'about' ? 'page' : undefined}
              >
                about
              </Link>
            </li>
            <li>
              <Link 
                href="#contact" 
                className={`text-sm hover:text-white transition-colors duration-300 ${activeSection === 'contact' ? 'text-white active' : 'text-gray-500'}`}
                onClick={(e) => handleLinkClick('contact', e)}
                aria-current={activeSection === 'contact' ? 'page' : undefined}
              >
                contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile hamburger menu button */}
      <button 
        className={`md:hidden fixed top-6 right-6 z-50 w-10 h-10 flex flex-col justify-center items-center focus:outline-none ${mobileMenuOpen || menuAnimating ? 'open' : ''}`}
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-line transition-all duration-300 ease block w-6 h-0.5 bg-white mb-1.5 ${mobileMenuOpen || menuAnimating ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`hamburger-line transition-all duration-300 ease block w-6 h-0.5 bg-white mb-1.5 ${mobileMenuOpen || menuAnimating ? 'opacity-0' : ''}`}></span>
        <span className={`hamburger-line transition-all duration-300 ease block w-6 h-0.5 bg-white ${mobileMenuOpen || menuAnimating ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile menu overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-black bg-opacity-95 z-40 transition-all duration-300 ease ${
          mobileMenuOpen && !menuAnimating 
            ? 'navbar-visible' 
            : menuAnimating 
              ? 'opacity-0 navbar-visible mobile-menu-fade-out' 
              : 'navbar-hidden'
        }`}
      >
        <nav className="h-full flex items-center justify-center">
          <ul className="flex flex-col items-center space-y-8 py-8">
            <li>
              <Link 
                href="#intro" 
                className={`text-2xl hover:text-white transition-colors duration-300 ${activeSection === 'intro' ? 'text-white active' : 'text-gray-500'}`}
                onClick={(e) => handleLinkClick('intro', e)}
                aria-current={activeSection === 'intro' ? 'page' : undefined}
              >
                intro
              </Link>
            </li>
            <li>
              <Link 
                href="#work" 
                className={`text-2xl hover:text-white transition-colors duration-300 ${activeSection === 'work' ? 'text-white active' : 'text-gray-500'}`}
                onClick={(e) => handleLinkClick('work', e)}
                aria-current={activeSection === 'work' ? 'page' : undefined}
              >
                work
              </Link>
            </li>
            <li>
              <Link 
                href="#values" 
                className={`text-2xl hover:text-white transition-colors duration-300 ${activeSection === 'values' ? 'text-white active' : 'text-gray-500'}`}
                onClick={(e) => handleLinkClick('values', e)}
                aria-current={activeSection === 'values' ? 'page' : undefined}
              >
                values
              </Link>
            </li>
            <li>
              <Link 
                href="#about" 
                className={`text-2xl hover:text-white transition-colors duration-300 ${activeSection === 'about' ? 'text-white active' : 'text-gray-500'}`}
                onClick={(e) => handleLinkClick('about', e)}
                aria-current={activeSection === 'about' ? 'page' : undefined}
              >
                about
              </Link>
            </li>
            <li>
              <Link 
                href="#contact" 
                className={`text-2xl hover:text-white transition-colors duration-300 ${activeSection === 'contact' ? 'text-white active' : 'text-gray-500'}`}
                onClick={(e) => handleLinkClick('contact', e)}
                aria-current={activeSection === 'contact' ? 'page' : undefined}
              >
                contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 