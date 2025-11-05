import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const skills = [
    { name: 'Backend', tech: ['Java', 'Python', 'Laravel', 'PHP'] },
    { name: 'Frontend', tech: ['React', 'TypeScript', 'JavaScript', 'HTML', 'Vite'] },
    { name: 'Base de Datos', tech: ['PostgreSQL', 'MySQL', 'SQL'] },
    { name: 'Idiomas', tech: ['Inglés Avanzado (C2)', 'Español Nativo'] }
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
                Soy un desarrollador Full Stack en formación, estudiante de la Tecnicatura Universitaria 
                en Programación en la Universidad Nacional de Salta. Mi pasión por la informática y la 
                resolución de problemas me ha llevado a especializarme en tecnologías modernas de 
                desarrollo web.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                He completado diversos cursos especializados incluyendo Argentina Programa, 
                1000 Programadores Python, y certificaciones en FreeCodeCamp. Mi stack tecnológico 
                incluye Java, Python, Laravel, React, PHP y TypeScript, junto con bases de datos 
                PostgreSQL y MySQL.
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Mi enfoque está en el desarrollo de aplicaciones web modernas, utilizando frameworks 
                como React para el frontend y Laravel para el backend. Mi nivel de inglés es avanzado (C2) 
                lo que me permite mantenerme actualizado con las últimas tendencias tecnológicas.
              </p>
            </div>

            {/* Education */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('about.education')}
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-portfolio-1 pl-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {edu.title}
                    </h4>
                    <p className="text-portfolio-1 font-medium">{edu.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{edu.period}</p>
                    <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('about.courses')}
              </h3>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                      {course.title}
                    </h4>
                    <p className="text-portfolio-1 text-sm">{course.institution} - {course.year}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{course.description}</p>
                  </div>
                ))}
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

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-portfolio-1">5+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{t('about.coursesStats')}</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-portfolio-1">4+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{t('about.yearsStudying')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;