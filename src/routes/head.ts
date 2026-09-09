import { SITE, SAME_AS, known } from '../site';
import type { Locale } from '../i18n';
import type { Route } from './types';
import { localePath } from './paths';

/* ──────────────────────────────────────────────────────────────
   Every page's <head>, in one place.

   This used to live twice, hand-maintained, in `index.html` and
   `es/index.html`. It is now generated per route per language by
   the prerender step, which is the only way a growing set of pages
   can keep correct canonicals and hreflang without somebody
   remembering to copy a block.

   `index.html` at the repo root is now only a dev shell. Nothing
   you add there reaches production.
   ────────────────────────────────────────────────────────────── */

/** Bumped when an icon file changes — images are cached for seven days. */
const ICON_VERSION = '3';
/** Same, for the social cards. */
const OG_VERSION = '2';

const OG_LOCALE: Record<Locale, string> = { en: 'en_GB', es: 'es_ES' };
const IN_LANGUAGE: Record<Locale, string> = { en: 'en-GB', es: 'es-ES' };
const OG_IMAGE: Record<Locale, string> = { en: 'og.png', es: 'og-es.png' };

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function meta(name: string, content: string): string {
  return `<meta name="${name}" content="${esc(content)}" />`;
}

function prop(property: string, content: string): string {
  return `<meta property="${property}" content="${esc(content)}" />`;
}

/* ── The parts that never vary ────────────────────────────────
   Encoding, viewport, the icon set and the two faces the first
   viewport paints. The `?v=` on the icons busts the seven-day
   image cache, so a changed mark arrives immediately instead of a
   week later. */
const COMMON = [
  '<meta charset="UTF-8" />',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  `<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=${ICON_VERSION}" />`,
  `<link rel="icon" type="image/x-icon" href="/favicon.ico?v=${ICON_VERSION}" sizes="48x48" />`,
  `<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=${ICON_VERSION}" />`,
  '<link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/dm-serif-display-latin-400-normal.woff2" />',
  '<link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/instrument-sans-latin-wght-normal.woff2" />',
].join('\n    ');

/* ── Entrances without JavaScript ─────────────────────────────
   The reveal primitives start at `opacity: 0` and are switched on
   by an IntersectionObserver. The prerendered HTML therefore
   carries the full text but paints none of it until the bundle
   runs. This turns the choreography off entirely when there is no
   script to run it, so the page is readable either way. */
const NOSCRIPT_REVEAL =
  '<noscript><style>.reveal,.stagger>*,.wipe,.rule{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}</style></noscript>';

/* ── Language routing ─────────────────────────────────────────
   Only the English home page redirects. `/es/` never does, which
   makes a loop structurally impossible, and inner pages never do
   either — a deliberate URL always wins, and a visitor who followed
   a link to /legal/ must land on /legal/. */
const LANGUAGE_SCRIPT = `<script>
      (function () {
        try {
          var stored = null;
          try { stored = localStorage.getItem('camberi-lang'); } catch (e) {}
          if (stored === 'en') return;
          var wantsEs = stored === 'es';
          if (!stored) {
            var langs = (navigator.languages && navigator.languages.length)
              ? navigator.languages
              : [navigator.language || ''];
            wantsEs = /^es\\b/i.test(langs[0] || '');
          }
          if (wantsEs) location.replace('/es/' + location.search + location.hash);
        } catch (e) {}
      })();
    </script>`;

/* ── Analytics ────────────────────────────────────────────────
   There is deliberately no tag here.

   Until now this file emitted gtag.js on every page of every
   language, which meant Google was contacted and the `_ga` cookies
   were written before the visitor had been asked anything. Google
   Analytics is not covered by the narrow audience-measurement
   exemption in the AEPD's cookie guide, and § 25 TDDDG requires
   consent for any storage a German visitor's requested service does
   not need — so that tag was the one non-compliant thing on the
   site.

   The measurement id now lives inert in `src/site.ts` and is picked
   up by `src/components/ConsentBar.tsx`, which injects gtag.js from
   the client only after somebody has accepted. Putting it in the
   head at all would defeat the point: a script tag in prerendered
   HTML fires before React has a chance to decide anything.
   ────────────────────────────────────────────────────────────── */

type Json = Record<string, unknown>;

/** Drop every key whose value is null/undefined, so an unknown fact is simply absent. */
function compact(obj: Json): Json {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined));
}

function postalAddress(): Json {
  return compact({
    '@type': 'PostalAddress',
    streetAddress: known(SITE.address.street) ? SITE.address.street : null,
    postalCode: known(SITE.address.postalCode) ? SITE.address.postalCode : null,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  });
}

/**
 * The organisation, emitted on the home page of each language.
 *
 * `address` is the registered office of the company — a legal fact, one
 * city. Where the people actually are is a different claim, so Madrid and
 * Munich are carried by `location` at city level; no street is invented for
 * Munich because there is no Munich establishment to give one for.
 */
function organizationJsonLd(locale: Locale, description: string): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.origin}/#organization`,
    name: SITE.tradeName,
    legalName: SITE.legalName,
    url: `${SITE.origin}/`,
    logo: `${SITE.origin}/icon-512.png`,
    image: `${SITE.origin}/${OG_IMAGE[locale]}?v=${OG_VERSION}`,
    email: SITE.email,
    telephone: known(SITE.phone) ? SITE.phone : null,
    vatID: known(SITE.vatId) ? SITE.vatId : null,
    taxID: known(SITE.taxId) ? SITE.taxId : null,
    foundingDate: known(SITE.foundingDate) ? SITE.foundingDate : null,
    numberOfEmployees: { '@type': 'QuantitativeValue', value: SITE.headcount },
    address: postalAddress(),
    location: [
      {
        '@type': 'Place',
        name: 'Madrid',
        address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
      },
      {
        '@type': 'Place',
        name: 'Munich',
        address: { '@type': 'PostalAddress', addressLocality: 'Munich', addressCountry: 'DE' },
      },
    ],
    areaServed: { '@type': 'Place', name: 'Europe' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE.email,
      url: `${SITE.origin}/`,
      availableLanguage: ['en', 'es'],
    },
    sameAs: SAME_AS,
    knowsAbout: [
      'Product engineering',
      'Workflow automation',
      'PostgreSQL',
      'React',
      'TypeScript',
      'AI integration',
      'Health technology',
    ],
    inLanguage: IN_LANGUAGE[locale],
    description,
  });
}

/** Every other page gets a plain WebPage node tied back to the organisation. */
function webPageJsonLd(route: Route, locale: Locale): Json {
  const m = route.locales[locale];
  const url = SITE.origin + localePath(locale, route.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: m.title,
    description: m.description,
    inLanguage: IN_LANGUAGE[locale],
    isPartOf: { '@id': `${SITE.origin}/#organization` },
    publisher: { '@id': `${SITE.origin}/#organization` },
  };
}

function jsonLdBlock(data: Json): string {
  /* `</script>` inside a JSON string would close this block early. */
  const json = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json}\n    </script>`;
}

/**
 * The complete `<head>` inner HTML for one route in one language, minus the
 * asset tags Vite generates (those are appended by the prerender step).
 */
export function buildHead(route: Route, locale: Locale): string {
  const m = route.locales[locale];
  const isHome = route.path === '/';
  const enUrl = SITE.origin + route.path;
  const esUrl = `${SITE.origin}/es${route.path}`;
  const canonical = locale === 'es' ? esUrl : enUrl;
  const image = `${SITE.origin}/${OG_IMAGE[locale]}?v=${OG_VERSION}`;
  const other: Locale = locale === 'es' ? 'en' : 'es';

  const parts: string[] = [
    COMMON,
    '',
    `<title>${esc(m.title)}</title>`,
    meta('description', m.description),
  ];

  if (route.noindex) parts.push(meta('robots', 'noindex, follow'));

  parts.push(
    '',
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" hreflang="es" href="${esUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${enUrl}" />`,
    '',
    prop('og:title', m.ogTitle ?? m.title),
    prop('og:description', m.ogDescription ?? m.description),
    prop('og:type', isHome ? 'website' : 'article'),
    prop('og:url', canonical),
    prop('og:locale', OG_LOCALE[locale]),
    prop('og:locale:alternate', OG_LOCALE[other]),
    prop('og:image', image),
    prop('og:image:width', '1200'),
    prop('og:image:height', '630'),
    prop('og:site_name', SITE.tradeName),
    prop('og:image:alt', `${SITE.tradeName} — product engineering studio`),
    meta('twitter:site', '@firecmsco'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', m.ogTitle ?? m.title),
    meta('twitter:description', m.ogDescription ?? m.description),
    meta('twitter:image', image),
    '',
    NOSCRIPT_REVEAL,
    ''
  );

  if (isHome && locale === 'en') parts.push(LANGUAGE_SCRIPT, '');
  parts.push(jsonLdBlock(isHome ? organizationJsonLd(locale, m.description) : webPageJsonLd(route, locale)));

  return parts.join('\n    ');
}
