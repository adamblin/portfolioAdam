import './Hero.css';
import type { MouseEvent } from 'react';

export default function Hero() {
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const navbarHeight = document.querySelector('.navbar')?.getBoundingClientRect().height ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.history.pushState(null, '', `#${id}`);
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  };

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <div className="hero-content">
        <h1 className="hero-name">
          <span className="hero-name-first">Adam</span>
          <span className="hero-name-last">Benitez</span>
        </h1>

        <p className="hero-roles">
          Software Engineer
          <span className="hero-roles-amp" aria-hidden="true"> &amp; </span>
          Game Developer
        </p>

        <p className="hero-tagline">
          I build systems that work and experiences that feel right —
          from cloud infrastructure to interactive games.
        </p>

        <div className="hero-actions">
          <a
            href="#projects"
            className="hero-btn hero-btn--primary"
            onClick={(event) => scrollToSection(event, 'projects')}
          >
            View Projects
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
          <a
            href="#contact"
            className="hero-btn hero-btn--secondary"
            onClick={(event) => scrollToSection(event, 'contact')}
          >
            Get in touch
          </a>
        </div>

        <div className="hero-links" aria-label="Social profiles">
          <a
            className="hero-link"
            href="https://www.linkedin.com/in/adam-benitez"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span className="hero-link-sep" aria-hidden="true">·</span>
          <a
            className="hero-link"
            href="https://github.com/adamblin"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="hero-link-sep" aria-hidden="true">·</span>
          <a
            className="hero-link"
            href="https://adamblin.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            itch.io
          </a>
        </div>
      </div>

      <a
        className="hero-scroll-hint"
        href="#projects"
        aria-label="Scroll to projects"
        onClick={(event) => scrollToSection(event, 'projects')}
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}
