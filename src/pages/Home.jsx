import React, { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { SoundProvider } from '@/context/SoundContext';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import Education from '@/sections/Education';
import Footer from '@/components/Footer';

export default function Home() {
  const [isGamesModalOpen, setIsGamesModalOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openGamesModal = () => setIsGamesModalOpen(true);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar onNavigate={scrollToSection} onOpenGames={openGamesModal} />
          <main>
            <Hero onNavigate={scrollToSection} />
            <About />
            <Projects />
            <Contact />
            <Education
              gamesModalOpen={isGamesModalOpen}
              setGamesModalOpen={setIsGamesModalOpen}
            />
          </main>
          <Footer />
        </div>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
