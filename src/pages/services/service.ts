import { locale, localeHome } from '../../i18n';
import { localePath } from '../../routes/paths';

/* ──────────────────────────────────────────────────────────────
   The parts every service page shares.

   The four engagements used to be four anchors on the home page,
   which meant one URL had to rank for four different things and
   ranked for none of them. Each is now a page, and each page has
   to earn its own place: the same skeleton, entirely different
   words. A page that answered the same question as its neighbours
   with a different heading would be a doorway, not a page.

   This module holds the shape of that skeleton (`ServiceCopy`), the
   paths, and the link tokens the copy files reference as
   `__TOKEN__`. The component is in `ServicePage.tsx`; the words are
   in each page's own `copy.en.ts` / `copy.es.ts`.
   ────────────────────────────────────────────────────────────── */

/**
 * The four engagement pages, **in the order of `t.engagements.items`**.
 *
 * That order is the coupling: the home page's engagement list, the
 * `/services/` index and the "other engagements" block at the foot of each
 * page all pair an item with a path by index. Reorder `engagements.items`
 * in `src/i18n/en.ts` and this array has to move with it.
 */
export const SERVICE_PATHS = [
  '/services/automation/',
  '/services/product/',
  '/services/data-platform/',
  '/services/architecture-review/',
] as const;

export const SERVICES_INDEX = '/services/';

/** The same path in the language being rendered: `/es/services/automation/`. */
export const servicePath = (path: string) => localePath(locale, path);

/** The home page's contact band, from whichever language this page is. */
export const contactHref = `${localeHome[locale]}#contact`;

/**
 * Values the copy strings reference as `__TOKEN__`. Internal links are
 * language-prefixed here rather than in the copy, so neither `copy.en.ts` nor
 * `copy.es.ts` ever writes a URL that only works in one language.
 */
export function serviceVars(): Record<string, string> {
  return {
    SERVICES: servicePath(SERVICES_INDEX),
    AUTOMATION: servicePath(SERVICE_PATHS[0]),
    PRODUCT: servicePath(SERVICE_PATHS[1]),
    DATA_PLATFORM: servicePath(SERVICE_PATHS[2]),
    REVIEW: servicePath(SERVICE_PATHS[3]),
    MEDICALMOTION: servicePath('/work/medicalmotion/'),
    SUSTENTALENT: servicePath('/work/sustentalent/'),
    CONTACT: contactHref,
  };
}

interface Titled {
  title: string;
  body: string;
}

/**
 * One service page's words.
 *
 * `copy.es.ts` is typed against this, so a missing section fails the build
 * rather than rendering half a page in the wrong language.
 */
export interface ServiceCopy {
  /** The h1. States the outcome, not the discipline. */
  title: string;
  /** The standfirst beside it. */
  intro: string;
  /** The mono line under the masthead: the shape of the engagement. */
  meta: string;
  /** Opening paragraphs, before the first section. */
  lead: string[];

  /** Who it is for, and — the half nobody writes — who it is not for. */
  fit: {
    title: string;
    intro: string;
    forTitle: string;
    for: string[];
    notTitle: string;
    not: string[];
  };

  /** The concrete situations people arrive with. */
  problems: { title: string; intro: string; items: Titled[] };

  /** What is actually handed over. */
  deliverables: { title: string; intro: string; items: Titled[] };

  /** The shape of the calendar. Never a date, never a price. */
  running: {
    title: string;
    intro: string;
    steps: { label: string; title: string; body: string }[];
  };

  /** Checkable numbers, each linked to its public source, and the case studies. */
  proof: {
    title: string;
    intro: string;
    evidence: { value: string; label: string; source: string; href: string }[];
    body: string[];
  };

  /** Plain text, no FAQ schema — Google stopped showing it for businesses. */
  faq: { title: string; intro: string; items: { q: string; a: string }[] };

  /** The one paragraph that leads into the shared contact promise. */
  cta: { body: string };

  /** Heading for the block linking the other three engagements. */
  related: { title: string; intro: string };
}
