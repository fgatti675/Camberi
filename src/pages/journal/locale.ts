import { locale } from '../../i18n';

/* Its own module because `post.tsx` exports a component, and a file that
   exports both a component and a helper loses Fast Refresh — the lint rule
   in `eslint.config.js` says so out loud. */

/** Picks the language the same way every other page does. */
export function pick<T>(en: T, es: T): T {
  return locale === 'es' ? es : en;
}
