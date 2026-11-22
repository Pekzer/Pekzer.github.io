import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageFlag from '@/components/LanguageFlags';

const LANGUAGES = [
  { code: 'es', short: 'ES', label: 'Español' },
  { code: 'en', short: 'EN', label: 'English' }
];

/**
 * Selector de idioma: dos opciones visibles (bandera + código) con la activa
 * resaltada, en lugar de un botón que muestra el idioma contrario.
 */
const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="inline-flex select-none items-center rounded-full border border-light-200 bg-light-100 p-0.5 dark:border-dark-700 dark:bg-dark-800"
    >
      {LANGUAGES.map(({ code, short, label }) => {
        const isActive = language === code;

        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={isActive}
            aria-label={label}
            title={label}
            className={[
              'flex items-center space-x-1.5 rounded-full px-2 py-1.5 text-[10px] font-semibold uppercase leading-none tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-1',
              isActive
                ? 'bg-white text-portfolio-1 shadow-sm dark:bg-dark-700 dark:text-white'
                : 'text-light-500 hover:text-light-700 dark:text-dark-400 dark:hover:text-dark-200'
            ].join(' ')}
          >
            <LanguageFlag
              language={code}
              className={`h-3.5 w-5 transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-60'
              }`}
            />
            <span className="hidden sm:inline">{short}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
