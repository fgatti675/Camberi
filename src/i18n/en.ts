/* The English source of truth. `es.ts` is typed against this object, so a
   missing or misspelled key fails the build rather than silently falling
   back to English at runtime. */
export const en = {
  htmlLang: 'en',
  localeName: 'English',
  otherLocaleName: 'Español',

  nav: {
    work: 'Work',
    services: 'Services',
    openSource: 'Open source',
    team: 'Team',
    cta: 'Start a project',
    toggleMenu: 'Toggle menu',
    switchLanguage: 'Cambiar a español',
  },

  hero: {
    titleTop: 'We build software',
    titleBottom: 'that earns its keep.',
    intro:
      'A product engineering studio in Madrid. For over a decade we’ve built and shipped our own products — like FireCMS and Rebase — and we bring that same depth to yours.',
    primary: 'Start a project',
    secondary: 'See our work',
  },

  logoWall: {
    caption: 'Teams shipping products on software we wrote',
  },

  thesis: {
    eyebrow: 'Why us',
    title: 'We don’t hand it over and disappear.',
    p1: 'Most agencies ship a v1 and move on. We have never had that luxury — we build our own products too, and we are still running them.',
    p2: 'FireCMS has been in production since 2020. Every schema we got wrong, every migration we had to ship without breaking thousands of live installs, every issue answered in public at midnight: we paid for those lessons on our own time.',
    p3: 'It changes the questions you ask. Not “can we build this?” — almost anyone can build it — but “who is going to be maintaining this in four years, and will they curse us?”',
    p4: 'That is what you are actually hiring. Not capacity. Judgement about the decisions that get expensive later.',
    stats: [
      { value: '6 yrs', label: 'FireCMS in production, still shipping every week' },
      { value: '22k', label: 'installs a month across our npm packages' },
      { value: '23+', label: 'health insurers reimburse a product we built' },
      { value: '6', label: 'products of our own, all of them still running' },
    ],
  },

  work: {
    eyebrow: 'Selected work',
    title: 'Products in production. Not case studies in a deck.',
    intro:
      'You can read about how we work, or you can go and use what we built. Everything below is live right now.',
    visit: (name: string) => `Visit ${name}`,
    alsoTitle: 'Also built and running',
    alsoNote:
      'Plus a decade of consulting for product teams across Europe — from the first architecture call to the rescue mission six months after launch.',

    medicalmotion: {
      kicker: 'Client product · Digital health · Munich',
      lead: 'AI-guided pain therapy that doctors prescribe and insurers pay for.',
      body: 'We’ve built the technology behind medicalmotion since its first web version — the patient app, the therapist tooling, the personalisation engine, and the data platform behind their Pain Lab research. Medical data, German healthcare regulation, published clinical outcomes. The kind of product where a wrong architectural call isn’t a sprint you can redo.',
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
      stack: ['TypeScript', 'React', 'Firebase', 'MongoDB'],
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

    dataki:
      'Connect a database, ask a question in plain English, get a real dashboard — SQL included. BigQuery, Postgres, MySQL, Sheets.',
    unbrand:
      'Point it at any website and it generates a brand book: colour ramps, contrast-checked pairings, type scale, spacing tokens. With an API.',
    neat: 'A WebGL gradient engine and editor — and the background of the page you are reading. 12k installs a month.',
    dadaki:
      'A complete vector design tool that runs entirely in the browser. No install, no server round-trip, no plugin.',
  },

  engagements: {
    eyebrow: 'How to work with us',
    title: 'Six ways in. All of them scoped.',
    intro:
      'Every engagement starts with a fixed scope, a milestone plan and a price — not a discovery phase that bills for three months.',
    unsure: 'Not sure which one you need? Neither are most people.',
    unsureCta: 'Tell us what’s stuck',
    items: [
      {
        title: 'Build the product',
        description:
          'Zero to production, or the rewrite that finally scales. Design, frontend, backend and infrastructure owned by one team, so nothing falls between vendors.',
        scope: 'Typically 3–6 months',
      },
      {
        title: 'Regulated & health-tech engineering',
        description:
          'Products where the data is medical, the market is European and the architecture has to survive scrutiny. We have been doing exactly this, in German healthcare, since 2019.',
        scope: 'Typically 2–4 months',
      },
      {
        title: 'Data platform & Postgres',
        description:
          'Schema design, painful migrations, row-level security, admin tooling — and getting off a managed backend you have outgrown without a weekend of downtime.',
        scope: 'Typically 3–8 weeks',
      },
      {
        title: 'AI features that actually ship',
        description:
          'LLM features, agents, retrieval and MCP integrations built to run in production — with evaluation, cost control and a fallback for the day the model is wrong.',
        scope: 'Typically 4–10 weeks',
      },
      {
        title: 'FireCMS & Rebase implementation',
        description:
          'Custom collections, components and integrations from the people who wrote the framework, plus ongoing enterprise support.',
        scope: 'Typically 1–4 weeks',
      },
      {
        title: 'Architecture review',
        description:
          'Two weeks, a senior read on your stack, and a written plan your own team can act on. The cheapest way to find out whether you need us at all.',
        scope: 'Fixed price, 2 weeks',
      },
    ],
  },

  process: {
    eyebrow: 'How we work',
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

  openSource: {
    eyebrow: 'Open source',
    title: 'Everything we know, in public.',
    p1: 'Thousands of developers install our tools every month, and every decision we have made is sitting in a public commit history — along with the ones we had to walk back.',
    p2: 'Six years of answering issues in the open is six years of mistakes we will not repeat inside your codebase.',
    cta: 'Explore our GitHub',
    repos: {
      firecms: {
        description:
          'The headless CMS and admin panel for Firebase and MongoDB. Started in 2020, still merged into every week.',
        meta: '1.3k stars · 220 forks · TypeScript',
      },
      rebase: {
        description:
          'REST, auth, storage, realtime and an admin panel generated from a Postgres schema you already own.',
        meta: 'Open source · Self-hosted · Postgres',
      },
      neat: {
        description:
          'The WebGL gradient engine rendering the background of this page. Three.js under the hood, one npm install on top.',
        meta: '12k installs a month · Three.js',
      },
    },
  },

  team: {
    eyebrow: 'The people',
    title: 'Who you will be working with.',
    intro:
      'Three engineers, between Madrid and Munich, who have been building things together for years.',
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
    eyebrow: 'Let’s talk',
    title: 'Tell us what’s stuck.',
    body: 'Most of our work comes from people who already use something we made. The rest starts with an email — two paragraphs about your product and where it is blocked is plenty. We read everything and reply within a business day.',
    book: 'Book a 30-minute call',
    location: 'Madrid · Munich — working across European time zones',
    emailSubject: 'New project enquiry',
    bookSubject: '30-minute call',
    bookBody: 'Hi — I’d like to book a call. Here’s what we’re building and where we’re stuck:\n\n',
  },

  footer: {
    tagline:
      'A product engineering studio. We build software we would still be willing to maintain in six years — because we usually are.',
    studio: 'Studio',
    built: 'What we built',
    connect: 'Connect',
    howWeWork: 'How we work',
    rights: 'All rights reserved.',
    location: 'Madrid · Munich',
  },
};

export type Dict = typeof en;
