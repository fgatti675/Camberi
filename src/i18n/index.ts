import { en, type Dict } from './en';
import { es } from './es';

export type Locale = 'en' | 'es';
export type { Dict };

export const STORAGE_KEY = 'camberi-lang';

/* Each language is a separate URL — `/` and `/es/` for the home page,
   `/legal/` and `/es/legal/` for every other one — so search engines index
   both and hreflang can point at real pages. The locale is therefore a
   property of the path, decided before React mounts and never changing
   without a navigation. That is why `t` can be a plain object: no provider,
   no context, no re-render. */
function localeFromPath(pathname: string): Locale {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
}

/* On the server there is no path to read, so the prerender tells us which
   language this process is rendering. `scripts/prerender.mjs` sets the global
   and then imports the bundle — one node process per language, which is what
   lets `t` stay a module-level constant on both sides. */
function currentLocale(): Locale {
  if (typeof window !== 'undefined') return localeFromPath(window.location.pathname);
  const injected = (globalThis as { __CAMBERI_LOCALE__?: string }).__CAMBERI_LOCALE__;
  return injected === 'es' ? 'es' : 'en';
}

export const locale: Locale = currentLocale();

const dicts: Record<Locale, Dict> = { en, es };

/** The active dictionary. Imported directly by every section. */
export const t: Dict = dicts[locale];

export const localeHome: Record<Locale, string> = { en: '/', es: '/es/' };

/** The language this page is *not* in — what the switcher offers. */
export const otherLocale: Locale = locale === 'es' ? 'en' : 'es';

/**
 * Switch language. The choice is remembered so the automatic detection on the
 * English home page never overrides a deliberate decision on a later visit.
 *
 * Every page exists at the same path under `/es/`, so the switcher stays on
 * the page the reader is looking at instead of dumping them back at the home
 * page in the other language.
 */
export function switchLocale(next: Locale = otherLocale) {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode — the redirect below still works for this visit */
  }
  const path = window.location.pathname;
  const bare = path === '/es' || path.startsWith('/es/') ? path.replace(/^\/es/, '') || '/' : path;
  const target = next === 'es' ? `/es${bare}` : bare;
  window.location.href = target + window.location.hash;
}
