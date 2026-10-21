import type { Route } from '../../routes/types';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: '/',
  priority: 1,
  locales: {
    en: {
      title: 'Camberi — AI agents and automation that survive production',
      description:
        'A product engineering studio in Madrid and Munich. We build AI agents and automation that keep running — by the team behind FireCMS and Rebase.',
      ogDescription:
        'Software that does the work for you. AI agents and automation from a studio that builds, runs and maintains its own software — and yours.',
    },
    es: {
      title: 'Camberi — agentes de IA y automatización en producción',
      description:
        'Estudio de ingeniería de producto entre Madrid y Múnich. Hacemos agentes de IA y automatización que siguen funcionando, del equipo de FireCMS y Rebase.',
      ogDescription:
        'Software que hace el trabajo por ti. Agentes de IA y automatización de un estudio que crea y mantiene su propio software, y el tuyo.',
    },
  },
};
