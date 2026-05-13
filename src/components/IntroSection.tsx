'use client';

import { useState } from 'react';

type TabId = 'for-anyone' | 'recruiters' | 'qa' | 'engineers' | 'designers' | 'product-managers';

const TABS: { id: TabId; label: string }[] = [
  { id: 'for-anyone', label: 'For Anyone' },
  { id: 'recruiters', label: 'Recruiters' },
  { id: 'qa', label: 'QA' },
  { id: 'engineers', label: 'Engineers' },
  { id: 'designers', label: 'Designers' },
  { id: 'product-managers', label: 'Product Managers' },
];

const TAB_TAIL: Record<TabId, string> = {
  'for-anyone': 'who loves to break things',
  recruiters: 'with over 10 years of experience in both manual and automated software testing',
  qa: 'who thinks the best teams are built on trust and curiosity',
  engineers: 'who believes that tight collaboration with devs is the best way to craft bulletproof code',
  designers: 'who knows thoughtful design deserves a thoughtful execution',
  'product-managers': 'who makes sure the product vision is always backed by quality',
};

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IntroSection = () => {
  const [active, setActive] = useState<TabId>('for-anyone');

  return (
    <>
      {/* Hero — first viewport, not part of "intro" nav target */}
      <section className="hero" aria-label="Rimon Hasan">
        {/* Desktop: single line edge-to-edge */}
        <svg
          className="hero-title hero-title-svg hero-title-desktop"
          viewBox="0 0 1000 132"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Rimon Hasan"
        >
          <text
            x="500"
            y="116"
            textAnchor="middle"
            textLength="996"
            lengthAdjust="spacingAndGlyphs"
            fontSize="140"
            fontWeight="700"
            style={{
              fontFamily: 'var(--font-geist), var(--font-inter), sans-serif',
              letterSpacing: '-0.04em',
            }}
          >
            RIMON HASAN
          </text>
        </svg>

        {/* Mobile: two lines, natural rendering */}
        <div className="hero-title-mobile" aria-hidden="true">
          <div>RIMON</div>
          <div>HASAN</div>
        </div>

        <button
          type="button"
          className="hero-doomscroll eyebrow"
          onClick={() =>
            document
              .getElementById('intro')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          aria-label="Scroll to Intro"
        >
          <ChevronDown />
          <span>Doom Scroll</span>
          <ChevronDown />
        </button>
      </section>

      {/* Intro section — tabs + tagline */}
      <section
        id="intro"
        style={{
          minHeight: '100vh',
          paddingTop: '70px',
          paddingBottom: '4rem',
          scrollMarginTop: '70px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className="page-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div className="intro-tabs scrollbar-hide">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`tab-btn ${active === t.id ? 'active' : ''}`}
                onClick={() => setActive(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', width: '100%', maxWidth: '850px', textAlign: 'left' }}>
            <p
              className="display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                lineHeight: 1.05,
                fontWeight: 900,
              }}
            >
              <span className="tagline-head">I&apos;m a QA engineer</span>
              <br />
              <span key={active} className="tagline-tail">{TAB_TAIL[active]}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntroSection;
