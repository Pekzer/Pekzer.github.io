import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Education = () => {
  const { t } = useLanguage();

  const education = [
    {
      title: 'Tecnicatura Universitaria en Programación',
      company: 'Universidad Nacional de Salta',
      period: '2021 - Actualidad',
      description: 'Estudiando programación, estructuras de datos, algoritmos y arquitectura de computadora.'
    },
    {
      title: 'Bachiller con orientación en Informática',
      company: 'Colegio de la Divina Misericordia',
      period: '2015 - 2019',
      description: 'Educación secundaria con especialización en informática y tecnología.'
    }
  ];

  const courses = [
    {
      title: 'Argentina Programa',
      institution: 'Ministerio de Desarrollo Productivo Argentina',
      year: '2021',
      description: 'Programa nacional de formación en programación'
    },
    {
      title: '1000 Programadores Python',
      institution: 'Universidad Nacional de Salta',
      year: '2021',
      description: 'Curso intensivo de programación en Python'
    },
    {
      title: 'JavaScript Algorithms and Data Structure',
      institution: 'FreeCodeCamp',
      year: '2022',
      description: 'Algoritmos y estructuras de datos en JavaScript'
    },
    {
      title: 'Desarrollo Web',
      institution: 'Universidad Nacional de Salta',
      year: '2023',
      description: 'Fundamentos del desarrollo web moderno'
    },
    {
      title: 'Scientific Computing with Python',
      institution: 'FreeCodeCamp',
      year: '2025',
      description: 'Computación científica con Python'
    }
  ];

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-l-4 border-portfolio-1">
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
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
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
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-portfolio-1 to-portfolio-2 rounded-lg text-white">
            <div className="text-3xl font-bold mb-2">5+</div>
            <div className="text-sm opacity-90">{t('about.coursesStats')}</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-portfolio-2 to-portfolio-3 rounded-lg text-white">
            <div className="text-3xl font-bold mb-2">4+</div>
            <div className="text-sm opacity-90">{t('about.yearsStudying')}</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-portfolio-3 to-portfolio-4 rounded-lg text-white">
            <div className="text-3xl font-bold mb-2">2</div>
            <div className="text-sm opacity-90">Títulos</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-portfolio-4 to-portfolio-5 rounded-lg text-white">
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-sm opacity-90">Dedicación</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;