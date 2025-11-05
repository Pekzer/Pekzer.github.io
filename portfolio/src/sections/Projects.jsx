import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: 'E-Commerce con Laravel',
      description: 'Plataforma de comercio electrónico completa desarrollada con Laravel, MySQL y frontend con HTML/CSS/JavaScript.',
      image: '/api/placeholder/400/250',
      tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'HTML'],
      github: 'https://github.com/Pekzer/ecommerce-laravel',
      demo: 'https://github.com/Pekzer/ecommerce-laravel',
      featured: true
    },
    {
      title: 'Dashboard React con TypeScript',
      description: 'Panel de administración moderno desarrollado con React, TypeScript, Vite y PostgreSQL como base de datos.',
      image: '/api/placeholder/400/250',
      tech: ['React', 'TypeScript', 'Vite', 'PostgreSQL'],
      github: 'https://github.com/Pekzer/dashboard-react',
      demo: 'https://github.com/Pekzer/dashboard-react',
      featured: true
    },
    {
      title: 'API REST con Java',
      description: 'API RESTful desarrollada en Java con Spring Boot, conectada a base de datos MySQL para gestión de usuarios.',
      image: '/api/placeholder/400/250',
      tech: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
      github: 'https://github.com/Pekzer/api-java-spring',
      demo: 'https://github.com/Pekzer/api-java-spring',
      featured: false
    },
    {
      title: 'Sistema de Inventario PHP',
      description: 'Sistema de gestión de inventario desarrollado en PHP puro con MySQL y interfaz responsive.',
      image: '/api/placeholder/400/250',
      tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Pekzer/inventario-php',
      demo: 'https://github.com/Pekzer/inventario-php',
      featured: false
    },
    {
      title: 'Aplicación React Native',
      description: 'App móvil desarrollada con React Native y TypeScript, conectada a backend Laravel con PostgreSQL.',
      image: '/api/placeholder/400/250',
      tech: ['React Native', 'TypeScript', 'Laravel', 'PostgreSQL'],
      github: 'https://github.com/Pekzer/app-react-native',
      demo: 'https://github.com/Pekzer/app-react-native',
      featured: false
    },
    {
      title: 'Portfolio Web Moderno',
      description: 'Sitio web personal desarrollado con React, TypeScript, Vite y Tailwind CSS con modo oscuro.',
      image: '/api/placeholder/400/250',
      tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
      github: 'https://github.com/Pekzer/portfolio-react',
      demo: 'https://pekzer.github.io/portfolio-react',
      featured: false
    }
  ];

  const ProjectCard = ({ project }) => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-portfolio-1 to-portfolio-2 flex items-center justify-center">
        <div className="text-white text-6xl opacity-20">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-16 h-16">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white rounded-md hover:from-portfolio-2 hover:to-portfolio-3 transition-colors duration-300 text-sm font-medium"
          >
            {t('projects.viewProject')}
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-2 border border-portfolio-1 text-portfolio-1 dark:text-white dark:border-white rounded-md hover:bg-portfolio-1 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors duration-300 text-sm font-medium"
          >
            {t('projects.viewCode')}
          </a>
        </div>
      </div>
    </div>
  );

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t('projects.featuredProjects')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t('projects.otherProjects')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('projects.moreWork')}
          </p>
          <a
            href="https://github.com/Pekzer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-portfolio-1 text-portfolio-1 dark:text-white dark:border-white rounded-lg hover:bg-portfolio-1 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors duration-300 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            {t('projects.viewGithub')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;