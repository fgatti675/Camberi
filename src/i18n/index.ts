import { en, type Dict } from './en';
import { es } from './es';

export type Locale = 'en' | 'es';
export type { Dict };

export const STORAGE_KEY = 'camberi-lang';

/* Each language is a separate URL — `/` for English, `/es/` for Spanish —
   so search engines index both and hreflang can point at real pages. The
   locale is therefore a property of the path, decided before React mounts
   and never changing without a navigation. */
function localeFromPath(pathname: string): Locale {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
}

export const locale: Locale =
  typeof window === 'undefined' ? 'en' : localeFromPath(window.location.pathname);

const dicts: Record<Locale, Dict> = { en, es };

/** The active dictionary. Imported directly by every section. */
export const t: Dict = dicts[locale];

export const localeHome: Record<Locale, string> = { en: '/', es: '/es/' };

/** The language this page is *not* in — what the switcher offers. */
export const otherLocale: Locale = locale === 'es' ? 'en' : 'es';

/**
 * Switch language. The choice is remembered so the automatic detection in
 * `index.html` never overrides a deliberate decision on a later visit.
 */
export function switchLocale(next: Locale = otherLocale) {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode — the redirect below still works for this visit */
  }
  window.location.href = localeHome[next] + window.location.hash;
}
