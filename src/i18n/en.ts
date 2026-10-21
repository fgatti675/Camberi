/* The English source of truth. `es.ts` is typed against this object, so a
   missing or misspelled key fails the build rather than silently falling
   back to English at runtime. */
export const en = {
  htmlLang: 'en',
  localeName: 'English',
  otherLocaleName: 'Español',

  nav: {
    agents: 'AI agents',
    work: 'Work',
    services: 'Services',
    team: 'Team',
    cta: 'Start a project',
    toggleMenu: 'Toggle menu',
    switchLanguage: 'Cambiar a español',
  },

  /* The scroll spine in the left margin. Short enough to sit in a
     narrow rail without wrapping. */
  spine: {
    agents: 'AI agents',
    work: 'Work',
    services: 'Services',
    process: 'How we work',
    team: 'Team',
    contact: 'Contact',
  },

  hero: {
    titleTop: 'Software that does',
    titleBottom: 'the work for you.',
    intro:
      'AI agents and automation, built to keep running in production. For over a decade we’ve shipped and maintained our own products — like FireCMS and Rebase — and we bring that same depth to yours.',
    primary: 'Start a project',
    secondary: 'See our work',
    scrollCue: 'Scroll',
  },

  logoWall: {
    caption: 'Teams shipping products on software we wrote',
  },

  /* ── Agents ────────────────────────────────────────────────────
     Why a studio known for admin panels and Postgres is the right one
     to build agents: everything that makes an agent safe to run is
     the part we have been building for years. Every claim below is
     one the automation service page already makes in detail. */
  agents: {
    title: 'The hard part of an agent isn’t the model.',
    intro: 'It’s what it can touch, who checks it, and what happens when it’s wrong.',
    items: [
      {
        title: 'Access below the prompt',
        body: 'Permissions enforced by the database, not by asking nicely.',
      },
      {
        title: 'A person where it matters',
        body: 'Review queues and an audit trail your team can actually use.',
      },
      {
        title: 'Measured',
        body: 'An evaluation set from your own cases, and a cost per run.',
      },
      {
        title: 'A plan for when it’s wrong',
        body: 'A safe fallback, decided before it goes live.',
      },
    ],
    cta: 'How we build agents',
  },

  work: {
    title: 'Products in production. Not promises in a deck.',
    intro:
      'You can read about how we work, or you can go and use what we built. Everything below is live right now.',
    visit: (name: string) => `Visit ${name}`,
    /* Shown only on the two projects that have a page of their own. */
    caseStudy: 'Read the case study',
    alsoTitle: 'Also built and running',
    alsoNote:
      'Plus a decade of consulting for product teams across Europe — from the first architecture call to the rescue mission six months after launch.',

    medicalmotion: {
      kicker: 'Client product · Digital health',
      lead: 'AI-guided pain therapy that doctors prescribe and insurers pay for.',
      body: 'We’ve built the technology behind medicalmotion since its first web version — the patient app, the therapist tooling, the personalisation engine, and the data platform behind their Pain Lab research. Medical data, German healthcare regulation, published clinical outcomes. The kind of product where a wrong architectural call isn’t a sprint you can redo.',
      cards: [
        'Based on your unique pain profile',
        'AI-supported physiotherapy',
        'Meditation and breathing exercises',
        'Your Health Cockpit',
      ],
      metrics: [
        { value: '23+', label: 'insurers reimburse it' },
        { value: '5+', label: 'published efficacy studies' },
        { value: '2019', label: 'first version we shipped' },
      ],
      stack: ['React', 'Node', 'Google Cloud', 'Health data'],
    },
    firecms: {
      kicker: 'Our product · Open source · Since 2020',
      lead: 'The admin panel thousands of Firebase teams run their back office on.',
      body: 'It started as the internal tool we were tired of rebuilding for every client. Six years later it’s an open-source framework with a hosted cloud on top, used by product teams from health tech to logistics — and we’ve maintained every breaking change, written every docs page and answered every issue ourselves.',
      metrics: [
        { value: '1.3k', label: 'stars on GitHub' },
        { value: '9k', label: 'npm installs a month' },
        { value: '220+', label: 'forks' },
      ],
      stack: ['TypeScript', 'React', 'Firebase'],
    },
    rebase: {
      kicker: 'Our product · Shipping now',
      lead: 'Point it at the Postgres you already own, and get a backend.',
      body: 'REST, auth, storage, realtime and a generated admin panel — with every access rule enforced by Postgres row-level security rather than middleware you have to trust. Built for teams who’d rather not hand production data to somebody else’s managed instance. Open source, self-hosted, European by design.',
      metrics: [
        { value: 'Open', label: 'source, MIT' },
        { value: 'Self', label: 'hosted, your infra' },
        { value: 'RLS', label: 'enforced by Postgres' },
      ],
      stack: ['Postgres', 'TypeScript', 'REST + GraphQL', 'Realtime'],
    },

    sustentalent: {
      kicker: 'Client product · Job board · Spain and Latin America',
      lead: 'A job board that fills its own pipeline.',
      body: 'A marketplace for sustainability and ESG roles, with the recruiting operation that works it built into the same product. A weekday scrape reads real vacancies down the employer axis rather than the posting axis, so the review queue doubles as a live list of companies hiring right now. An enrichment pipeline fills in the company behind each posting, the shared mailbox syncs itself, and the admin derives the next step for every prospect instead of asking anyone to keep a status column up to date.',
      metrics: [
        { value: 'Daily', label: 'vacancy scrape feeding the prospect list' },
        { value: 'RLS', label: 'access enforced by Postgres, not app code' },
        { value: '1 repo', label: 'public site, backend and admin panel' },
      ],
      stack: ['Astro', 'React', 'Rebase', 'Postgres', 'Cloud Run'],
    },

    dataki:
      'Connect a database, ask a question in plain English, get a real dashboard — SQL included. BigQuery, Postgres, MySQL, Sheets.',
    unbrand:
      'Point it at any website and it generates a brand book: colour ramps, contrast-checked pairings, type scale, spacing tokens. With an API.',
    neat: 'A WebGL gradient engine and editor — and the background of the page you are reading. 12k installs a month.',
    dadaki:
      'A complete vector design tool that runs entirely in the browser. No install, no server round-trip, no plugin.',
  },

  engagements: {
    title: 'Three ways in. All of them scoped.',
    intro:
      'Every engagement starts with a fixed scope, a milestone plan and a price — not a discovery phase that bills for three months.',
    axisLabel: 'Weeks',
    unsure: 'Not sure which one you need? Neither are most people.',
    unsureCta: 'Tell us what’s stuck',
    /* Each engagement is now a page of its own under /services/. This is the
       link into it, from the home page list and from the services index. */
    readMore: 'Read more',
    items: [
      {
        title: 'AI agents and automation that survive production',
        weeks: [2, 6],
        description:
          'The spreadsheet re-keyed every Monday, the report assembled from four dashboards, the approval that lives in an inbox. We hand them to agents that keep running without a babysitter — with evaluation, cost control and a fallback for the day the model is confidently wrong.',
        scope: 'Typically 2–6 weeks',
      },
      {
        title: 'Build the product',
        weeks: [6, 12],
        description:
          'Zero to production in weeks, not quarters. Design, frontend, backend and infrastructure owned by one team — including the regulated kind, where the data is medical. We have been doing that in German healthcare since 2019.',
        scope: 'Typically 6–12 weeks',
      },
      {
        title: 'Data platform, Postgres and admin tooling',
        weeks: [1, 4],
        description:
          'Schema design, painful migrations, row-level security, and getting off a managed backend you have outgrown. Plus FireCMS and Rebase implementation from the people who wrote them.',
        scope: 'Typically 1–4 weeks',
      },
    ],
  },

  process: {
    title: 'Senior, transparent, weekly.',
    intro: 'You always know what is being built, why, and what it costs.',
    steps: [
      {
        title: 'Week one',
        desc: 'A working session, not a questionnaire. You leave with a written scope, a milestone plan and a price that does not move.',
      },
      {
        title: 'Prototype early',
        desc: 'Something clickable in your browser within weeks. We would much rather find out an idea is wrong in week two than in month four.',
      },
      {
        title: 'Ship every week',
        desc: 'A live staging URL from day one and a demo every Friday, so nothing about the state of the work is a surprise at the end.',
      },
      {
        title: 'Hand over, or stay',
        desc: 'Your repo, your infrastructure, your accounts, documented. We leave cleanly — or stay on as the team that keeps it alive.',
      },
    ],
  },

  team: {
    title: 'Who you will be working with.',
    intro:
      'Three engineers who have been building things together for years.',
    francesco: {
      role: 'Engineering · FireCMS',
      bio: 'Creator and maintainer of FireCMS, co-author of Rebase. Nearly four thousand commits of it in public, which is a slightly uncomfortable but very honest CV.',
    },
    mattia: {
      role: 'Product & engineering · medicalmotion',
      bio: 'Co-founded Camberi and has led the technology behind medicalmotion since its first version — the patient app, the clinical tooling and the data platform underneath.',
    },
    marian: {
      role: 'Engineering · Rebase',
      bio: 'Co-author of Rebase, the Postgres backend we build in the open, and a contributor to FireCMS. Backend and infrastructure — which is where most products actually break.',
    },
    specialists: {
      title: 'And a short list of specialists',
      body: 'For design, ML or mobile we bring in people we have worked with for years — by name, on the projects that need them.',
    },
  },

  contact: {
    title: 'What would you hand to an agent?',
    body: 'Most of our work comes from people who already use something we made. The rest starts with an email — two paragraphs about the work your team does by hand, or the product that’s stuck, is plenty.',
    book: 'Book a 30-minute call',
    location: 'Working across European time zones',
    emailSubject: 'New project enquiry',
    bookSubject: '30-minute call',
    bookBody: 'Hi — I’d like to book a call. Here’s what we’re building and where we’re stuck:\n\n',
    /* Sits under the two buttons as a plain, checkable promise. */
    reply: 'We read everything and reply within one business day.',
    /* The four steps between the email and a signed scope. Written so a
       reader can tell whether they want the next one before taking this
       one — including the step where the answer is no. */
    next: {
      title: 'What happens next',
      steps: [
        'You write two paragraphs: what you are building, and where it is stuck.',
        'We come back with our first questions — or with a straight no, if this is not work for us.',
        'A 30-minute call about the product, the constraints and the deadline.',
        'A written scope: the milestones, and a price that does not move.',
      ],
    },
  },

  footer: {
    tagline:
      'A product engineering studio for AI agents and automation. We build software we would still be willing to maintain in six years — because we usually are.',
    studio: 'Studio',
    built: 'What we built',
    connect: 'Connect',
    howWeWork: 'How we work',
    log: 'Log',
    legal: 'Legal notice',
    privacy: 'Privacy',
    security: 'Security',
    rights: 'All rights reserved.',
    location: 'Madrid',
  },
};

export type Dict = typeof en;
