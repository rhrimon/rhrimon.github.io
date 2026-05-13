'use client';

const ContactSection = () => {
  return (
    <section id="contact" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '4rem 0' }}>
      <div className="page-container">
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <p className="eyebrow" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
            WE NEED TO TALK
          </p>
          <a
            href="mailto:hasanrimon@outlook.com"
            className="display"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
              letterSpacing: '-0.02em',
              borderBottom: '1px solid rgba(245, 233, 227, 0.3)',
              paddingBottom: '0.25rem',
            }}
          >
            hasanrimon@outlook.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
