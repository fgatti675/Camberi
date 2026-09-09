import type { Route } from '../../routes/types';

/* The page's URL and its head copy, kept apart from the component so the
   route table can read it without pulling the page into the main bundle.
   See ../README.md. */
export const route: Route = {
  path: '/privacy/',
  priority: 0.3,
  locales: {
    en: {
      title: 'Privacy policy — Camberi',
      description:
        'What camberi.com does with personal data: Firebase Hosting logs, Google Analytics only if you accept, email enquiries, and your rights under the GDPR.',
    },
    es: {
      title: 'Política de privacidad — Camberi',
      description:
        'Qué hace camberi.com con los datos personales: registros de Firebase Hosting, Google Analytics solo si lo aceptas, consultas por correo y derechos RGPD.',
    },
  },
};
