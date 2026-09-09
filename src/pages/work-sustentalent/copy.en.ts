import type { CaseQuote, CaseDecision, CaseEvidence, CaseFact } from '../../components/CaseStudy';

/* English copy for /work/sustentalent/.

   What is on this page is what the product does and how it is built. What is
   deliberately not on it is the client's business: registered candidates,
   live vacancies, company records, applications. Those are SustenTalent's
   numbers to publish, and publishing a client's figures without being asked
   is not ours to do — so the argument is made with the mechanism instead,
   which is the part we are responsible for anyway.
   ────────────────────────────────────────────────────────────── */

const decisions: CaseDecision[] = [
  {
    title: 'Read the scrape down the employer axis.',
    body: [
      'The weekday scrape exists to fill the board: real vacancies, pulled in, extracted and reviewed before they publish. Read down the posting axis it is a queue of adverts. Read down the employer axis it is a different object entirely — a live list of companies in Spain and Latin America hiring for sustainability right now, each with its site and the week it last posted.',
      'Nobody had to build that list and no cold database sells one like it: an employer with an open vacancy has budget approved and a hiring manager already behind schedule. Same cron, same rows, one more axis to read them on — and the review queue the team already works became the prospect list at the same time.',
    ],
  },
  {
    title: 'Access control belongs in Postgres, not in the application.',
    body: [
      'The backend runs every request as the calling user, and the row-level security policies are the security model. They live in the collections config, shared by the backend and the admin panel, so there is no code path that can forget to apply them and no second implementation to keep in step.',
      'Two properties of RLS then decide the schema rather than the policy file. It is row-level, so any column on a table with a public read policy is public — the board has to render company names, logos and brand colours for a signed-out visitor, so everything commercial about a company lives in a different table from the one the public reads. And an unauthenticated request arrives as the string “anon” rather than as null, which is the kind of detail that lets a guard read correctly and behave wrongly, so the "is this a real user" test is one shared predicate instead of a comparison retyped in every policy.',
    ],
  },
  {
    title: 'Show the next step, not the state.',
    body: [
      'The first version of the admin had status columns. Every pipeline sat at its first value — not because nobody was working, but because updating a status is work that helps nobody who is doing the work, and it is the first thing to go on a busy day. A status column is what somebody declared; it is not what happened.',
      'So the queues were rebuilt to derive their instruction from the data: what has to happen next to this employer, this candidate, this conversation, worked out from what is actually recorded. The panel opens on a list of next steps, ordered so that an employer who wrote to us outranks one we found by scraping. It is more work to build than a status field, and it is the difference between a panel that reports the work and a panel the work is done in.',
    ],
  },
];

const evidence: CaseEvidence[] = [
  {
    value: 'Live',
    label: 'the public board, in Spanish, rendered for anyone signed out',
    source: 'sustentalent.com',
    href: 'https://sustentalent.com',
  },
];

const facts: CaseFact[] = [
  { label: 'Client', value: 'SustenTalent — sustainability and ESG hiring, Spain and Latin America' },
  {
    label: 'Engagement',
    value: 'Product build — public site, backend, admin panel and infrastructure',
  },
  { label: 'Years', value: '2026 — present', data: true },
  {
    label: 'Credits',
    value: 'Francesco Gatti — the whole build: site, backend, admin panel, database and infrastructure.',
  },
];

export const sustentalentEn = {
  title: 'The same scrape fills the board and the sales pipeline.',
  intro:
    'SustenTalent is a job board and talent marketplace for sustainability and ESG roles in Spain and Latin America. It sells career services to candidates and recruiting to employers, and the whole operation — vacancies, employers, candidates, a shared mailbox — is run by a small team out of one admin panel.',
  meta: 'SustenTalent · Spain and Latin America · Built and running since 2026',

  situation: {
    title: 'Where it started',
    body: [
      'A job board is cold at both ends. No vacancies, no candidates; no candidates, no employers worth calling. SustenTalent had a real niche — sustainability and ESG hiring, in Spanish, across Spain and Latin America — and the same two-sided problem as everybody else in that business.',
      'The constraints were the interesting part. The operation is run all day, in Spanish, by a small team against real people who are waiting, so anything that needed a person to keep a record up to date would quietly stop being true. The public board has to work signed out, which makes "who can read what" a schema question rather than a later feature. And there was one repository, three deployables and one engineer building all of them — which rules out any design where two of the three have to move together.',
    ],
  },

  decisionsSection: {
    title: 'Three decisions',
    intro:
      'One of them produced an asset nobody paid to build. The other two are why the panel still tells the truth on a busy week.',
  },
  decisions,

  shipped: {
    title: 'What shipped',
    body: [
      'Three deployables out of one repository, and one CI run that typechecks all of them.',
    ],
    items: [
      'The public board — Astro, with React islands only where the page has to do something. It renders for a signed-out visitor, which is a requirement rather than an optimisation.',
      'The backend and the admin panel — Rebase on Cloud Run, against Cloud SQL Postgres, serving both the data plane and the panel the team lives in.',
      'Derived queues — vacancies to review, employers to contact, candidates to answer — each ordered by what deserves attention rather than by when it arrived.',
      'Weekday crons: scrape vacancies, enrich the company behind each posting, retire postings that have gone stale, poll the mailbox.',
      'A shared mailbox that sends and receives inside the panel over SMTP and IMAP, and deliberately does not delete, archive or mark anything read in the team’s own Gmail. An integration that reaches into somebody’s inbox is one they turn off.',
      'Drafting, not sending. A model extracts the detail out of a job posting and writes the first version of an email; a person decides whether it goes. Nothing is sent, linked or filed that somebody did not choose.',
    ],
    alt: 'The SustenTalent job board: sustainability and ESG vacancies, each with the company behind it',
    caption: 'sustentalent.com — the public board, which is also where the scrape ends up.',
  },

  differently: {
    title: 'What we would do differently',
    body: [
      'One rule on this product is absolute: a candidate is never linked to a vacancy they did not apply to. We wrote it down after shipping a matching feature that broke it, and that feature was deleted rather than softened.',
      'Deleting it was right. Writing the rule down before building would have been cheaper, and the lesson was not about matching: the constraints that decide whether a feature may exist at all cost an afternoon to write down beforehand and a fortnight to discover afterwards. A person choosing which candidates to name in an email they are writing is still allowed — that is a choice somebody made. A system proposing the link is not.',
    ],
  },

  outcome: {
    title: 'Where it got to',
    body: [
      'SustenTalent’s own figures — candidates registered, vacancies live, companies on the list — are the client’s to publish, not ours. What can be judged from outside is the machinery: the board refreshes on a weekday cron, the company behind each posting is filled in without anyone typing it, the mailbox stays in step in both directions, and the panel opens on what to do next rather than on a status board somebody has to maintain.',
      'The prospect list, the part that started as a side effect, is now the part of the product a competitor would have to build a job board to copy.',
    ],
  },
  evidence,

  factsSection: {
    title: 'The engagement',
    stackLabel: 'Stack',
  },
  facts,
  stack: ['Astro', 'React', 'Rebase', 'Cloud Run', 'Cloud SQL Postgres', 'Firebase Hosting'],
  factsNote: [
    'Rebase, the backend this runs on, is [our own](https://rebase.pro) and open source — which is why the access rules are enforced by Postgres rather than by middleware, and why nobody needs us in order to keep running it.',
  ],

  /* ── The testimonial slot ───────────────────────────────────
     Null until SustenTalent give us a real quote, and it renders
     as nothing at all until then — see `Testimonial` in
     src/components/CaseStudy.tsx. Paste the real words here:
     `quote: { text: '…', name: '…', role: '…', company: 'SustenTalent' }`
     and put the same person’s words, in the language they said
     them in, in copy.es.ts. Do not write one for them. */
  quote: null as CaseQuote | null,

  cta: {
    title: 'Is there an operation that only stays true while somebody updates it?',
    body: 'That is usually the thing worth automating. Tell us what it is, and we will tell you what it would take.',
    primary: 'Start a project',
    secondary: 'See the rest of the work',
  },
};

export type SustentalentCopy = typeof sustentalentEn;
