import type { ServiceCopy } from '../services/service';

/* English copy for /services/architecture-review/.

   Search intent: "software architecture review" — a CTO before a rewrite,
   a non-technical founder who cannot judge the estimates, a buyer doing
   technical diligence. The distinguishing facts are the shape (two weeks,
   fixed price, a written plan) and that the document is deliberately
   written to be executed without us. */

export const architectureReviewEn: ServiceCopy = {
  title: 'Two weeks, and a written plan your own team can act on.',
  intro:
    'A software architecture review with a fixed scope: we read your stack properly, then hand you a document that ranks what is wrong by what it is costing you.',
  meta: 'Fixed price, 2 weeks · the document is yours whether or not you hire us afterwards',

  lead: [
    'This is the cheapest way to find out whether you need us at all, and it is a real deliverable rather than a sales call with slides. Two weeks: we read the code, the data model, the infrastructure and the deploy path, talk to the people who work in it every day, and write down what we find.',
    'What you get back is a document in plain language — one your CTO and your board can both read — with the findings ranked by what they cost you rather than by how interesting they are, and a plan in three horizons. It is written so your own engineers can execute it without us, because most of the time that is the correct outcome.',
    'The other three engagements here — [automation](__AUTOMATION__), [building the product](__PRODUCT__), and [the data platform](__DATA_PLATFORM__) — often start here, but none of them has to.',
  ],

  fit: {
    title: 'Who this is for.',
    intro: 'Two weeks is not long, which is what makes the entry criteria matter.',
    forTitle: 'A good fit',
    for: [
      'A CTO who wants a second opinion before committing to a rewrite, a migration or a hiring plan, from someone with no stake in the answer.',
      'A founder without an engineering background who has inherited a codebase and cannot tell whether the estimates coming out of it are honest.',
      'A board or an investor who wants a technical read on a company before signing something.',
      'A team that already knows what is wrong and needs it written down by someone from outside so it can be prioritised against everything else.',
      'You are about to spend a lot on engineering and would like to know first which part of the money is going to be wasted.',
    ],
    notTitle: 'Not a good fit',
    not: [
      'You want the document to confirm a decision that has already been made. We will write what we find, and if that is inconvenient it is still what you get.',
      'You cannot give us read access to the repository and an hour each with two or three of the engineers who work in it. Without those, a review is an educated guess and not worth buying.',
      'There is no code yet. There is nothing to review — start with [building the product](__PRODUCT__) instead, where the first week is a scoping session anyway.',
      'You need a formal security audit, a penetration test or a certification. This is an engineering review by engineers; those are regulated exercises with their own specialists.',
      'You want a fixed price for the fixes at the end of it. The plan says what the work is; estimating it properly is the first thing the plan makes possible, not something the review pre-empts.',
    ],
  },

  problems: {
    title: 'What usually prompts one of these.',
    intro: 'Six arguments that a document from outside settles faster than another meeting.',
    items: [
      {
        title: 'The rewrite argument',
        body: 'Half the team wants to rebuild, the other half wants to refactor, and nobody has written down what the rebuild would actually cost or what it would buy. The argument runs again every quarter and nothing moves.',
      },
      {
        title: 'Estimates that keep slipping',
        body: 'Every feature takes three times as long as it should and nobody outside the team can say why. Usually there is a specific reason, it is structural, and it is visible in a week of reading.',
      },
      {
        title: 'The cost line growing faster than usage',
        body: 'The infrastructure bill is rising and nobody can point at what is driving it. This is one of the few findings that pays for the review outright.',
      },
      {
        title: 'The bus factor',
        body: 'One person knows how the deploy works, or why that service exists. Everyone knows it is a risk; nobody has ever put a number on it or a plan against it.',
      },
      {
        title: 'The scaling question you cannot answer',
        body: 'What happens at ten times the traffic, and which part gives first. Guessing is expensive in both directions — over-building costs money now, under-building costs a weekend later.',
      },
      {
        title: 'Diligence before a deal',
        body: 'Somebody is about to buy, invest in or merge with a codebase, and needs a technical read that is not written by the people who built it.',
      },
    ],
  },

  deliverables: {
    title: 'What you get.',
    intro: 'One document and one conversation. Both are yours; neither depends on hiring us.',
    items: [
      {
        title: 'A written document, in plain language',
        body: 'Written to be read by a CTO and by a board member, without two versions. Jargon appears where it is load-bearing and is explained where it is not.',
      },
      {
        title: 'Findings ranked by cost',
        body: 'Ordered by what each one is costing you in money, in time or in risk — not by how interesting it was to find. The order is the most useful part of the document.',
      },
      {
        title: 'A plan in three horizons',
        body: 'This month, this quarter, this year: what to do, roughly what it takes, and what each one buys. Written so your own engineers can pick it up and start.',
      },
      {
        title: 'The risks we would not ignore',
        body: 'Named individually, with what happens if you do ignore them. Short list, deliberately — a list of forty risks is a way of having no opinion.',
      },
      {
        title: 'Numbers where they exist',
        body: 'Build times, bundle sizes, query plans, the cost breakdown. Where something can be measured we measure it rather than describing it, because a number survives a disagreement and an adjective does not.',
      },
      {
        title: 'What is working',
        body: 'Explicitly. A review that only lists problems gives you no way to tell which decisions to keep, and teams deserve to know which parts of their work were right.',
      },
      {
        title: 'A read-out call with your team',
        body: 'We walk through the document with the engineers, not only with whoever commissioned it, and answer the objections in the room. Some findings change in that call.',
      },
    ],
  },

  running: {
    title: 'How the two weeks run.',
    intro: 'Calendar time, not effort spread over a quarter. It starts on an agreed Monday and the document arrives on the second Friday.',
    steps: [
      {
        label: 'Days one and two',
        title: 'Access and context',
        body: 'Read access to the repository, whatever documentation exists, and an hour each with two or three engineers. What you are trying to do commercially matters as much as the code.',
      },
      {
        label: 'Days three to six',
        title: 'The reading',
        body: 'The code, the data model, the access rules, the infrastructure, the deploy path, the dependencies and the monitoring. This is the bulk of the work and it is unglamorous.',
      },
      {
        label: 'Days seven and eight',
        title: 'The measuring',
        body: 'Build times, query plans, bundle sizes, the cost breakdown — whatever can be turned from an opinion into a number in the time available.',
      },
      {
        label: 'Days nine and ten',
        title: 'Writing, then the read-out',
        body: 'The document is written, sent, and then walked through with your team. You own it from the moment it is sent.',
      },
    ],
  },

  proof: {
    title: 'Why our reading is worth two weeks of your budget.',
    intro:
      'Because it is the same reading we do on our own code before a breaking change, and ours has been in production for six years.',
    evidence: [
      {
        value: '6 yrs',
        label: 'FireCMS in production, merged into every week since 2020',
        source: 'github.com/firecmsco/firecms',
        href: 'https://github.com/firecmsco/firecms',
      },
      {
        value: '3.7k',
        label: 'commits in public from one of us, on FireCMS alone',
        source: 'github.com/fgatti675',
        href: 'https://github.com/fgatti675',
      },
      {
        value: '23+',
        label: 'German and Swiss health insurers reimburse a product we have built since 2019',
        source: 'medicalmotion.com',
        href: 'https://medicalmotion.com',
      },
    ],
    body: [
      'Every judgement in one of these documents comes from having had to live with the equivalent decision. We have shipped migrations across thousands of live FireCMS installs without breaking them, and we have built the technology behind [medicalmotion](__MEDICALMOTION__) since 2019 — a product where the questions come from insurers and reviewers, not only from users.',
      'That is also why the review is not a sales instrument. The question it answers is not “can we build this?” but “who is going to be maintaining this in four years, and will they curse us?” — and quite often the honest answer is that your own team can do the work, which is what the document is written for.',
    ],
  },

  faq: {
    title: 'Questions we get asked.',
    intro: 'Including the one about whether we are just going to sell you a rewrite.',
    items: [
      {
        q: 'What do you need from us?',
        a: 'Read access to the repository, an hour each with two or three engineers who work in it, and access to whatever monitoring and billing exists. Documentation is welcome and rarely decisive.',
      },
      {
        q: 'Do we have to hire you afterwards?',
        a: 'No, and the document is written on the assumption that you will not. It is a plan for your own team, in your own team’s hands. If you do want us to execute part of it, that is a separate engagement with its own scope.',
      },
      {
        q: 'Are you going to tell us to rewrite everything?',
        a: 'Usually not. A rewrite is the most expensive answer available and it is right less often than it is proposed. Where it is right, the document says what it would cost and what it would buy, so the decision is made on numbers rather than on frustration.',
      },
      {
        q: 'Is two weeks calendar time or effort?',
        a: 'Calendar. It starts on an agreed Monday and the document arrives on the second Friday. The work is concentrated in the first week and a half; the last two days are writing and the read-out.',
      },
      {
        q: 'Will you sign an NDA?',
        a: 'Yes, before we are given access to anything. Send yours or ask us for one.',
      },
      {
        q: 'What if we disagree with a finding?',
        a: 'The read-out call is for exactly that, and some findings do change there — your engineers know things the code does not say. What we will not do is remove a finding because it is awkward.',
      },
    ],
  },

  cta: {
    body: 'Tell us what you are about to decide and what makes you unsure. Two paragraphs is enough to say whether a review is the right purchase or whether you already know the answer.',
  },

  related: {
    title: 'The other three ways in.',
    intro: 'Every engagement here starts with a fixed scope and a milestone plan.',
  },
};
