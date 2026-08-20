import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import useMediaQuery from '@/hooks/useMediaQuery';
import Games from '@/components/Games';
import Reveal, { RevealGroup } from '@/components/Reveal';

const Education = ({ gamesModalOpen, setGamesModalOpen }) => {
  const { t } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const education = [
    {
      title: t('education.title1'),
      company: 'Universidad Nacional de Salta',
      period: t('education.period1'),
      description: t('education.description1')
    },
    {
      title: t('education.title2'),
      company: 'Colegio de la Divina Misericordia',
      period: t('education.period2'),
      description: t('education.description2')
    }
  ];

  const courses = [
    {
      title: 'Argentina Programa',
      institution: 'Ministerio de Desarrollo Productivo Argentina',
      year: '2021',
      description: t('education.courseDescription1')
    },
    {
      title: '1000 Programadores Python',
      institution: 'Universidad Nacional de Salta',
      year: '2021',
      description: t('education.courseDescription2')
    },
    {
      title: 'JavaScript Algorithms and Data Structure',
      institution: 'FreeCodeCamp',
      year: '2022',
      description: t('education.courseDescription3')
    },
    {
      title: 'Desarrollo Web',
      institution: 'Universidad Nacional de Salta',
      year: '2023',
      description: t('education.courseDescription4')
    },
    {
      title: 'Scientific Computing with Python',
      institution: 'FreeCodeCamp',
      year: '2025',
      description: t('education.courseDescription5')
    }
  ];

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Fondo con efectos más dramáticos */}
      <div className="absolute inset-0 bg-pattern-dots opacity-60"></div>
      {/* Círculos decorativos — ligeros en móvil, completos en desktop */}
      <div className={`absolute top-10 right-10 rounded-full mix-blend-multiply filter bg-portfolio-1 pointer-events-none ${isDesktop ? 'w-[500px] h-[500px] blur-3xl opacity-30 pulse-intense' : 'w-40 h-40 blur-xl opacity-10'}`}></div>
      <div className={`absolute bottom-20 left-10 rounded-full mix-blend-multiply filter bg-portfolio-2 pointer-events-none ${isDesktop ? 'w-[550px] h-[550px] blur-3xl opacity-25 pulse-intense' : 'w-36 h-36 blur-xl opacity-10'}`} style={isDesktop ? { animationDelay: '1s' } : {}}></div>
      <div className={`absolute rounded-full mix-blend-multiply filter bg-gradient-to-br from-portfolio-3 to-portfolio-1 pointer-events-none ${isDesktop ? 'top-1/3 right-1/4 w-[480px] h-[480px] blur-3xl opacity-15 pulse-intense' : '-bottom-5 -right-5 w-44 h-44 blur-xl opacity-5'}`} style={isDesktop ? { animationDelay: '2s' } : {}}></div>
      
      <RevealGroup className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-16" delay={0}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('nav.education')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('about.educationSubtitle')}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <Reveal delay={100}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t('about.education')}
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-portfolio-1 hover-lift transition-all duration-300 shadow-red-900/50">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {edu.title}
                  </h4>
                  <p className="text-portfolio-1 font-medium mb-1">{edu.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{edu.period}</p>
                  <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                </div>
              ))}
              <div id="games" style={{ scrollMarginTop: '4rem' }}>
                <Games isModalOpen={gamesModalOpen} setIsModalOpen={setGamesModalOpen} />
              </div>
            </div>
          </Reveal>

          {/* Courses */}
          <Reveal delay={200}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t('about.courses')}
            </h3>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-red-900 dark:border-gray-700 hover-lift transition-all duration-300">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h4>
                  <p className="text-portfolio-1 text-sm font-medium mb-1">{course.institution} - {course.year}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{course.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>


      </RevealGroup>
    </section>
  );
};

export default Education;