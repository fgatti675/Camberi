/* English copy for /legal/.

   Page copy lives with its page, not in `src/i18n/en.ts` — that file is for
   the chrome every page shares. `copy.es.ts` is typed `: LegalCopy` against
   this object, so a missing key fails the build instead of silently falling
   back to English.

   Two conventions, both handled by `Prose` in `src/components/PageLayout.tsx`:
   inline links are written `[label](href)`, and `__TOKEN__` is replaced with a
   value from `src/site.ts`. Facts are never typed into copy — names, numbers
   and addresses live in `site.ts` so there is exactly one place to fix them.
   ────────────────────────────────────────────────────────────── */

interface LegalBlock {
  title: string;
  body: string[];
  /** Rendered as a plain list under the body. */
  list?: string[];
}

const blocks: LegalBlock[] = [
  {
    title: 'Contact',
    body: [
      'Write to [hello@camberi.com](mailto:hello@camberi.com). That address reaches everyone here.',
      'A thirty-minute call can be booked directly on [our calendar](__BOOKING_URL__).',
    ],
  },
  {
    title: 'Hosting',
    body: [
      'camberi.com is hosted on Firebase Hosting, a Google Cloud service. For customers established in the European Economic Area the contracting entity is __HOST_ENTITY__, __HOST_ADDRESS__. Its terms are published at [firebase.google.com/terms](__HOST_URL__).',
    ],
  },
  {
    title: 'Data protection',
    body: [
      'What happens to personal data, including what this site’s analytics collect, is set out in the [privacy policy](/privacy/).',
    ],
  },
  {
    title: 'Intellectual property',
    body: [
      'The text, images, layout and source code of this site belong to __LEGAL_NAME__ unless attributed otherwise. Client and partner logos, product screenshots and third-party marks belong to their owners and appear here to identify the work, not to claim it.',
      'The open-source projects described on this site are published under their own licences in their own repositories. Those licences, not this notice, govern their use.',
    ],
  },
  {
    title: 'Applicable law',
    body: [
      'This site and its use are governed by Spanish law. Where the law allows the forum to be chosen, the courts of Madrid have jurisdiction; where consumer rules fix the forum, those rules prevail.',
      'This notice is published under article 10 of Spanish Law 34/2002 on information society services and electronic commerce (LSSI-CE).',
    ],
  },
  {
    title: 'For visitors in Germany — Impressum (§ 5 DDG)',
    body: [
      '__LEGAL_NAME__ is a Spanish company with no establishment in Germany: where this site says Munich it means the city one of us works from, not a registered branch. § 5 DDG asks for a specific set of details all the same, and every one of them is above.',
    ],
    list: [
      'Legal form and authorised representative — sociedad de responsabilidad limitada (S.L.), represented by its sole director, __DIRECTOR__.',
      'Register and register number — Commercial Registry of Madrid, sheet __HOJA__.',
      'VAT identification number under § 27a UStG — __VAT_ID__.',
      'Two channels for direct, rapid contact — the email address and the booking link above.',
      'Responsible for the content — __DIRECTOR__, at the registered office above.',
    ],
  },
];

export const legalEn = {
  title: 'Legal notice',
  intro:
    'Who runs this website, and the company information Spanish and German law require it to publish.',
  updated: 'Last updated 9 September 2026',

  /** Row labels for the identification table. Every value comes from src/site.ts. */
  labels: {
    legalName: 'Legal name',
    tradeName: 'Trade name',
    legalForm: 'Legal form',
    taxId: 'Tax ID (NIF/CIF)',
    vatId: 'VAT number',
    address: 'Registered office',
    registry: 'Commercial registry',
    director: 'Sole director',
    founded: 'Incorporated',
    email: 'Email',
    website: 'Website',
  },

  /** The two values that read differently in each language. */
  legalFormValue: 'Sociedad de responsabilidad limitada (S.L.) — Spanish private limited company',
  foundedValue: '17 May 2023',

  blocks,
};

export type LegalCopy = typeof legalEn;
