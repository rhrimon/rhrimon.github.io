'use client';

import { useEffect, useRef, useState } from 'react';

const ValuesSection = () => {
  const valuesRef = useRef<HTMLDivElement>(null);
  const [animationHasPlayed, setAnimationHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const checkValuesVisibility = () => {
      if (!valuesRef.current) return;
      
      const rect = valuesRef.current.getBoundingClientRect();
      const isCurrentlyVisible = (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0);
      
      if (isCurrentlyVisible && !animationHasPlayed) {
        // Set visible to trigger animations
        setIsVisible(true);
        setAnimationHasPlayed(true);
      } else if (!isCurrentlyVisible) {
        // Reset animation state when section is no longer visible
        setIsVisible(false);
        setAnimationHasPlayed(false);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', checkValuesVisibility);
    
    // Initial check
    checkValuesVisibility();
    
    return () => {
      window.removeEventListener('scroll', checkValuesVisibility);
    };
  }, [animationHasPlayed]);
  
  return (
    <section id="values" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0' }}>
      <div className="container mx-auto px-4">
        <div 
          ref={valuesRef}
          className="flex flex-row lg:flex-col justify-between items-start w-full gap-24 lg:gap-8"
          style={{ 
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <div style={{ flex: '0 0 auto' }}>
            <h2 
              className="values-item"
              style={{ 
                animation: isVisible ? 'fadeInUp 0.8s ease forwards 0.3s' : 'none',
              }}
            >
              curious
            </h2>
            <h2 
              className="values-item"
              style={{ 
                animation: isVisible ? 'fadeInUp 0.8s ease forwards 0.9s' : 'none',
              }}
            >
              creative
            </h2>
            <h2 
              className="values-item"
              style={{ 
                animation: isVisible ? 'fadeInUp 0.8s ease forwards 1.5s' : 'none',
              }}
            >
              collaborative
            </h2>
          </div>
          
          <div style={{maxWidth: '600px', marginLeft: 'auto'}} className="lg:ml-0 lg:max-w-full values-right-text">
            <p className="mb-8 text-lg font-light leading-relaxed">
              these are the core values i strive to bring to my everyday work. i believe what separates a good QA engineer from a great one is their ability to remain curious and creative, and it&apos;s the fact that those aspects are so naturally rewarded in this line of work that has kept me in quality engineering all these years. i love figuring out new ways to break things but I also love bringing that foundation to other teams or those that are newer to the field
            </p>
            
            <p className="mb-8 text-lg font-light leading-relaxed">
              i believe QA is about more than just finding bugs. i believe that quality plays an essential role in every aspect of the life cycle, engineering or otherwise. i view QA as not just a last line of defense but often times a first line, as well as a valuable resource for other teams to turn to in regards to product knowledge and usage
            </p>
            
            <p className="mb-0 text-lg font-light leading-relaxed">
              above all, i want my work to be meaningful. whether it&apos;s improving a product by making sure every edge case is explored or refactoring a process to cut out bottlenecks, the most fulfilling aspect of any work I do is when I&apos;m able to have a direct impact on the overall quality of something and making sure it&apos;s the best it can be
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection; 