
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Reveal, { RevealGroup } from '@/components/Reveal';

const Experience = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      role: t('experience.role'),
      company: t('experience.company'),
      period: t('experience.period'),
      description: t('experience.description'),
    },
  ];

  const scrollToProjects = (event) => {
    event.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-light-50 py-20 dark:bg-dark-900 md:py-24"
    >
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-pattern-dots opacity-30"
      />

      <RevealGroup className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <Reveal className="mb-14 md:mb-16" delay={0}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-light-900 dark:text-white sm:text-4xl md:text-5xl">
              {t('nav.experience')}
            </h2>
          </div>
        </Reveal>

        {/* Línea de tiempo */}
        <div className="relative mx-auto max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute bottom-5 left-[7px] top-5 w-px bg-gradient-to-b from-portfolio-1/50 via-portfolio-1/20 to-transparent"
          />

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <Reveal
                key={`${experience.company}-${index}`}
                delay={100 + index * 120}
                className="relative pl-8 sm:pl-10"
              >
                {/* Hito de la línea de tiempo */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-7 z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-portfolio-1 bg-white shadow-[0_0_0_5px_rgba(124,20,39,0.08)] dark:bg-dark-900"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-portfolio-1" />
                </span>

                <article className="group relative overflow-hidden rounded-xl border border-light-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-portfolio-1/30 hover:shadow-[0_16px_40px_rgba(17,24,39,0.09)] dark:border-dark-700/80 dark:bg-dark-800/70 dark:hover:border-portfolio-1/50 dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
                  {/* Acento superior */}
                  <div
                    aria-hidden="true"
                    className="h-1 w-full bg-gradient-to-r from-portfolio-1 via-portfolio-1/70 to-transparent"
                  />

                  <div className="p-5 sm:p-7 md:p-8">
                    {/* Puesto y período */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold leading-snug text-light-900 transition-colors group-hover:text-portfolio-1 dark:text-white dark:group-hover:text-portfolio-1 sm:text-2xl">
                          {experience.role}
                        </h3>

                        <p className="mt-2 text-sm font-semibold text-portfolio-1 dark:text-portfolio-1 sm:text-base">
                          {experience.company}
                        </p>
                      </div>

                      <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-md border border-portfolio-1/15 bg-portfolio-1/5 px-3 py-1.5 text-xs font-semibold text-portfolio-1 dark:border-portfolio-1/20 dark:bg-portfolio-1/5 dark:text-portfolio-1 sm:text-sm">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-current"
                        />
                        {experience.period}
                      </span>
                    </div>

                    {/* Separador */}
                    <div className="my-5 h-px bg-light-200 dark:bg-dark-700" />

                    {/* Descripción */}
                    <p className="max-w-3xl text-sm leading-7 text-light-600 dark:text-dark-300 sm:text-base sm:leading-8">
                      {experience.description}
                    </p>

                    {/* Enlace a proyectos */}
                    <div className="mt-6">
                      <a
                        href="#projects"
                        onClick={scrollToProjects}
                        className="inline-flex items-center gap-2 text-sm font-bold text-portfolio-1 transition-colors hover:text-portfolio-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-1 focus-visible:ring-offset-4 dark:text-portfolio-1 dark:hover:text-white dark:focus-visible:ring-offset-dark-800"
                      >
                        {t('experience.projectsLink')}

                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </RevealGroup>
    </section>
  );
};

export default Experience;