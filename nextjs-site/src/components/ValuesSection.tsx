'use client';

import { useEffect, useRef, useState } from 'react';

const ValuesSection = () => {
  const valuesRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (valuesRef.current) {
      observer.observe(valuesRef.current);
    }
    
    return () => {
      if (valuesRef.current) {
        observer.unobserve(valuesRef.current);
      }
    };
  }, []);
  
  return (
    <section id="values" className="section">
      <div className="container">
        <div 
          ref={valuesRef}
          className="flex flex-row justify-between items-start w-full gap-24 max-w-[870px] mx-auto lg:flex-col lg:gap-8"
        >
          <div className="flex-none">
            <h2 
              className={`text-5xl lg:text-4xl sm:text-[2.5rem] font-medium mb-4 leading-tight text-left opacity-0 transform translate-y-5 ${isVisible ? 'animate-fadeIn1' : ''}`}
            >
              curious
            </h2>
            <h2 
              className={`text-5xl lg:text-4xl sm:text-[2.5rem] font-medium mb-4 leading-tight text-left opacity-0 transform translate-y-5 ${isVisible ? 'animate-fadeIn2' : ''}`}
            >
              creative
            </h2>
            <h2 
              className={`text-5xl lg:text-4xl sm:text-[2.5rem] font-medium mb-4 leading-tight text-left opacity-0 transform translate-y-5 ${isVisible ? 'animate-fadeIn3' : ''}`}
            >
              collaborative
            </h2>
          </div>
          
          <div className="flex-1 max-w-[600px]">
            <p className="mb-8 text-lg font-light leading-relaxed text-left">
              these are the core values i strive to bring to my everyday work. i believe what separates a good QA engineer from a great one is their ability to remain curious and creative, and it&apos;s the fact that those aspects are so naturally rewarded in this line of work that has kept me in quality engineering all these years. i love figuring out new ways to break things but I also love bringing that foundation to other teams or those that are newer to the field
            </p>
            
            <p className="mb-8 text-lg font-light leading-relaxed text-left">
              i believe QA is about more than just finding bugs. i believe that quality plays an essential role in every aspect of the life cycle, engineering or otherwise. i view QA as not just a last line of defense but often times a first line, as well as a valuable resource for other teams to turn to in regards to product knowledge and usage
            </p>
            
            <p className="mb-0 text-lg font-light leading-relaxed text-left">
              above all, i want my work to be meaningful. whether it&apos;s improving a product by making sure every edge case is explored or refactoring a process to cut out bottlenecks, the most fulfilling aspect of any work I do is when I&apos;m able to have a direct impact on the overall quality of something and making sure it&apos;s the best it can be
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection; 