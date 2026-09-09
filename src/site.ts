/* ──────────────────────────────────────────────────────────────
   Who the company actually is.

   One module for the facts that identify us: the entity behind the
   trade name, where it is registered, how to reach it, and the
   accounts that belong to it. The legal notice, the JSON-LD and the
   footer all read from here, so a fact is corrected in one place.

   Anything not yet verified is `TODO_FRANCESCO` — null, on purpose.
   Every consumer skips a null field rather than printing a
   placeholder, because a plausible-looking wrong NIF on a legal
   notice is worse than no NIF at all. Grep this file for
   TODO_FRANCESCO to see what is still outstanding.
   ────────────────────────────────────────────────────────────── */

/** A fact nobody has confirmed yet. Renders as nothing, never as filler. */
export const TODO_FRANCESCO = null;

/** True when a `TODO_FRANCESCO` field has been filled in. */
export function known<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined && value !== '';
}

export const SITE = {
  /** No trailing slash. Every canonical and og:url is built off this. */
  origin: 'https://camberi.com',

  /** What the site calls itself. */
  tradeName: 'Camberi',

  /* ── The entity ─────────────────────────────────────────────
     Camberi is a trade name. The company that signs contracts,
     issues invoices and is liable for this website is FireCMS S.L. */
  legalName: 'FireCMS S.L.',
  /** Sociedad de responsabilidad limitada — the Spanish private limited form. */
  legalForm: {
    en: 'Sociedad de responsabilidad limitada (S.L.), the Spanish private limited company form',
    es: 'Sociedad de responsabilidad limitada (S.L.)',
  },

  /** Spanish tax identification number (NIF / CIF). */
  taxId: 'B13789565' as string | null,
  /**
   * Intra-community VAT number. Checked against the EU VIES service rather
   * than assumed from the CIF — note that the number published on
   * firecms.co/policy/terms_conditions is a personal DNI, not this.
   */
  vatId: 'ESB13789565' as string | null,

  /** Registered office (domicilio social). */
  address: {
    street: 'Calle Piamonte 23' as string | null,
    postalCode: '28004' as string | null,
    locality: 'Madrid',
    region: 'Madrid',
    country: 'ES',
    countryName: { en: 'Spain', es: 'España' },
  },

  /** Registro Mercantil entry. Every part is needed or none of them help. */
  registry: {
    office: { en: 'Commercial Registry of Madrid', es: 'Registro Mercantil de Madrid' },
    tomo: '45186' as string | null,
    folio: '57' as string | null,
    seccion: '8' as string | null,
    hoja: 'M-795146' as string | null,
    inscripcion: '1' as string | null,
  },

  /**
   * The people authorised to represent the company. § 5 DDG asks German
   * visitors to be told who they are; LSSI art. 10 is satisfied by the
   * company data above, so this is here for the German half. The registry
   * records both surnames.
   */
  representatives: ['Francesco Gatti Gómez'] as string[],
  /** How the registry describes that role. */
  representativeRole: { en: 'Sole director (administrador único)', es: 'Administrador único' },

  /** The person answerable for the site's content (§ 5 DDG). */
  contentResponsible: 'Francesco Gatti Gómez',

  /* ── Contact ────────────────────────────────────────────────
     § 5 DDG wants two channels that reach a human quickly. Email is
     one; the booking link is the second, and it is a real calendar
     rather than a form that goes nowhere. */
  email: 'hello@camberi.com',
  /** A phone number would be the conventional second channel. */
  phone: TODO_FRANCESCO as string | null,
  bookingUrl:
    'https://calendar.google.com/appointments/schedules/AcZssZ2FlONeeWMb2BEJcZijwyms1MI1k_G2dSulanQ6cQvVZ7S79V9vLM14mgB6q2X6jDjItlQB0c78',

  /** Incorporation date, ISO. Public deed and registry inscription, 17 May 2023. */
  foundingDate: '2023-05-17' as string | null,

  /** People. Stated once, as a fact, never as a selling point. */
  headcount: 3,

  /** Where the people are. Not registered establishments — see the legal notice. */
  places: ['Madrid', 'Munich'],

  social: {
    github: 'https://github.com/firecmsco',
    linkedin: 'https://www.linkedin.com/company/camberi',
    x: 'https://x.com/firecmsco',
    npm: 'https://www.npmjs.com/org/firecms',
  },

  /** Left exactly as it was; the consent and analytics change is owned elsewhere. */
  ga4: 'G-Z5J6BDF0QT',

  /**
   * The hosting provider, which both LSSI and § 5 DDG expect to be named.
   * Firebase Hosting is a Google Cloud service; for customers established in
   * the EEA the contracting Google entity is Google Cloud EMEA Limited.
   */
  host: {
    service: 'Firebase Hosting (Google Cloud)',
    entity: 'Google Cloud EMEA Limited',
    address: '70 Sir John Rogerson’s Quay, Dublin 2, Ireland',
    url: 'https://firebase.google.com/terms',
  },
};

/** `sameAs` for the organisation JSON-LD: every account that is really ours. */
export const SAME_AS: string[] = [
  SITE.social.github,
  SITE.social.linkedin,
  SITE.social.x,
  SITE.social.npm,
];
