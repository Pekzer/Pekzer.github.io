import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/context/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGalleryOpen) {
        if (e.key === 'Escape') {
          setIsGalleryOpen(false);
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      } else if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setSelectedProject(null);
      }
    };

    // Prevent body scroll when modal or gallery is open
    if (isModalOpen || isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isGalleryOpen]);

  const openGallery = (images, startIndex) => {
    setCurrentImageIndex(startIndex);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedProject.modalContent.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProject.modalContent.images.length - 1 : prev - 1
    );
  };

  const projects = [
    {
      title: t('projects.hirpace.title'),
      description: t('projects.hirpace.description'),
      image: '/HIRPACE1.png',
      tech: ['Laravel', 'PHP', 'PostgreSQL', 'React', 'Tailwind'],
      github: '',
      demo: '',
      featured: true,
      hasModal: true,
      modalContent: {
        description: t('projects.hirpace.modalDescription'),
        features: t('projects.hirpace.features'),
        images: [
          '/HIRPACE1.png',
          '/HIRPACE2.png',
          '/HIRPACE3.png',
          '/HIRPACE4.png',
          '/HIRPACE5.png',
          '/HIRPACE6.png',
          '/HIRPACE7.png',
          '/HIRPACE8.png',
          '/HIRPACE9.png'
        ]
      }
    },
    {
      title: t('projects.stockHome.title'),
      description: t('projects.stockHome.description'),
      image: '/homestock1.jpg',
      tech: ['React Native', 'Expo', 'TypeScript'],
      github: 'https://github.com/Pekzer/HomeStock',
      demo: 'https://pekzer.github.io/HomeStock/',
      featured: false,
      hasModal: true,
      modalContent: {
        description: t('projects.stockHome.modalDescription'),
        features: t('projects.stockHome.features'),
        images: [
          '/homestock1.jpg',
          '/homestock2.jpg',
          '/homestock3.jpg',
          '/homestock5.jpg',
          '/homestock6.jpg',
          '/iniciostock4.jpg'
        ]
      }
    },
    {
      title: t('projects.dentalWeb.title'),
      description: t('projects.dentalWeb.description'),
      image: '/api/placeholder/400/250',
      tech: ['Astro', 'TailwindCSS', 'Markdown/MDX'],
      github: 'https://github.com/Pekzer/dental-web',
      demo: '',
      featured: false
    }
  ];

  const ProjectCard = ({ project }) => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover-lift transition-all duration-300 md:flex md:h-[400px]">
      {/* Project Image */}
      <div 
        className="relative md:w-1/2 h-64 md:h-full bg-gradient-to-br from-portfolio-1 to-portfolio-2 flex items-center justify-center overflow-hidden group cursor-pointer"
        onClick={() => {
          if (project.hasModal && project.modalContent?.images) {
            setSelectedProject(project);
            openGallery(project.modalContent.images, 0);
          }
        }}
      >
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay con icono de galería */}
            {project.hasModal && project.modalContent?.images && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </>
        ) : (
          <div className="text-white text-6xl opacity-20">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-24 h-24">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-6 md:w-1/2 md:flex md:flex-col md:justify-center">
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover-scale transition-transform duration-300 cursor-default hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-3 md:justify-start">
          {project.hasModal ? (
            <button
              onClick={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
              className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white rounded-md hover:from-portfolio-2 hover:to-portfolio-3 transition-all duration-300 text-sm font-medium shine-effect transform hover:scale-105"
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
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-portfolio-1 to-portfolio-2 text-white rounded-md hover:from-portfolio-2 hover:to-portfolio-3 transition-colors duration-300 text-sm font-medium"
            >
              Demo Web
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

    return createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={handleBackdropClick}>
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
                  <div 
                    key={index} 
                    className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer"
                    onClick={() => openGallery(project.modalContent.images, index)}
                  >
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
      </div>,
      document.body
    );
  };

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Fondo con efectos más dramáticos */}
      <div className="absolute inset-0 bg-pattern-grid opacity-50"></div>
      <div className="absolute top-20 left-10 w-[550px] h-[550px] bg-portfolio-1 rounded-full mix-blend-multiply filter blur-3xl opacity-25 pulse-intense"></div>
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-portfolio-2 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pulse-intense" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-portfolio-2 to-portfolio-3 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pulse-intense" style={{ animationDelay: '0.75s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          {/* All Projects - Full Width, One Over Another */}
          {projects.map((project, index) => (
            <div key={index} className="w-full">
              <ProjectCard project={project} />
            </div>
          ))}
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

        {/* Gallery Modal */}
        {isGalleryOpen && selectedProject && createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[10000]" onClick={closeGallery}>
            <div className="relative max-w-7xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={closeGallery}
                className="absolute top-2 right-2 z-[10001] bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Main Image */}
              <div className="relative">
                <img
                  src={selectedProject.modalContent.images[currentImageIndex]}
                  alt={`${selectedProject.title} - Imagen ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                />

                {/* Navigation Buttons */}
                {selectedProject.modalContent.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75 transition-colors z-[10001]"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75 transition-colors z-[10001]"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Image Counter */}
              <div className="text-center mt-4 text-white">
                {currentImageIndex + 1} / {selectedProject.modalContent.images.length}
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
};

export default Projects;