import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const { t, language } = useLanguage();

  const cvFile = language === 'es' ? '/Herrera Gonzalo CV.pdf' : '/Herrera Gonzalo CV (eng).pdf';
  const cvDownloadName = language === 'es' ? 'Herrera_Gonzalo_CV.pdf' : 'Herrera_Gonzalo_CV_English.pdf';

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-animated relative overflow-hidden">
      {/* Patrón de fondo más visible */}
      <div className="absolute inset-0 bg-pattern-dots opacity-70"></div>
      
      {/* Círculos decorativos de fondo más grandes y dramáticos */}
      <div className="absolute top-10 -left-20 w-96 h-96 bg-portfolio-1 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pulse-intense"></div>
      <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-portfolio-2 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pulse-intense" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-portfolio-3 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pulse-intense" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-gradient-to-br from-portfolio-1 to-portfolio-2 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pulse-intense" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-52 h-52 mx-auto rounded-full bg-gradient-to-br from-portfolio-1 to-portfolio-2 p-1 hover-lift hover-glow">
              <img
                src="/yo fondo negro.png"
                alt="Gonzalo Herrera"
                className="w-full h-full rounded-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
            <span className="text-gray-900 dark:text-white">{t('home.title')}</span>
            <br />
            <span className="bg-gradient-to-r from-portfolio-1 to-portfolio-2 bg-clip-text text-transparent hover:from-portfolio-2 hover:to-portfolio-3 transition-all duration-300">
              Gonzalo Herrera
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
            {t('home.subtitle')}
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('home.description')}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Java', 'Python', 'Laravel', 'React', 'PHP', 'TypeScript', 'PostgreSQL', 'MySQL'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 hover-scale hover:bg-white dark:hover:bg-gray-700 hover:border-portfolio-1 dark:hover:border-portfolio-1 cursor-default transition-all duration-300 hover:shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white font-medium rounded-lg hover:from-portfolio-2 hover:to-portfolio-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl shine-effect"
            >
              {t('home.cta')}
            </button>
            <a
              href={cvFile}
              download={cvDownloadName}
              className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-portfolio-1 dark:hover:border-portfolio-1"
            >
              📄 {t('home.cv')}
            </a>
            <button
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-portfolio-1 text-portfolio-1 dark:text-white dark:border-white font-medium rounded-lg hover:bg-portfolio-1 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              {t('home.contact')}
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300" onClick={() => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' })}>
            <svg className="w-6 h-6 mx-auto text-gray-400 hover:text-portfolio-1 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;