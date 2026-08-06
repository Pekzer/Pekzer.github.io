import React, { Suspense, useState, useCallback } from 'react';
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

const SectionFallback = () => <div className="h-96 bg-white dark:bg-gray-900" />;

export default function Home() {
  // Track which sections have been force-requested via navbar navigation
  const [forcedSections, setForcedSections] = useState(new Set());

  const navigateToSection = useCallback((sectionId) => {
    // Force the lazy section to render
    setForcedSections((prev) => {
      const next = new Set(prev);
      next.add(sectionId);
      return next;
    });

    // Poll for the section element to appear in the DOM, then wait for its
    // height to stabilize via ResizeObserver so we scroll AFTER the lazy
    // chunk has loaded and the content has fully rendered.
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
          // Two consecutive stable frames + height > 150px means content is ready
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

      // Safety fallback after 5 s
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
        observer.disconnect();
      }, 5000);
    };

    // Small delay to let React process the state update before polling
    setTimeout(pollForElement, 50);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar onNavigate={navigateToSection} />
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
