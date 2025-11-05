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
      contact: 'Contacto'
    },
    home: {
      title: '¡Hola! Soy',
      subtitle: 'Desarrollador Full Stack',
      description: 'Apasionado por la informática y la resolución de problemas. Especializado en desarrollo web con React, Laravel y bases de datos.',
      cta: 'Ver Proyectos',
      contact: 'Contactar'
    },
    about: {
      title: 'Sobre Mí',
      subtitle: 'Conoce mi historia',
      description: 'Soy un programador apasionado por la informática y la resolución de problemas. Actualmente cursando la Tecnicatura Universitaria en Programación en la Universidad Nacional de Salta.',
      skills: 'Conocimientos',
      experience: 'Educación',
      education: 'Educación',
      courses: 'Cursos',
      languages: 'Idiomas',
      tools: 'Herramientas',
      featuredProjects: 'Proyectos Destacados',
      otherProjects: 'Otros Proyectos',
      moreWork: '¿Quieres ver más de mi trabajo?',
      viewGithub: 'Ver en GitHub',
      connectTitle: 'Conectemos',
      connectDescription: 'Estoy siempre abierto a discutir oportunidades de aprendizaje, proyectos colaborativos o simplemente hablar sobre programación y tecnología. ¡No dudes en contactarme!',
      sendMessage: 'Envíame un mensaje',
      messageSuccess: '¡Mensaje enviado correctamente! Te responderé pronto.',
      sending: 'Enviando...',
      coursesStats: 'Cursos',
      yearsStudying: 'Años estudiando'
    },
    projects: {
      title: 'Proyectos',
      subtitle: 'Mis trabajos recientes',
      viewProject: 'Ver Proyecto',
      viewCode: 'Ver Código',
      featuredProjects: 'Proyectos Destacados',
      otherProjects: 'Otros Proyectos',
      moreWork: '¿Quieres ver más de mi trabajo?',
      viewGithub: 'Ver en GitHub'
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
      home: 'Inicio',
      about: 'Sobre Mí',
      projects: 'Proyectos',
      contact: 'Contacto',
      contactInfo: 'Contacto',
      backToTop: 'Volver arriba',
      allRights: 'Todos los derechos reservados.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Me',
      projects: 'Projects',
      contact: 'Contact'
    },
    home: {
      title: 'Hello! I am',
      subtitle: 'Full Stack Developer',
      description: 'Passionate about computer science and problem solving. Specialized in web development with React, Laravel and databases.',
      cta: 'View Projects',
      contact: 'Contact'
    },
    about: {
      title: 'About Me',
      subtitle: 'Know my story',
      description: 'I am a programmer passionate about computer science and problem solving. Currently studying University Programming Technician at Universidad Nacional de Salta.',
      skills: 'Knowledge',
      experience: 'Education',
      education: 'Education',
      courses: 'Courses',
      languages: 'Languages',
      tools: 'Tools',
      featuredProjects: 'Featured Projects',
      otherProjects: 'Other Projects',
      moreWork: 'Want to see more of my work?',
      viewGithub: 'View on GitHub',
      connectTitle: "Let's Connect",
      connectDescription: "I'm always open to discussing learning opportunities, collaborative projects or simply talking about programming and technology. Don't hesitate to contact me!",
      sendMessage: 'Send me a message',
      messageSuccess: 'Message sent successfully! I will reply soon.',
      sending: 'Sending...',
      coursesStats: 'Courses',
      yearsStudying: 'Years studying'
    },
    projects: {
      title: 'Projects',
      subtitle: 'My recent work',
      viewProject: 'View Project',
      viewCode: 'View Code',
      featuredProjects: 'Featured Projects',
      otherProjects: 'Other Projects',
      moreWork: 'Want to see more of my work?',
      viewGithub: 'View on GitHub'
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
      home: 'Home',
      about: 'About Me',
      projects: 'Projects',
      contact: 'Contact',
      contactInfo: 'Contact',
      backToTop: 'Back to top',
      allRights: 'All rights reserved.'
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