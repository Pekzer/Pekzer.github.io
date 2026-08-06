import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const skills = [
    { name: t('about.skillsCategories.backend'), tech: ['Java', 'Python', 'Laravel', 'PHP', 'PostgreSQL', 'MySQL'] },
    { name: t('about.skillsCategories.frontend'), tech: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'CSS', 'HTML', 'Vite'] },
    { name: t('about.skillsCategories.tools'), tech: ['Git','Expo','Node.js', 'Docker', 'Firebase'] }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-grid opacity-40"></div>
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-portfolio-1 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pulse-intense"></div>
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-portfolio-2 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pulse-intense" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-portfolio-3 to-portfolio-1 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pulse-intense" style={{ animationDelay: '0.5s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-portfolio-1 to-portfolio-2 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-200/70 dark:border-gray-700/70 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-portfolio-1 via-portfolio-2 to-portfolio-3"></div>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Full Stack', 'Estudiante', 'Colaboración', 'Soluciones'].map((badge, index) => (
                <span key={index} className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  {badge}
                </span>
              ))}
            </div>

            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
              <p>{t('about.paragraph3')}</p>
              <p>{t('about.paragraph4')}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl p-6 shadow-2xl border border-gray-200/70 dark:border-gray-700/70">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
                <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-portfolio-1 to-portfolio-2"></span>
                {t('about.skills')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t('about.knowledgeAreasList').map((area, index) => (
                  <div key={index} className="flex items-start gap-2 rounded-xl bg-gray-50 dark:bg-gray-800 px-3 py-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-portfolio-1 to-portfolio-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl p-6 shadow-2xl border border-gray-200/70 dark:border-gray-700/70">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
                <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-portfolio-1 to-portfolio-2"></span>
                {t('about.skillsCategories.languages')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 dark:bg-gray-800 p-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-portfolio-1 to-portfolio-2 flex items-center justify-center text-white font-semibold">EN</div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{t('about.languagesList.english')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">C2 / Avanzado</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 dark:bg-gray-800 p-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-portfolio-2 to-portfolio-3 flex items-center justify-center text-white font-semibold">ES</div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{t('about.languagesList.spanish')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nativo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-portfolio-1 to-portfolio-2"></span>
            {t('about.techStack')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white/95 dark:bg-gray-900/95 rounded-2xl p-6 shadow-xl border border-gray-200/70 dark:border-gray-700/70 hover:-translate-y-1 transition-all duration-300">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  {skillGroup.name}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {skillGroup.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1.5 rounded-full bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white text-sm font-medium shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;