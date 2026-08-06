import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import Footer from '@/components/Footer';
import LazySection from '@/components/LazySection';

// Lazy-load below-the-fold sections for code splitting + deferred rendering
const About = React.lazy(() => import('@/sections/About'));
const Projects = React.lazy(() => import('@/sections/Projects'));
const Contact = React.lazy(() => import('@/sections/Contact'));
const Education = React.lazy(() => import('@/sections/Education'));

// Map of dynamic import triggers – called to preload chunks without rendering
const sectionPreloaders = {
  about: () => import('@/sections/About'),
  projects: () => import('@/sections/Projects'),
  contact: () => import('@/sections/Contact'),
  education: () => import('@/sections/Education'),
};

const SectionFallback = () => <div className="h-96 bg-white dark:bg-gray-900" />;

export default function Home() {
  // Track which sections have been force-requested via navbar navigation
  const [forcedSections, setForcedSections] = useState(new Set());

  // Preload all lazy section chunks in the background after the initial
  // render so that by the time the user clicks a nav link the chunk is
  // already cached and renders instantly.
  useEffect(() => {
    const timer = setTimeout(() => {
      Object.values(sectionPreloaders).forEach((load) => load());
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Preload a specific section on hover (called from Navbar)
  const preloadSection = useCallback((sectionId) => {
    sectionPreloaders[sectionId]?.();
  }, []);

  const navigateToSection = useCallback((sectionId) => {
    // Force the lazy section to render
    setForcedSections((prev) => {
      const next = new Set(prev);
      next.add(sectionId);
      return next;
    });

    // If the section is already in the DOM with full content, scroll immediately
    const existing = document.querySelector(`#${sectionId}`);
    if (existing && existing.offsetHeight > 150) {
      existing.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Otherwise poll for the section element to appear and its height to
    // stabilize (lazy chunk still loading).
    const pollForElement = () => {
      const el = document.querySelector(`#${sectionId}`);
      if (!el) {
        setTimeout(pollForElement, 50);
        return;
      }

      let lastHeight = el.offsetHeight;
      let stableCount = 0;

      const observer = new ResizeObserver(() => {
        const h = el.offsetHeight;
        if (h === lastHeight) {
          stableCount++;
          if (stableCount >= 2 && h > 150) {
            el.scrollIntoView({ behavior: 'smooth' });
            observer.disconnect();
          }
        } else {
          lastHeight = h;
          stableCount = 0;
        }
      });

      observer.observe(el);

      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
        observer.disconnect();
      }, 5000);
    };

    setTimeout(pollForElement, 50);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar onNavigate={navigateToSection} onPreload={preloadSection} />
          <main>
            <Hero onNavigate={navigateToSection} />
            <LazySection placeholderHeight="400px" forceRender={forcedSections.has('about')}>
              <Suspense fallback={<SectionFallback />}>
                <About />
              </Suspense>
            </LazySection>
            <LazySection placeholderHeight="400px" forceRender={forcedSections.has('projects')}>
              <Suspense fallback={<SectionFallback />}>
                <Projects />
              </Suspense>
            </LazySection>
            <LazySection placeholderHeight="300px" forceRender={forcedSections.has('contact')}>
              <Suspense fallback={<SectionFallback />}>
                <Contact />
              </Suspense>
            </LazySection>
            <LazySection placeholderHeight="300px" forceRender={forcedSections.has('education')}>
              <Suspense fallback={<SectionFallback />}>
                <Education />
              </Suspense>
            </LazySection>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
