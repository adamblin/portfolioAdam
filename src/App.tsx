import { lazy, Suspense, useMemo } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Section from './components/Section';
import SectionTitle from './components/SectionTitle';
import { useReveal } from './hooks/useReveal';

const ProjectGrid = lazy(() => import('./components/ProjectGrid'));
const Timeline = lazy(() => import('./components/Timeline'));
const Stack = lazy(() => import('./components/Stack'));
const AboutMe = lazy(() => import('./components/AboutMe'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function SectionLoader() {
  return (
    <div className="section-loader" role="status" aria-live="polite" aria-label="Loading section">
      <span className="section-loader__dot" />
      <span className="section-loader__dot" />
      <span className="section-loader__dot" />
    </div>
  );
}

function App() {
  useReveal();
  const loader = useMemo(() => <SectionLoader />, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <NavBar />
      <Hero />
      <main id="main-content">
        <Section id="projects">
          <SectionTitle>Projects</SectionTitle>
          <Suspense fallback={loader}>
            <ProjectGrid />
          </Suspense>
        </Section>

        <Section id="experience" variant="open">
          <SectionTitle>Experience</SectionTitle>
          <Suspense fallback={loader}>
            <Timeline />
          </Suspense>
        </Section>

        <Section id="stack" fullWidth>
          <SectionTitle>Stack</SectionTitle>
          <Suspense fallback={loader}>
            <Stack />
          </Suspense>
        </Section>

        <Section id="about" variant="open">
          <SectionTitle>About</SectionTitle>
          <Suspense fallback={loader}>
            <AboutMe />
          </Suspense>
        </Section>

        <Section id="contact">
          <SectionTitle>Contact</SectionTitle>
          <Suspense fallback={loader}>
            <Contact />
          </Suspense>
        </Section>
      </main>

      <Suspense fallback={loader}>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
