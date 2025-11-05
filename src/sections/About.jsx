import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const skills = [
    { name: t('about.skillsCategories.backend'), tech: ['Java', 'Python', 'Laravel', 'PHP', 'PostgreSQL', 'MySQL'] },
    { name: t('about.skillsCategories.frontend'), tech: ['React', 'TypeScript', 'JavaScript', 'HTML', 'Vite'] },
    { name: t('about.skillsCategories.tools'), tech: ['Git', 'Docker', 'AWS'] }
  ];

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
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Text */}
          <div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {t('about.paragraph1')}
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {t('about.paragraph2')}
              </p>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {t('about.paragraph3')}
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.paragraph4')}
              </p>
            </div>

            {/* Languages Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('about.skillsCategories.languages')}
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white text-sm rounded-full font-medium">
                  {t('about.languagesList.english')}
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-portfolio-2 to-portfolio-3 text-white text-sm rounded-full font-medium">
                  {t('about.languagesList.spanish')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.skills')}
            </h3>
            
            <div className="space-y-6">
              {skills.map((skillGroup, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {skillGroup.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white text-sm rounded-full font-medium"
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

      </div>
    </section>
  );
};

export default About;