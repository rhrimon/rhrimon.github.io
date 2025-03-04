'use client';

const AboutSection = () => {
  return (
    <section id="about" className="section flex items-center justify-center">
      <div className="container">
        <div className="text-left flex flex-col items-start justify-start max-w-[870px] w-full mx-auto">
          <h1 className="text-3xl font-medium mb-8 leading-relaxed text-left">
            QA engineer<br /> 
            based in queens nyc
          </h1>
          
          <p className="mb-8 text-lg font-light leading-relaxed text-left">
            when i&apos;m not breaking things<br />
            i&apos;m usually out shooting street photography<br />
            or messing with ableton
          </p>
          
          <p className="mb-0 text-lg font-light leading-relaxed text-left">
            currently watching: severance<br />
            currently playing: kingdom come deliverance II
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 