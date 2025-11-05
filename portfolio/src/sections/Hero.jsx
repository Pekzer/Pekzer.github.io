import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-52 h-52 mx-auto rounded-full bg-gradient-to-br from-portfolio-1 to-portfolio-2 p-1">
              <img
                src="/yo fondo negro.png"
                alt="Gonzalo Herrera"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">{t('home.title')}</span>
            <br />
            <span className="bg-gradient-to-r from-portfolio-1 to-portfolio-2 bg-clip-text text-transparent">
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
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white font-medium rounded-lg hover:from-portfolio-2 hover:to-portfolio-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t('home.cta')}
            </button>
            <a
              href="/Herrera Gonzalo CV.pdf"
              download="Herrera_Gonzalo_CV.pdf"
              className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              📄 Descargar CV
            </a>
            <button
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-portfolio-1 text-portfolio-1 dark:text-white dark:border-white font-medium rounded-lg hover:bg-portfolio-1 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
            >
              {t('home.contact')}
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;