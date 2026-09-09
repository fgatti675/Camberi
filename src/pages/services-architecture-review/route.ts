import type { Route } from '../../routes/types';
import { SERVICE_PATHS } from '../services/service';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: SERVICE_PATHS[3],
  priority: 0.8,
  locales: {
    en: {
      title: 'Software architecture review in two weeks — Camberi',
      description:
        'A fixed-scope software architecture review: two weeks reading your stack, then a written plan that ranks findings by cost and your team can act on alone.',
      ogTitle: 'Two weeks, and a written plan your own team can act on',
    },
    es: {
      title: 'Revisión de arquitectura de software, dos semanas — Camberi',
      description:
        'Revisión de arquitectura con alcance cerrado: dos semanas leyendo tu stack y un plan escrito, ordenado por coste, que tu equipo ejecuta sin nosotros.',
      ogTitle: 'Dos semanas y un plan por escrito que tu equipo puede ejecutar solo',
    },
  },
};
