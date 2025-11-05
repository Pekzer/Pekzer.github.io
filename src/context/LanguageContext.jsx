import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Mí',
      projects: 'Proyectos',
      contact: 'Contacto',
      education: 'Formación'
    },
    home: {
      title: '¡Hola! Soy',
      subtitle: 'Desarrollador Full Stack - DevOps',
      description: 'Apasionado por la informática y la resolución de problemas. Especializado en desarrollo web con React, Laravel y bases de datos.',
      cta: 'Ver Proyectos',
      contact: 'Contactar',
      cv: 'Descargar CV'
    },
    about: {
      title: 'Sobre Mí',
      subtitle: 'Conoce mi historia',
      description: 'Soy un programador apasionado por la informática y la resolución de problemas. Actualmente cursando la Tecnicatura Universitaria en Programación en la Universidad Nacional de Salta.',
      skills: 'Conocimientos',
      experience: 'Educación',
      education: 'Educación',
      educationSubtitle: 'Mi trayectoria educativa y desarrollo profesional',
      courses: 'Cursos',
      languages: 'Idiomas',
      tools: 'Herramientas',
      featuredProjects: 'Proyectos Destacados',
      otherProjects: 'Otros Proyectos',
      moreWork: '¿Quieres ver más de mi trabajo?',
      viewGithub: 'Ver en GitHub',
      connectTitle: 'Conectemos',
      connectDescription: 'Estoy siempre abierto a discutir oportunidades de aprendizaje o trabajo, proyectos colaborativos o simplemente hablar sobre programación y tecnología. ¡No dudes en contactarme!',
      sendMessage: 'Envíame un mensaje',
      messageSuccess: '¡Mensaje enviado correctamente! Te responderé pronto.',
      sending: 'Enviando...',
      coursesStats: 'Cursos',
      yearsStudying: 'Años estudiando',
      paragraph1: 'Soy un desarrollador Full Stack, estudiante de la Tecnicatura Universitaria en Programación en la Universidad Nacional de Salta.',
      paragraph2: 'A lo largo de mi formación he fortalecido mis capacidades de colaboración en proyectos grupales, comunicación con clientes, estructuración eficiente de sistemas, análisis de datos y al desarrollo de soluciones funcionales.',
      paragraph3: 'He completado diversos cursos especializados incluyendo Argentina Programa, 1000 Programadores Python, y certificaciones en FreeCodeCamp. Mi stack tecnológico incluye Java, Python, Laravel, React, PHP y TypeScript, junto con bases de datos PostgreSQL y MySQL.',
      paragraph4: 'En mi tiempo libre, suelo estar jugando videojuegos, o leyendo libros.',
      skillsCategories: {
        backend: 'Backend',
        frontend: 'Frontend',
        databases: 'Bases de Datos',
        tools: 'Herramientas',
        languages: 'Lenguajes'
      },
      languagesList: {
        english: 'Inglés Avanzado (C2)',
        spanish: 'Español Nativo'
      }
    },
    education: {
      description1: 'Estudiando programación, estructuras de datos, algoritmos y arquitectura de computadora.',
      description2: 'Educación secundaria con especialización en informática y tecnología.',
      period1: '2021 - Actualidad',
      period2: '2015 - 2019',
      courseDescription1: 'Programa nacional de formación en programación',
      courseDescription2: 'Curso intensivo de programación en Python',
      courseDescription3: 'Algoritmos y estructuras de datos en JavaScript',
      courseDescription4: 'Fundamentos del desarrollo web moderno',
      courseDescription5: 'Computación científica con Python',
      titles: 'Proyectos',
      dedication: 'Dedicación',
      title1: 'Tecnicatura Universitaria en Programación',
      title2: 'Bachiller con orientación en Informática'
    },
    projects: {
      title: 'Proyectos',
      subtitle: 'Mis trabajos recientes',
      viewProject: 'Ver Proyecto',
      viewCode: 'Ver Código',
      featuredProjects: 'Proyectos Destacados',
      otherProjects: 'Otros Proyectos',
      moreWork: '¿Quieres ver más de mi trabajo?',
      viewGithub: 'Ver en GitHub',
      hirpace: {
        title: 'Aplicación WEB HIRPACE',
        description: 'Página web para una institución médica, con sistema de contenedores editables, registro de historias clínicas, gestión de turnos y manejo de pagos.',
        modalDescription: 'Sistema integral de gestión médica desarrollado para instituciones de salud. Incluye módulos avanzados para la administración eficiente de pacientes, personal médico y operaciones clínicas.',
        features: [
          'Sistema de contenedores editables para personalización',
          'Registro completo de historias clínicas',
          'Gestión inteligente de turnos médicos',
          'Sistema de pagos integrado',
          'Panel de administración para médicos',
          'Interfaz responsive y moderna'
        ]
      },
      dashboardReact: {
        title: 'Dashboard React con TypeScript',
        description: 'Panel de administración moderno desarrollado con React, TypeScript, Vite y PostgreSQL como base de datos.'
      },
      apiJava: {
        title: 'API REST con Java',
        description: 'API RESTful desarrollada en Java con Spring Boot, conectada a base de datos MySQL para gestión de usuarios.'
      }
    },
    contact: {
      title: 'Contacto',
      subtitle: '¡Trabajemos juntos!',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      phone: 'Teléfono',
      whatsapp: 'WhatsApp',
      location: 'Ubicación',
      linkedin: 'LinkedIn',
      github: 'GitHub'
    },
    footer: {
      description: 'Desarrollador Full Stack apasionado por la informática y la resolución de problemas.',
      quickLinks: 'Enlaces Rápidos',
      contactInfo: 'Contacto',
      backToTop: 'Volver arriba',
      copyright: '© 2025 Gonzalo Herrera. Todos los derechos reservados.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Me',
      projects: 'Projects',
      contact: 'Contact',
      education: 'Education'
    },
    home: {
      title: 'Hello! I am',
      subtitle: 'Full Stack Developer - DevOps',
      description: 'Passionate about computer science and problem solving. Specialized in web development with React, Laravel and databases.',
      cta: 'View Projects',
      contact: 'Contact',
      cv: 'Download CV'
    },
    about: {
      title: 'About Me',
      subtitle: 'Know my story',
      description: 'I am a programmer passionate about computer science and problem solving. Currently studying University Programming Technician at Universidad Nacional de Salta.',
      skills: 'Knowledge',
      experience: 'Education',
      education: 'Education',
      educationSubtitle: 'My educational journey and professional development',
      courses: 'Courses',
      languages: 'Languages',
      tools: 'Tools',
      featuredProjects: 'Featured Projects',
      otherProjects: 'Other Projects',
      moreWork: 'Want to see more of my work?',
      viewGithub: 'View on GitHub',
      connectTitle: "Let's Connect",
      connectDescription: "I'm always open to discussing learning or work opportunities, collaborative projects or simply talking about programming and technology. Don't hesitate to contact me!",
      sendMessage: 'Send me a message',
      messageSuccess: 'Message sent successfully! I will reply soon.',
      sending: 'Sending...',
      coursesStats: 'Courses',
      yearsStudying: 'Years studying',
      paragraph1: 'I am a Full Stack developer, student of the University Programming Technician at Universidad Nacional de Salta.',
      paragraph2: 'Throughout my training I have strengthened my capabilities in group project collaboration, client communication, efficient system structuring, data analysis and functional solution development.',
      paragraph3: 'I have completed various specialized courses including Argentina Programa, 1000 Programadores Python, and FreeCodeCamp certifications. My technology stack includes Java, Python, Laravel, React, PHP and TypeScript, along with PostgreSQL and MySQL databases.',
      paragraph4: 'In my free time, I\'m usually playing video games or reading books.',
      skillsCategories: {
        backend: 'Backend',
        frontend: 'Frontend',
        databases: 'Databases',
        tools: 'Tools',
        languages: 'Languages'
      },
      languagesList: {
        english: 'Advanced English (C2)',
        spanish: 'Native Spanish'
      }
    },
    education: {
      description1: 'Studying programming, data structures, algorithms and computer architecture.',
      description2: 'Secondary education with specialization in computer science and technology.',
      period1: '2021 - Present',
      period2: '2015 - 2019',
      courseDescription1: 'National training program in programming',
      courseDescription2: 'Intensive Python programming course',
      courseDescription3: 'Algorithms and data structures in JavaScript',
      courseDescription4: 'Fundamentals of modern web development',
      courseDescription5: 'Scientific computing with Python',
      titles: 'Titles',
      dedication: 'Dedication',
      title1: 'University Programming Technician',
      title2: 'High School with Computer Science Orientation'
    },
    projects: {
      title: 'Projects',
      subtitle: 'My recent work',
      viewProject: 'View Project',
      viewCode: 'View Code',
      featuredProjects: 'Featured Projects',
      otherProjects: 'Other Projects',
      moreWork: 'Want to see more of my work?',
      viewGithub: 'View on GitHub',
      hirpace: {
        title: 'HIRPACE WEB Application',
        description: 'Website for a medical institution, with editable container system, clinical history registration, appointment management and payment handling.',
        modalDescription: 'Comprehensive medical management system developed for healthcare institutions. Includes advanced modules for efficient administration of patients, medical staff and clinical operations.',
        features: [
          'Editable container system for customization',
          'Complete clinical history registration',
          'Intelligent medical appointment management',
          'Integrated payment system',
          'Administration panel for doctors',
          'Responsive and modern interface'
        ]
      },
      dashboardReact: {
        title: 'React Dashboard with TypeScript',
        description: 'Modern admin panel developed with React, TypeScript, Vite and PostgreSQL as database.'
      },
      apiJava: {
        title: 'REST API with Java',
        description: 'RESTful API developed in Java with Spring Boot, connected to MySQL database for user management.'
      }
    },
    contact: {
      title: 'Contact',
      subtitle: "Let's work together!",
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      location: 'Location',
      linkedin: 'LinkedIn',
      github: 'GitHub'
    },
    footer: {
      description: 'Full Stack Developer passionate about computer science and problem solving.',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact',
      backToTop: 'Back to top',
      copyright: '© 2025 Gonzalo Herrera. All rights reserved.'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};