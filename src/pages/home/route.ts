import type { Route } from '../../routes/types';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: '/',
  priority: 1,
  locales: {
    en: {
      title: 'Camberi — the studio behind FireCMS, Rebase, medicalmotion',
      description:
        'A product engineering studio in Madrid and Munich. We build and run our own software — FireCMS, Rebase and Neat — and the technology behind medicalmotion.',
      ogDescription:
        "We don't hand it over and disappear. A product engineering studio that builds and runs its own software — and yours.",
    },
    es: {
      title: 'Camberi — el estudio tras FireCMS, Rebase y medicalmotion',
      description:
        'Estudio de ingeniería de producto entre Madrid y Múnich. Creamos y mantenemos nuestro software —FireCMS, Rebase, Neat— y la tecnología de medicalmotion.',
      ogDescription:
        'No lo entregamos y desaparecemos. Un estudio de ingeniería de producto que crea y mantiene su propio software, y el tuyo.',
    },
  },
};
