'use client';

type Role = {
  company: string;
  role: string;
  dates: string;
  location: string;
  blurb: string;
  tags: string[];
};

const ROLES: Role[] = [
  {
    company: 'Bask Health',
    role: 'Senior QA Engineer',
    dates: '2025 — Present',
    location: 'Remote',
    blurb:
      'Building a comprehensive, scalable, modular and self maintaining E2E automation framework using Playwright and TypeScript. Authoring clear, actionable documentation. Establishing QA processes and best practices to streamline testing and development pipelines.',
    tags: ['AI', 'Automation', 'Playwright', 'TypeScript', 'Manual', 'Process', 'Documentation'],
  },
  {
    company: 'Poll Everywhere',
    role: 'Automation Engineer',
    dates: '2021 — 2024',
    location: 'Remote',
    blurb:
      'Led automation testing with Playwright (TypeScript) and RSpec (Ruby), integrated QA processes into the SDLC, and ensured WCAG accessibility compliance. Leveraged tools like Asana, Datadog, and Notion to reduce defects, enhance coverage, and streamline reporting across releases.',
    tags: ['Automation', 'Manual', 'TypeScript', 'RSpec', 'Ruby', 'Accessibility'],
  },
  {
    company: 'Securities and Exchange Commission',
    role: 'Lead QA Engineer',
    dates: '2017 — 2021',
    location: 'Washington, DC',
    blurb:
      'Transformed manual test suites into automated frameworks with UFT and Selenium, cutting execution time by 80% and improving EDGAR system reliability. Oversaw requirement mapping in HP ALM, ensured regulatory compliance with Inline XBRL and XBRL Conformance Suites, and mentored cross-functional teams in advanced QA practices.',
    tags: ['Automation', 'Manual', 'Selenium', 'UFT', 'HP ALM', 'XBRL'],
  },
  {
    company: 'ZoomTech',
    role: 'QA Analyst',
    dates: '2013 — 2016',
    location: 'NYC',
    blurb:
      'Performed functional, integration, and regression testing across Oracle databases, web services, and Python-based frameworks. Streamlined defect tracking with SBM and JIRA, facilitated regular status meetings, and mentored junior testers.',
    tags: ['Manual', 'Java', 'Functional', 'Integration', 'Oracle', 'JIRA'],
  },
];

const WorkSection = () => {
  return (
    <section id="work" style={{ minHeight: '100vh', padding: '8rem 0 6rem' }}>
      <div className="page-container">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {ROLES.map((r, idx) => (
            <div key={r.company}>
              <div>
                <h3
                  className="display"
                  style={{ fontSize: 'clamp(2.08rem, 3.9vw, 3.12rem)', marginBottom: '0.4rem' }}
                >
                  {r.company}
                </h3>
                <p
                  className="eyebrow work-eyebrow"
                  style={{ marginBottom: '1.2rem', color: 'var(--ink-dim)', fontSize: '0.91rem' }}
                >
                  {r.dates} &nbsp;//&nbsp; {r.role} &nbsp;//&nbsp; {r.location}
                </p>
                <p
                  className="work-blurb"
                  style={{
                    fontSize: '1.235rem',
                    lineHeight: 1.7,
                    color: 'rgba(245, 233, 227, 0.85)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {r.blurb}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="pill"
                      style={{ fontSize: '0.845rem', padding: '0.52rem 1.17rem' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {idx < ROLES.length - 1 && (
                <div className="timeline-rail">
                  <div className="line" />
                  <div className="dot" />
                  <div className="line" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
