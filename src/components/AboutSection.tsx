'use client';

const AboutSection = () => {
  return (
    <section id="about" className="section flex items-center justify-center py-16 md:py-20">
      <div className="container px-4 sm:px-6">
        <div className="text-left flex flex-col items-start justify-start max-w-[870px] w-full ml-0 md:ml-[10%] lg:ml-[15%]">
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-medium mb-4 md:mb-8 leading-tight text-left">
            QA engineer<br /> 
            based in queens nyc
          </h1>
          
          <p className="mb-6 md:mb-8 text-base sm:text-lg font-light leading-relaxed text-left">
            when i&apos;m not breaking things<br />
            i&apos;m usually out shooting street photography<br />
            or messing with ableton
          </p>
          
          <p className="mb-0 text-base sm:text-lg font-light leading-relaxed text-left">
            currently watching: snowfall<br />
            currently playing: arc raiders
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 