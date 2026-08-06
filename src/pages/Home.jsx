import React, { Suspense } from 'react';
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
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar />
          <main>
            <Hero />
            <LazySection placeholderHeight="400px">
              <Suspense fallback={<SectionFallback />}>
                <About />
              </Suspense>
            </LazySection>
            <LazySection placeholderHeight="400px">
              <Suspense fallback={<SectionFallback />}>
                <Projects />
              </Suspense>
            </LazySection>
            <LazySection placeholderHeight="300px">
              <Suspense fallback={<SectionFallback />}>
                <Contact />
              </Suspense>
            </LazySection>
            <LazySection placeholderHeight="300px">
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
