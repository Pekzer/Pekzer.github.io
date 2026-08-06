import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/context/LanguageContext';
import useMediaQuery from '@/hooks/useMediaQuery';

const About = () => {
  const { t } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isMeowOpen, setIsMeowOpen] = useState(false);

  const handleMeowClick = useCallback(() => {
    setIsMeowOpen(true);
    try {
      new Audio('/Meaw.mp3').play();
    } catch (e) {
      // Audio may be blocked by browser
    }
  }, []);

  const closeMeow = useCallback(() => {
    setIsMeowOpen(false);
  }, []);

  const skills = [
    { name: t('about.skillsCategories.backend'), tech: ['Java', 'Python', 'Laravel', 'PHP', 'PostgreSQL', 'MySQL'] },
    { name: t('about.skillsCategories.frontend'), tech: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'CSS', 'HTML', 'Vite'] },
    { name: t('about.skillsCategories.tools'), tech: ['Git','Expo','Node.js', 'Docker', 'Firebase'] }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-grid opacity-40"></div>
      {/* Círculos decorativos — solo en desktop */}
      {isDesktop && (
        <>
          <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-portfolio-1 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pulse-intense"></div>
          <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-portfolio-2 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pulse-intense" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-portfolio-3 to-portfolio-1 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pulse-intense" style={{ animationDelay: '0.5s' }}></div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-portfolio-1 to-portfolio-2 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-primary">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl p-8 md:p-10 shadow-lg md:shadow-2xl border border-gray-200/70 dark:border-gray-700/70 relative overflow-hidden hover:shadow-xl md:hover:shadow-2xl md:hover:-translate-y-1 hover:border-portfolio-1/50 dark:hover:border-portfolio-1/50 transition-colors duration-200 group">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-portfolio-1 via-portfolio-2 to-portfolio-3 rounded-r-full group-hover:w-2 transition-all duration-300"></div>

            <div className="space-y-5 text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-primary">
              <p className="text-xl font-medium text-gray-800 dark:text-gray-100 group-hover:text-portfolio-1 dark:group-hover:text-portfolio-1 transition-colors duration-200">{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
              <p>{t('about.paragraph3')}</p>
              <p>{t('about.paragraph4')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white/95 dark:bg-gray-900/95 rounded-3xl p-6 shadow-lg md:shadow-2xl border border-gray-200/70 dark:border-gray-700/70 hover:shadow-xl md:hover:shadow-2xl transition-shadow duration-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3 font-primary">
                <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-portfolio-1 to-portfolio-2"></span>
                {t('about.skills')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t('about.knowledgeAreasList').map((area, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-xl bg-gray-50 dark:bg-gray-800 px-3 py-2.5 hover:bg-portfolio-1 dark:hover:bg-portfolio-1 md:hover:shadow-lg md:hover:-translate-y-0.5 transition-colors duration-200 group">
                    <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-portfolio-1 to-portfolio-2 flex-shrink-0 group-hover:from-white group-hover:to-white md:group-hover:scale-125 transition-all duration-200"></span>
                    <span className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-primary group-hover:text-white transition-colors duration-200">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-1 bg-white/95 dark:bg-gray-900/95 rounded-3xl p-6 shadow-lg md:shadow-2xl border border-gray-200/70 dark:border-gray-700/70 hover:shadow-xl md:hover:shadow-2xl transition-shadow duration-200 h-full flex flex-col relative">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3 font-primary">
                <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-portfolio-1 to-portfolio-2"></span>
                {t('about.skillsCategories.languages')}
              </h3>
              <div className="flex-1 flex flex-col space-y-3">
                <div className="flex items-center gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 hover:bg-portfolio-1 dark:hover:bg-portfolio-1 md:hover:shadow-lg md:hover:-translate-y-0.5 transition-colors duration-200 group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-portfolio-1 to-portfolio-2 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover:from-white group-hover:to-white group-hover:text-portfolio-1 transition-all duration-200">EN</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-200">{t('about.languagesList.english')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 transition-colors duration-200">C2 / Avanzado</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 hover:bg-portfolio-1 dark:hover:bg-portfolio-1 md:hover:shadow-lg md:hover:-translate-y-0.5 transition-colors duration-200 group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-portfolio-2 to-portfolio-3 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover:from-white group-hover:to-white group-hover:text-portfolio-1 transition-all duration-200">ES</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-200">{t('about.languagesList.spanish')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 transition-colors duration-200">Nativo</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 hover:bg-portfolio-1 dark:hover:bg-portfolio-1 md:hover:shadow-lg md:hover:-translate-y-0.5 transition-colors duration-200 group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-portfolio-3 to-portfolio-4 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover:from-white group-hover:to-white group-hover:text-portfolio-1 transition-all duration-200">BR</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-200">{t('about.languagesList.portuguese')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 transition-colors duration-200">{t('about.languagesList.portugueseStatus')}</p>
                  </div>
                </div>
                <button
                  onClick={handleMeowClick}
                  className="hidden lg:block absolute bottom-3 right-3 text-left cursor-pointer hover:scale-110 transition-transform duration-300"
                  title="Meow!"
                >
                  <pre className="text-[10px] leading-tight text-gray-900 dark:text-gray-100 font-mono select-none">
{`   |\\__/,|   (\`\\
  _.|o o  |_   ) )
-(((---(((--------`}</pre>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center gap-3 font-primary">
            <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-portfolio-1 to-portfolio-2"></span>
            {t('about.techStack')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white/95 dark:bg-gray-900/95 rounded-2xl p-6 shadow-md md:shadow-xl border border-gray-200/70 dark:border-gray-700/70 md:hover:-translate-y-1.5 md:hover:shadow-2xl transition-colors duration-200 group">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center font-primary">
                  {skillGroup.name}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {skillGroup.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1.5 rounded-full bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white text-sm font-medium shadow-sm group-hover:shadow-md transition-all duration-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isMeowOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeMeow}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeMeow}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-lg transition-colors z-10 text-xl font-bold"
            >
              ✕
            </button>
            <img
              src="/Meaw.jpeg"
              alt="Meow"
              className="rounded-2xl shadow-2xl max-h-[85vh] object-contain"
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default About;