'use client';

import { useEffect, useRef, useState } from 'react';

type SectionId = 'intro' | 'work' | 'values' | 'about' | 'contact';

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'intro', label: 'Intro' },
  { id: 'work', label: 'Work' },
  { id: 'values', label: 'Values' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const AUDIO_SRC = '/audio/track.mp3';

const ChevronUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const formatTime = (d: Date) =>
  d
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/New_York',
    })
    .replace(/\s/g, '');

const Header = () => {
  const [active, setActive] = useState<SectionId | null>(null);
  const [time, setTime] = useState<string>('');
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setTime(formatTime(new Date()));
    const t = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const detectActive = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      const sections = SECTIONS.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? { id, top: el.offsetTop } : null;
      }).filter((s): s is { id: SectionId; top: number } => s !== null);

      if (sections.length === 0) return;
      if (probe < sections[0].top) {
        setActive(null);
        return;
      }
      let current: SectionId = sections[0].id;
      for (const s of sections) {
        if (probe >= s.top) current = s.id;
        else break;
      }
      setActive(current);
    };

    detectActive();
    window.addEventListener('scroll', detectActive, { passive: true });
    window.addEventListener('resize', detectActive);
    return () => {
      window.removeEventListener('scroll', detectActive);
      window.removeEventListener('resize', detectActive);
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.5;
    a.loop = true;
  }, []);

  const toggleSound = () => {
    const a = audioRef.current;
    setSoundOn((prev) => {
      const next = !prev;
      if (!a) return next;
      if (next) {
        a.muted = false;
        a.play().catch(() => undefined);
      } else {
        a.pause();
      }
      return next;
    });
  };

  const handleClick = (id: SectionId, e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="topbar">
        {active && (
          <span key={active} className="topbar-section">
            {SECTIONS.find((s) => s.id === active)?.label}
          </span>
        )}
        <div className="topbar-left">
          <button
            type="button"
            className={`topbar-logo${active ? ' topbar-logo--hidden' : ''}`}
            onClick={() => {
              setActive(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Back to top"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="logo" />
          </button>
          <div className="topbar-divider" />
          <div className="topbar-time">{time ? `${time} NYC` : ' '}</div>
          <div className="topbar-divider" />
        </div>

        <nav>
          <ul>
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? 'active' : ''}
                  onClick={(e) => handleClick(id, e)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="topbar-right">
          <div className="topbar-divider" />
          <button
            type="button"
            className="topbar-sound"
            onClick={toggleSound}
            aria-pressed={soundOn}
          >
            Sound:&nbsp;
            <span key={soundOn ? 'on' : 'off'} className="topbar-sound-state">
              {soundOn ? 'On' : 'Off'}
            </span>
          </button>
        </div>

        <button
          type="button"
          className={`topbar-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <button
        type="button"
        className={`mobile-back-top${active ? ' mobile-back-top--visible' : ''}`}
        onClick={() => {
          setActive(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        aria-label="Back to top"
      >
        <ChevronUp />
      </button>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <nav>
          <ul>
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? 'active' : ''}
                  onClick={(e) => handleClick(id, e)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="mobile-menu-sound"
          onClick={toggleSound}
          aria-pressed={soundOn}
        >
          Sound:&nbsp;
          <span key={soundOn ? 'on' : 'off'} className="topbar-sound-state">
            {soundOn ? 'On' : 'Off'}
          </span>
        </button>
      </div>

      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />
    </>
  );
};

export default Header;
