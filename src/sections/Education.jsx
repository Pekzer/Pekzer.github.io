import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Education = () => {
  const { t } = useLanguage();

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
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-portfolio-1 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pulse-intense"></div>
      <div className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-portfolio-2 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pulse-intense" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] bg-gradient-to-br from-portfolio-3 to-portfolio-1 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pulse-intense" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('nav.education')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('about.educationSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
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
            </div>
          </div>

          {/* Courses */}
          <div>
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
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 relative overflow-hidden rounded-lg">
          <div 
            className="absolute inset-0 animate-gradient-x" 
            style={{
              background: 'linear-gradient(to right, #7c1427 0%, #6a0f1d 10%, #580a14 20%, #45050a 30%, #330000 40%, #45050a 45%, #7c1427 50%, #6a0f1d 60%, #580a14 70%, #45050a 80%, #330000 90%, #45050a 95%, #7c1427 100%)',
              backgroundSize: '200% 100%',
              filter: 'blur(8px)'
            }}
          ></div>
          <div 
            className="absolute inset-0 animate-gradient-x" 
            style={{
              background: 'linear-gradient(to right, #7c1427 0%, #6a0f1d 10%, #580a14 20%, #45050a 30%, #330000 40%, #45050a 45%, #7c1427 50%, #6a0f1d 60%, #580a14 70%, #45050a 80%, #330000 90%, #45050a 95%, #7c1427 100%)',
              backgroundSize: '200% 100%',
              opacity: 0.7
            }}
          ></div>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 text-white bg-transparent">
              <div className="text-3xl font-bold mb-2">5+</div>
              <div className="text-sm opacity-90">{t('about.coursesStats')}</div>
            </div>
            <div className="text-center p-6 text-white bg-transparent">
              <div className="text-3xl font-bold mb-2">5+</div>
              <div className="text-sm opacity-90">{t('about.yearsStudying')}</div>
            </div>
            <div className="text-center p-6 text-white bg-transparent">
              <div className="text-3xl font-bold mb-2">4+</div>
              <div className="text-sm opacity-90">{t('education.titles')}</div>
            </div>
            <div className="text-center p-6 text-white bg-transparent">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">{t('education.dedication')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;