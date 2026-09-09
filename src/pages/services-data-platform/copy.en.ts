import type { ServiceCopy } from '../services/service';

/* English copy for /services/data-platform/.

   Search intent: a CTO or lead engineer looking for someone to design a
   Postgres schema, enforce access with row-level security, or move off
   Firebase, Supabase or another managed backend — and, separately, teams
   looking for FireCMS or Rebase implementation. The last of those is the
   one nobody else can claim: we wrote both frameworks. */

export const dataPlatformEn: ServiceCopy = {
  title: 'Postgres you own, and a clean way off the managed backend you have outgrown.',
  intro:
    'Schema design, painful migrations, row-level security and the admin tooling your team actually uses — plus FireCMS and Rebase implementation from the people who wrote the frameworks.',
  meta: 'Typically 1–8 weeks · fixed scope and milestone plan agreed in week one',

  lead: [
    'A managed backend is the right decision at the start and a constraint later. The read bill grows with traffic rather than with value, the query you now need cannot be expressed, and the access rules have become a file that one person understands and nobody wants to touch. None of that is a reason to panic, and all of it is a reason to plan the move rather than discover it during an incident.',
    'This engagement is the data layer: the schema, the migrations, the access rules and the tooling on top. Sometimes that is a two-week piece of work on a Postgres database you already have. Sometimes it is a full move off Firebase or another managed backend, rehearsed on a copy of production before anything is run against the real thing.',
    'It is also the engagement where our own tools are the shortest path. [Rebase](https://rebase.pro) turns a Postgres database you already own into a backend with every access rule enforced by the database itself, and [FireCMS](https://firecms.co) is the admin panel thousands of teams run their back office on. We wrote both, which mostly means we know where their edges are.',
  ],

  fit: {
    title: 'Who this is for.',
    intro:
      'The shortest engagement on this site and the one most often mis-scoped, in both directions.',
    forTitle: 'A good fit',
    for: [
      'Your data is in Firebase, Supabase or another managed backend and you have hit a wall: a query you cannot write, a cost line that scales with reads, or security rules nobody can reason about any more.',
      'You already run Postgres and the schema has grown by accretion — three tables that all mean “user”, columns nobody dares drop, and a migration everybody is afraid to run.',
      'You need access control that survives a mistake in application code, which in practice means row-level security rather than a check in every endpoint.',
      'You are running FireCMS or Rebase, or considering them, and want them set up against a real schema rather than a demo one.',
      'Your operations team opens the database directly, or waits for an engineer, because there is no admin panel they can use.',
    ],
    notTitle: 'Not a good fit',
    not: [
      'One slow query. That is a support ticket, not an engagement, and you will get a better answer faster from whoever knows the codebase.',
      'A move to Postgres because it is the fashionable answer, when the managed backend is working fine and the real problem is somewhere else. Migrations cost real weeks.',
      'A warehouse, dbt models and a BI practice. We build the operational database and the tooling on it; the analytics stack is a different specialism and we would be the second-best people to call.',
      'A migration that has to be finished by a date already announced to customers, with no rehearsal window. The cutover is the cheap part; proving the data arrived intact is not.',
      'You want the schema designed but the application left alone. Roughly half of a migration is the code that talks to the old backend, and pretending otherwise produces a plan that misses by a factor of two.',
    ],
  },

  problems: {
    title: 'What this usually looks like when you arrive.',
    intro: 'Six shapes. Most engagements here are two or three of them at once.',
    items: [
      {
        title: 'The managed backend you have outgrown',
        body: 'The bill scales with reads instead of with value, the aggregate you need is three round trips, and the security rules are a file that grew a clause per feature. The product is fine. The floor under it has stopped fitting.',
      },
      {
        title: 'The schema that grew by accretion',
        body: 'Nullable columns nobody can remove, three tables that all mean “user”, and foreign keys that exist in the application’s head rather than in the database. Every new feature pays interest on it.',
      },
      {
        title: 'Access rules enforced in application code',
        body: 'Every new endpoint is a fresh chance to return somebody else’s row. Row-level security moves the rule into the database, where it applies to every client — including the script somebody runs by hand at month end.',
      },
      {
        title: 'The migration with no downtime window',
        body: 'A weekend of downtime is not on offer, and nobody has rehearsed the cutover. The shape that works is dual-write, backfill, verify, switch, with a rollback that has been run at least once on a copy.',
      },
      {
        title: 'The admin panel nobody can use',
        body: 'Operations either open the production database directly — which is how a row gets deleted at 18:00 on a Friday — or file a ticket and wait. A generated admin panel with real roles is days of work, not months.',
      },
      {
        title: 'Multi-tenancy decided by accident',
        body: 'One database per customer, or a tenant column enforced by convention, chosen early by whoever wrote the first migration. It is the decision that most reliably becomes expensive, and it is worth an afternoon of argument now.',
      },
    ],
  },

  deliverables: {
    title: 'What you get.',
    intro: 'Written artefacts, because this is the engagement whose output most needs to outlive us.',
    items: [
      {
        title: 'A written scope',
        body: 'In week one, after reading what you actually have rather than what the documentation says: what moves, in what order, and what stays where it is.',
      },
      {
        title: 'The target schema, written down',
        body: 'Tables, keys, indexes and the reasoning, plus the migrations that get you from today’s to that. Readable by your own engineers, because they are the ones who will extend it.',
      },
      {
        title: 'A row-level security policy set',
        body: 'The rules in the database, and the tests that prove a user of one tenant cannot read another’s rows. A policy without a test proving it denies something is a comment.',
      },
      {
        title: 'A rehearsed cutover plan',
        body: 'Dual-write, backfill, verification queries, the switch, and a rollback — run end to end against a copy of production before it is run against production.',
      },
      {
        title: 'The admin panel, configured',
        body: 'FireCMS or Rebase against your real schema, with the roles your team actually has, so operations stop opening the database directly.',
      },
      {
        title: 'A staging URL from day one, and a Friday demo',
        body: 'Same as every engagement here. On a migration the demo is usually a verification query, which is exactly the right thing to be looking at together.',
      },
      {
        title: 'Backups you have restored',
        body: 'A backup nobody has restored is a hope. Part of the handover is watching a restore work, once, on your infrastructure.',
      },
      {
        title: 'The repo, the infrastructure and the accounts',
        body: 'In your name, documented, with a runbook for the operational parts. Rebase is open source and self-hosted, so there is no vendor to be left holding.',
      },
    ],
  },

  running: {
    title: 'How it runs.',
    intro:
      'A one-week schema review and an eight-week migration are the same four movements at different lengths.',
    steps: [
      {
        label: 'Week one',
        title: 'Read what is there',
        body: 'The schema as it is, the access rules as they are, the queries that actually run and the bill. You get that back in writing before anyone proposes anything.',
      },
      {
        label: 'Next',
        title: 'Target and path',
        body: 'The schema you want, the migrations that reach it, and the cutover plan — rehearsed against a copy of production rather than argued about in a document.',
      },
      {
        label: 'The move',
        title: 'Dual-write, backfill, verify',
        body: 'The new system runs alongside the old one and the two are compared on real data. Nothing is switched off until the verification queries agree.',
      },
      {
        label: 'Last',
        title: 'Tooling and handover',
        body: 'The admin panel against the real schema, a restore you have watched work, the runbook, and a session with the people who will run it.',
      },
    ],
  },

  proof: {
    title: 'We wrote the frameworks.',
    intro:
      'Two of the tools this engagement uses are ours, in public, with the commit history and the install counts to check.',
    evidence: [
      {
        value: '1.3k',
        label: 'stars on FireCMS, the admin panel we have maintained since 2020',
        source: 'github.com/firecmsco/firecms',
        href: 'https://github.com/firecmsco/firecms',
      },
      {
        value: '9k',
        label: 'installs a month of FireCMS from npm',
        source: 'npmjs.com/package/@firecms/core',
        href: 'https://www.npmjs.com/package/@firecms/core',
      },
      {
        value: 'RLS',
        label: 'Rebase enforces every access rule in Postgres rather than in middleware you have to trust',
        source: 'rebase.pro',
        href: 'https://rebase.pro',
      },
    ],
    body: [
      '[Rebase](https://rebase.pro) is our Postgres backend: point it at a database you already own and you get REST, auth, storage, realtime and a generated admin panel, with every access rule enforced by row-level security rather than by middleware. Open source, self-hosted, and built for teams who would rather not hand production data to somebody else’s managed instance.',
      '[SustenTalent](__SUSTENTALENT__) is that stack in production — an Astro site with React islands, a Rebase backend on Cloud Run, Cloud SQL Postgres underneath, and access control enforced by the database rather than by application code. Public site, backend and admin panel out of one repository.',
      'If what you are describing is really a whole product rather than its data layer, the [product engagement](__PRODUCT__) is the right shape. If you are not yet sure the move is worth making, the [architecture review](__REVIEW__) answers that in two weeks and in writing.',
    ],
  },

  faq: {
    title: 'Questions we get asked.',
    intro: 'Mostly about migrations, and mostly the same five.',
    items: [
      {
        q: 'Do we have to use Rebase or FireCMS?',
        a: 'No. They are the tools we wrote, so we know their edges better than anyone, but plain Postgres with an admin you already have is often the right answer and we will say so. The frameworks are open source either way — nothing here depends on you buying anything from us.',
      },
      {
        q: 'Can you get us off Firebase without downtime?',
        a: 'Usually, yes. The shape is dual-write, backfill, verify, cut over, with a rollback rehearsed on a copy first. How long it takes depends far less on the data than on how much business logic ended up inside security rules and cloud functions — which is the first thing we read.',
      },
      {
        q: 'Does our data have to leave where it is now?',
        a: 'Only if you want it to. This runs on your infrastructure and your accounts; Rebase is self-hosted, so the database stays in the region and under the provider you choose. Where that region has to be is usually a legal question, and it is worth settling in week one.',
      },
      {
        q: 'What happens to the application code that talks to the old backend?',
        a: 'It is in scope, and it is generally the larger half. A migration plan that only covers the data is the most common way these projects come in at twice the estimate.',
      },
      {
        q: 'Why row-level security rather than checks in the API?',
        a: 'Because the rule then applies to every client, including the ones written later and the script somebody runs by hand at month end. Checks in application code are correct until the day somebody adds an endpoint and forgets one — and that day arrives.',
      },
      {
        q: 'Can you just review the schema and leave us to it?',
        a: 'Yes, and for a lot of teams that is the right purchase: the [architecture review](__REVIEW__) is two weeks and ends in a written plan your own engineers can execute without us.',
      },
    ],
  },

  cta: {
    body: 'Tell us what the database is, what it is doing that it should not, and what you are afraid will break. Two paragraphs is enough to say whether this is two weeks or two months.',
  },

  related: {
    title: 'The other three ways in.',
    intro: 'Every engagement here starts with a fixed scope and a milestone plan.',
  },
};
