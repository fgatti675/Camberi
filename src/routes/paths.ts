import type { Locale } from '../i18n';

/* URL arithmetic, kept free of the page glob so the head builder can
   import it without pulling every page into the graph. */

/** The English path prefixed for a language: `/legal/` → `/es/legal/`. */
export function localePath(locale: Locale, path: string): string {
  return locale === 'es' ? `/es${path}` : path;
}

/** Full canonical URL for a route in a language. */
export function routeUrl(origin: string, locale: Locale, path: string): string {
  return origin + localePath(locale, path);
}

/**
 * The route path a browser location corresponds to. Tolerates the missing
 * trailing slash Firebase's `cleanUrls` can serve, and strips the `/es`
 * language prefix — the Spanish page of `/legal/` is the same route,
 * rendered in Spanish.
 */
export function routePathFromLocation(pathname: string): string {
  let p = pathname.replace(/index\.html?$/, '');
  if (!p.startsWith('/')) p = `/${p}`;
  if (!p.endsWith('/')) p += '/';
  if (p === '/es/') return '/';
  if (p.startsWith('/es/')) p = p.slice(3);
  return p;
}
