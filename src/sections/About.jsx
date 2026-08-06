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
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-pattern-grid opacity-50"></div>
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-portfolio-1 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pulse-intense"></div>
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-portfolio-2 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pulse-intense" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-portfolio-3 to-portfolio-1 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pulse-intense" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-portfolio-1 to-portfolio-2 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('about.subtitle')}
          </p>
        </div>

        {/* About Text - Full Width */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            {/* Accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-portfolio-1 via-portfolio-2 to-portfolio-3 rounded-l-2xl"></div>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-5">
              {t('about.paragraph1')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-5">
              {t('about.paragraph2')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-5">
              {t('about.paragraph3')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {t('about.paragraph4')}
            </p>
          </div>
        </div>

        {/* Knowledge Areas + Languages - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Knowledge Areas - 3/5 width */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="h-8 w-1.5 bg-gradient-to-b from-portfolio-1 to-portfolio-2 rounded-full inline-block"></span>
              {t('about.skills')}
            </h3>
            
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {t('about.knowledgeAreasList').map((area, index) => (
                  <div key={index} className="flex items-center gap-3 py-1.5">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-portfolio-1 to-portfolio-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Languages - 2/5 width */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="h-8 w-1.5 bg-gradient-to-b from-portfolio-1 to-portfolio-2 rounded-full inline-block"></span>
              {t('about.skillsCategories.languages')}
            </h3>
            
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700 h-full">
              <div className="flex flex-col gap-4 h-full justify-center">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover-lift transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-portfolio-1 to-portfolio-2 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    EN
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{t('about.languagesList.english')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">C2 Proficient</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover-lift transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-portfolio-2 to-portfolio-3 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    ES
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{t('about.languagesList.spanish')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nativo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
            <span className="h-8 w-1.5 bg-gradient-to-b from-portfolio-1 to-portfolio-2 rounded-full inline-block"></span>
            {t('about.techStack')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover-lift transition-all duration-300 group">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-5 text-center group-hover:text-portfolio-1 dark:group-hover:text-portfolio-2 transition-colors duration-300">
                  {skillGroup.name}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {skillGroup.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white text-sm rounded-full font-medium hover:scale-105 cursor-default transition-transform duration-300 hover:shadow-md"
                    >
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