import type { CaseQuote, CaseDecision, CaseEvidence, CaseFact } from '../../components/CaseStudy';

/* English copy for /work/medicalmotion/.

   Every figure on this page is linked to the page it can be checked on —
   medicalmotion's own about page, the German App Store listing, an insurer's
   own coverage page. Nothing here is a number we were told in a meeting.

   Deliberately absent: any claim about medical-device certification, IEC
   62304 or ISO 13485. Those came up in an earlier strategy conversation and
   could not be verified from a public source, so the argument is made with
   insurer reimbursement and published studies instead.
   ────────────────────────────────────────────────────────────── */

const decisions: CaseDecision[] = [
  {
    title: 'Coverage is a record, not a branch in the code.',
    body: [
      'Every insurer pays on its own terms. [ARAG covers three months](https://medicalmotion.com/de/arag) and issues the access code itself, by email, against a policy number. [SDK covers six](https://www.sdk.de/versicherungen/private-krankenversicherung/gesundheitsdienstleistungen/digitale-schmerztherapie-mit-medicalmotion), for fully insured members only, with three of its tariffs excluded, and the member asks for the code inside the app. In neither case does the patient pay and claim it back.',
      'Written as conditions in the app, the twenty-fourth insurer is a release and the thirtieth is a rewrite. So an insurer is data — who they are, how a member proves they are one, for how long, and how it is billed — and adding one is a configuration change and a landing page. That is the difference between a sales pipeline the business controls and a backlog item it has to queue behind everything else.',
    ],
  },
  {
    title: 'What the patient does is the research record.',
    body: [
      'In 2024 medicalmotion launched [Pain Lab](https://medicalmotion.com/en/about-us), a data pool for pain analysis and health services research. It reads what the product already collects — the pain profile, the plan that profile produced, the sessions actually done — rather than a second pipeline built beside the product to feed studies.',
      'That is only possible if therapy data was modelled from the beginning as a record of what happened rather than as the app’s current state. It is a decision you make once, early, and cannot retrofit cheaply: the version where the app overwrites last week’s plan is quicker to build and permanently unable to answer why a patient improved.',
    ],
  },
  {
    title: 'One team for the app, the therapist tooling and the platform under both.',
    body: [
      'The patient app, the tooling the therapists work in, the personalisation engine that turns a pain profile into a plan, and the data platform the research reads are one system, not four products with contracts between them. A therapist’s change to a plan is the patient’s next session and, later, a row somebody studies.',
      'Where those pieces belong to different vendors, the seams are exactly where the meaning of the data gets lost: a field one team treats as advisory becomes another team’s primary key. Keeping them in one team is not tidiness, it is the cheapest way to keep a single definition of what a therapy session is.',
    ],
  },
];

const evidence: CaseEvidence[] = [
  {
    value: '23+',
    label: 'health insurance companies cover the cost of the app for their members',
    source: 'medicalmotion.com',
    href: 'https://medicalmotion.com/en/about-us',
  },
  {
    value: '5+',
    label: 'published studies on effectiveness and patient satisfaction, the first in 2022',
    source: 'medicalmotion.com',
    href: 'https://medicalmotion.com/en/about-us',
  },
  {
    value: '4.8',
    label: 'average rating on the German App Store, in the Medicine category',
    source: 'apps.apple.com',
    href: 'https://apps.apple.com/de/app/medicalmotion-gegen-schmerzen/id1467911407',
  },
  {
    value: '2024',
    label: 'Pain Lab opens on the same data platform, for pain and health services research',
    source: 'medicalmotion.com',
    href: 'https://medicalmotion.com/en/about-us',
  },
];

const facts: CaseFact[] = [
  { label: 'Client', value: 'medicalmotion GmbH, Munich' },
  { label: 'Engagement', value: 'Technology partner — product engineering, continuous since the first version' },
  { label: 'Years', value: '2019 — present', data: true },
  {
    label: 'Credits',
    value: 'Mattia Lorenzutti, technical lead on every version since 2019.',
  },
];

export const medicalmotionEn = {
  title: 'Pain therapy more than 23 insurers pay for.',
  intro:
    'medicalmotion is a Munich digital health company. Its app treats chronic pain with physiotherapy, breathing and meditation, adapted to the patient’s own pain profile — and German and Swiss health insurers reimburse it. We have built the technology since the first web version in 2019.',
  meta: 'medicalmotion GmbH · Munich · Technology partner since 2019',

  situation: {
    title: 'Where it started',
    body: [
      'Sven and Tobias Klimpel founded medicalmotion in Munich in [2017](https://medicalmotion.com/en/about-us), after years of looking for relief from their own pain and not finding it. By 2019 there was a therapy method, two brothers who knew it worked on them, and no product.',
      'The hard part was never the exercises. It was that in Germany a pain app becomes a business the day health insurers reimburse it, and an insurer does not sign because a demo went well. It wants evidence it can read, and it wants its own members handled on its own terms. The first insurer contracts followed in 2020, in Germany and Switzerland, and every architectural decision since has been made under those two pressures: data that has to survive being studied, and an entitlement model that has to absorb one insurer’s three months and another’s six without a release.',
    ],
  },

  decisionsSection: {
    title: 'Three decisions',
    intro:
      'Seven years in, these are the calls that are still paying for themselves.',
  },
  decisions,

  shipped: {
    title: 'What shipped',
    body: [
      'Four things, built and maintained by the same team, and still the shape of the product today.',
    ],
    items: [
      'The patient app — the pain profile, the plan it produces, the physiotherapy sessions, the breathing and meditation work, the pain diary, and the report a patient can take to their own doctor.',
      'The therapist tooling — where the people behind the therapy see what a patient is actually doing and change what happens next.',
      'The personalisation engine — the part that turns one person’s pain profile into one person’s plan, and keeps adapting it as the answers change.',
      'The data platform — what the product writes to and what [Pain Lab](https://medicalmotion.com/en/about-us) reads from.',
    ],
    caption: 'The four things the app does, in medicalmotion’s own words and their own screens.',
  },

  outcome: {
    title: 'Where it got to',
    body: [
      'These are medicalmotion’s outcomes, not ours — what they say about the technology is that it has been in front of insurers, researchers and patients for long enough to be checked by anyone who wants to.',
    ],
  },
  evidence,

  factsSection: {
    title: 'The engagement',
    stackLabel: 'Stack',
  },
  facts,
  stack: ['React', 'Node', 'Google Cloud', 'Health data'],
  factsNote: [
    'One disclosure, because it changes how you should read the rest: Mattia is also publicly listed as a co-founder of medicalmotion and its Head of Product. Camberi is medicalmotion’s engineering team, and one of us has been on the founding side of the table since 2017. It is a client product built by people with skin in it, and that is worth knowing before you weigh the case study.',
  ],

  /* ── The testimonial slot ───────────────────────────────────
     Null until medicalmotion give us a real quote, and it renders
     as nothing at all until then — see `Testimonial` in
     src/components/CaseStudy.tsx. Paste the real words here:
     `quote: { text: '…', name: '…', role: '…', company: 'medicalmotion' }`
     and put the same person’s words, in the language they said
     them in, in copy.es.ts. Do not write one for them. */
  quote: null as CaseQuote | null,

  cta: {
    title: 'Regulated, long-lived, and somebody else’s health data?',
    body: 'That is the kind of work we have been doing since 2019. Tell us what you are building and we will tell you what it will take.',
    primary: 'Start a project',
    secondary: 'See the rest of the work',
  },
};

export type MedicalmotionCopy = typeof medicalmotionEn;
