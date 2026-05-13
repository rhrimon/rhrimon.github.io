'use client';

import { useEffect, useRef, useState } from 'react';

const VALUES = ['Curious', 'Creative', 'Collaborative'];

const BODY = [
  "These are the core values I strive to bring to my everyday work. What separates a good QA engineer from a great one is their ability to remain curious and creative, and it's the fact that those aspects are so naturally rewarded in this line of work that has kept me in quality engineering all these years. I love figuring out new ways to break things, but I also love bringing that foundation to other teams or those who are newer to the field",
  "I believe QA is about more than just finding bugs. Quality plays an essential role in every aspect of the life cycle, engineering or otherwise. I view QA as not just a last line of defense but often a first line, and as a valuable resource for other teams to turn to in regards to product knowledge and usage",
  "Above all, I want my work to be meaningful. Whether it's improving a product by making sure every edge case is explored, or refactoring a process to cut out bottlenecks, the most fulfilling aspect of any work I do is when I'm able to have a direct impact on the overall quality of something and making sure it's the best it can be",
];

const ValuesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const visibleNow = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
      if (visibleNow && !hasPlayed) {
        setIsVisible(true);
        setHasPlayed(true);
      } else if (!visibleNow) {
        setIsVisible(false);
        setHasPlayed(false);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [hasPlayed]);

  return (
    <section id="values" className="values-section">
      <div className="page-container">
        <div ref={ref} className="values-row">
          <div className="values-labels">
            {VALUES.map((label, i) => (
              <h3
                key={label}
                className="values-item"
                style={{
                  animation: isVisible
                    ? `fadeInUp 0.8s ease forwards ${0.3 + i * 0.6}s`
                    : 'none',
                }}
              >
                {label}
              </h3>
            ))}
          </div>

          <div className="values-body">
            {BODY.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
