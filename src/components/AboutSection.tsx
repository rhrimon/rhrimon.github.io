'use client';

const AboutSection = () => {
  return (
    <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '4rem 0' }}>
      <div className="page-container" style={{ width: '100%' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h3
            className="display"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.4rem' }}
          >
            QA engineer
            <br />
            raised in Queens, NYC
          </h3>
          <p className="eyebrow" style={{ fontSize: '0.9rem', marginBottom: '2.5rem' }}>
            Currently in Austin TX for the year
          </p>

          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: 1.7,
              color: 'rgba(245, 233, 227, 0.85)',
              marginBottom: '1.5rem',
            }}
          >
            When I&apos;m not breaking things, I&apos;m usually out shooting street photography or
            messing with Ableton
          </p>
          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: 1.7,
              color: 'rgba(245, 233, 227, 0.85)',
            }}
          >
            Currently watching: <em>Snowfall</em>
            <br />
            Currently playing: <em>Crimson Desert</em>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
