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
      contact: 'Contactar'
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
      paragraph1: 'Soy un desarrollador Full Stack, estudiante de la Tecnicatura Universitaria en Programación en la Universidad Nacional de Salta. Apasionado por la informática y la resolución de problemas.',
      paragraph2: 'A lo largo de mi formación he fortalecido mis capacidades de colaboración en proyectos grupales, comunicación con clientes, estructuración eficiente de sistemas, análisis de datos y al desarrollo de soluciones funcionales.',
      paragraph3: 'He completado diversos cursos especializados incluyendo Argentina Programa, 1000 Programadores Python, y certificaciones en FreeCodeCamp. Mi stack tecnológico incluye Java, Python, Laravel, React, PHP y TypeScript, junto con bases de datos PostgreSQL y MySQL.',
      paragraph4: 'En mi tiempo libre, suelo estar jugando videojuegos, o leyendo libros.',
      skillsCategories: {
        backend: 'Backend',
        frontend: 'Frontend',
        databases: 'Base de Datos',
        tools: 'Herramientas',
        languages: 'Idiomas'
      }
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
      contact: 'Contact'
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
      paragraph1: 'I am a Full Stack developer, student of the University Programming Technician at Universidad Nacional de Salta. Passionate about computer science and problem solving.',
      paragraph2: 'Throughout my training I have strengthened my capabilities in group project collaboration, client communication, efficient system structuring, data analysis and functional solution development.',
      paragraph3: 'I have completed various specialized courses including Argentina Programa, 1000 Programadores Python, and FreeCodeCamp certifications. My technology stack includes Java, Python, Laravel, React, PHP and TypeScript, along with PostgreSQL and MySQL databases.',
      paragraph4: 'In my free time, I\'m usually playing video games or reading books.',
      skillsCategories: {
        backend: 'Backend',
        frontend: 'Frontend',
        databases: 'Databases',
        tools: 'Tools',
        languages: 'Languages'
      }
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