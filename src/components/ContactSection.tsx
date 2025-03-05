'use client';

const ContactSection = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center h-[70vh]">
          <p className="text-[2rem] font-medium text-[#666564]">
            <a 
              href="mailto:hasanrimon@outlook.com" 
              className="text-[#666564] hover:text-white transition-colors duration-300"
            >
              hasanrimon@outlook.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 