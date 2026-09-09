import type { Route } from '../../routes/types';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: '/work/medicalmotion/',
  priority: 0.8,
  locales: {
    en: {
      title: 'medicalmotion — a case study — Camberi',
      description:
        'How the technology behind medicalmotion was built: insurer coverage modelled as data, therapy records that Pain Lab can read, and one team on the app, the therapist tooling and the platform. Since 2019.',
      ogTitle: 'medicalmotion: pain therapy more than 23 insurers pay for',
    },
    es: {
      title: 'medicalmotion — el caso — Camberi',
      description:
        'Cómo se hizo la tecnología de medicalmotion: la cobertura de cada aseguradora como dato, datos de terapia que Pain Lab puede leer y un solo equipo para la app, las herramientas del fisio y la plataforma. Desde 2019.',
      ogTitle: 'medicalmotion: terapia del dolor que pagan más de 23 aseguradoras',
    },
  },
};
