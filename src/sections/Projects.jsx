import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setSelectedProject(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const projects = [
    {
      title: t('projects.hirpace.title'),
      description: t('projects.hirpace.description'),
      image: '/api/placeholder/400/250',
      tech: ['Laravel', 'PHP', 'PostgreSQL', 'React', 'Tailwind'],
      github: '',
      demo: '',
      featured: true,
      hasModal: true,
      modalContent: {
        description: t('projects.hirpace.modalDescription'),
        features: t('projects.hirpace.features'),
        images: [
          '/api/placeholder/600/400',
          '/api/placeholder/600/400',
          '/api/placeholder/600/400'
        ]
      }
    },
    {
      title: t('projects.dashboardReact.title'),
      description: t('projects.dashboardReact.description'),
      image: '/api/placeholder/400/250',
      tech: ['React', 'TypeScript', 'Vite', 'PostgreSQL'],
      github: 'https://github.com/Pekzer/dashboard-react',
      demo: 'https://github.com/Pekzer/dashboard-react',
      featured: true
    },
    {
      title: t('projects.apiJava.title'),
      description: t('projects.apiJava.description'),
      image: '/api/placeholder/400/250',
      tech: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
      github: 'https://github.com/Pekzer/api-java-spring',
      demo: 'https://github.com/Pekzer/api-java-spring',
      featured: false
    }
  ];

  const ProjectCard = ({ project, isLarge = false }) => (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 ${isLarge ? 'md:flex' : ''}`}>
      {/* Project Image */}
      <div className={`relative ${isLarge ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'} bg-gradient-to-br from-portfolio-1 to-portfolio-2 flex items-center justify-center`}>
        <div className="text-white text-6xl opacity-20">
          <svg fill="currentColor" viewBox="0 0 20 20" className={`${isLarge ? 'w-24 h-24' : 'w-16 h-16'}`}>
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className={`p-6 ${isLarge ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
        {/* Title */}
        <h3 className={`font-bold text-gray-900 dark:text-white mb-2 ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-gray-600 dark:text-gray-400 mb-4 ${isLarge ? 'text-lg' : 'line-clamp-3'}`}>
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
        <div className={`flex space-x-3 ${isLarge ? 'md:justify-start' : ''}`}>
          {project.hasModal ? (
            <button
              onClick={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
              className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white rounded-md hover:from-portfolio-2 hover:to-portfolio-3 transition-colors duration-300 text-sm font-medium"
            >
              {t('projects.viewProject')}
            </button>
          ) : (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white rounded-md hover:from-portfolio-2 hover:to-portfolio-3 transition-colors duration-300 text-sm font-medium"
            >
              {t('projects.viewProject')}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 border border-portfolio-1 text-portfolio-1 dark:text-white dark:border-white rounded-md hover:bg-portfolio-1 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors duration-300 text-sm font-medium"
            >
              {t('projects.viewCode')}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={handleBackdropClick}>
        <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {project.modalContent.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Características Principales
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.modalContent.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Tecnologías Utilizadas
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-portfolio-1 text-white rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Images Gallery */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Capturas de Pantalla
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.modalContent.images.map((image, index) => (
                  <div key={index} className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} - Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

        {/* Projects Grid */}
        <div className="space-y-8">
          {/* First Project - Full Width */}
          {projects.length > 0 && (
            <div className="w-full">
              <ProjectCard key={0} project={projects[0]} isLarge={true} />
            </div>
          )}

          {/* Other Two Projects - 2 Column Grid */}
          {projects.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.slice(1, 3).map((project, index) => (
                <ProjectCard key={index + 1} project={project} isLarge={false} />
              ))}
            </div>
          )}
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProject(null);
          }}
        />
      </div>
    </section>
  );
};

export default Projects;