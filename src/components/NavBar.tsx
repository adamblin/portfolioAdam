import './NavBar.css';
import type { MouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

type Item = { id: string; label: string };

export default function NavBar() {
  const items: Item[] = useMemo(() => ([
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'stack', label: 'Stack' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]), []);

  const [active, setActive] = useState<string>('projects');
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const visibilityRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const setActiveFromHash = () => {
      const id = window.location.hash.replace('#', '');
      if (items.some((item) => item.id === id)) {
        setActive(id);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityRef.current[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        const atPageEnd =
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

        if (atPageEnd) {
          setActive(items[items.length - 1]?.id ?? 'projects');
          return;
        }

        const mostVisible = sections.reduce((best, section) => {
          const ratio = visibilityRef.current[section.id] ?? 0;
          const bestRatio = best ? visibilityRef.current[best.id] ?? 0 : -1;
          return ratio > bestRatio ? section : best;
        }, sections[0]);

        if (mostVisible?.id) {
          setActive(mostVisible.id);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.01, 0.2, 0.45, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));
    setActiveFromHash();

    window.addEventListener('hashchange', setActiveFromHash);

    return () => {
      window.removeEventListener('hashchange', setActiveFromHash);
      observer.disconnect();
    };
  }, [items]);

  useEffect(() => {
    const activeLink = linkRefs.current[active];
    const nav = navRef.current;

    if (!activeLink || !nav) return;

    activeLink.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
    });
  }, [active]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const navbarHeight = navRef.current?.closest('.navbar')?.getBoundingClientRect().height ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    setActive(id);
    window.history.pushState(null, '', `#${id}`);
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  };

  return (
    <header className="navbar">
      <a href="#hero" className="navbar-brand" aria-label="Go to top">
        AB
      </a>
      <nav ref={navRef} className="nav" aria-label="Primary navigation">
        {items.map((item) => (
          <a
            key={item.id}
            ref={(node) => {
              linkRefs.current[item.id] = node;
            }}
            href={`#${item.id}`}
            className={`nav-link${active === item.id ? ' active' : ''}`}
            aria-current={active === item.id ? 'page' : undefined}
            onClick={(event) => handleNavClick(event, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
