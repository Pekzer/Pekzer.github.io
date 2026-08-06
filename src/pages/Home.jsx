import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import Education from '@/sections/Education';
import Footer from '@/components/Footer';

export default function Home() {
  const scrollToSection = (sectionId) => {
    document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar onNavigate={scrollToSection} />
          <main>
            <Hero onNavigate={scrollToSection} />
            <About />
            <Projects />
            <Contact />
            <Education />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
