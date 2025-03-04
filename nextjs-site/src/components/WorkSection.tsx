'use client';

const WorkSection = () => {
  return (
    <section id="work" className="section">
      <div className="container flex flex-col items-center justify-center">
        <div className="w-full max-w-[870px] mx-auto flex flex-col items-center">
          <div className="w-full mb-8 mt-0 font-light text-lg text-left">
            <h2 className="text-[3.6rem] mb-0 font-semibold">Poll Everywhere</h2>
            <p className="text-base font-medium text-[#666564] mb-4">2021 - Current // Remote</p>
            <p className="max-w-[500px] leading-relaxed text-left">
              Led automation testing with Playwright (TypeScript) and RSpec (Ruby), integrated QA processes into the SDLC, and ensured WCAG accessibility compliance. Leveraged tools like Asana, Datadog, and Notion to reduce defects, enhance coverage, and streamline reporting across releases
            </p>
          </div>
          
          <div className="w-[1px] h-[100px] bg-white my-8"></div>
          
          <div className="w-full mb-8 mt-0 font-light text-lg text-left">
            <h2 className="text-[3.6rem] mb-0 font-semibold">SEC</h2>
            <p className="text-base font-medium text-[#666564] mb-4">2017 - 2021 // Washington DC</p>
            <p className="max-w-[500px] leading-relaxed text-left">
              Transformed manual test suites into automated frameworks with UFT and Selenium, cutting execution time by 80% and improving EDGAR system reliability. Oversaw requirement mapping in HP ALM, ensured regulatory compliance with Inline XBRL and XBRL Conformance Suites, and mentored cross-functional teams in advanced QA practices
            </p>
          </div>
          
          <div className="w-[1px] h-[100px] bg-white my-8"></div>
          
          <div className="w-full mb-8 mt-0 font-light text-lg text-left">
            <h2 className="text-[3.6rem] mb-0 font-semibold">Zoomtech</h2>
            <p className="text-base font-medium text-[#666564] mb-4">2013 - 2016 // NYC</p>
            <p className="max-w-[500px] leading-relaxed text-left">
              Performed functional, integration, and regression testing across Oracle databases, web services, and Python-based frameworks, ensuring smooth project delivery. Streamlined defect tracking with SBM and JIRA, facilitated regular status meetings, and mentored junior testers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection; 