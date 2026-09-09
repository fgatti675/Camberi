import type { ServiceCopy } from '../services/service';

/* English copy for /services/product/.

   Search intent: someone who needs a product built and put into
   production by one accountable team — founders without an engineering
   team, and companies whose data is regulated, where "it works" is only
   half the requirement. The medicalmotion work is the strongest thing on
   this site and it belongs here rather than being spread thinly across
   four pages. */

export const productEn: ServiceCopy = {
  title: 'From zero to a product in production — including the regulated kind.',
  intro:
    'Design, frontend, backend and infrastructure owned by one team, so nothing falls between vendors. Health data included: we have been building in German healthcare since 2019.',
  meta: 'Typically 3–6 months · fixed scope and milestone plan agreed in week one',

  lead: [
    'This is the engagement where we build the whole thing. Not a design handed to somebody else to implement, not a backend bolted onto a frontend a different agency wrote — one team accountable for the screens, the data model, the infrastructure and the deploy, from the first working session to the first production release and past it.',
    'It covers the rewrite as well as the greenfield build. The pattern is the same either way: get the data model right early, put something clickable in front of real users within weeks, and ship to a staging URL every week so nothing about the state of the work is a surprise in month four.',
    'And it covers the regulated kind. The product we have built longest is prescribed by doctors and reimbursed by [23 or more German and Swiss health insurers](https://medicalmotion.com) — which means the questions about it come from insurers and reviewers as often as from users, and a wrong architectural call is not a sprint you can redo.',
  ],

  fit: {
    title: 'Who this is for.',
    intro:
      'A long engagement is the wrong shape for a lot of good projects. These are the ones it is the right shape for.',
    forTitle: 'A good fit',
    for: [
      'A founder or a product team with something validated and no engineering team to build it properly.',
      'A v1 built by a contractor or an agency that now costs three times as much to change as it did to write.',
      'A regulated product — health, insurance, finance — where the data model, the access rules and the audit trail matter as much as the interface.',
      'You want one team answerable for design, frontend, backend and infrastructure, rather than three vendors pointing at each other.',
      'Somebody on your side can make product decisions within a day. That, more than anything technical, is what sets the pace.',
    ],
    notTitle: 'Not a good fit',
    not: [
      'Staff augmentation — two developers to sit in your sprints under your own tech lead. We take a scope and are answerable for the outcome; that is a different arrangement and other people do it well.',
      'A specification that is already written, already signed off, and going to whoever bids lowest. We will disagree with parts of the spec, which is most of the value and none of what you asked for.',
      'A native mobile app as the entire product. We bring in mobile specialists we have worked with for years, by name, when a project needs them — but that is a supporting role here, not the main event.',
      'A demo for a deadline, where nothing has to survive past the pitch. Building it to be maintained is the expensive part, and you would be paying for it twice.',
      'You need a certified medical device by a fixed date. We build so certification is possible and we have worked inside that world for years, but the certification process is yours to run and we will not pretend otherwise.',
    ],
  },

  problems: {
    title: 'What this usually looks like when you arrive.',
    intro: 'Five situations, and we have been in all of them — including on our own products.',
    items: [
      {
        title: 'The product that is three vendors deep',
        body: 'Frontend by one supplier, backend by another, infrastructure by a third. Every bug is somebody else’s, every integration is a meeting, and the person paying for all of it is doing the coordination.',
      },
      {
        title: 'The medical-data product that has to survive scrutiny',
        body: 'Where the data lives, who can read it, what is logged, what happens when a patient asks for it back. These questions arrive from insurers, ethics committees and auditors, and they are much cheaper to answer in the schema than in a retrofit.',
      },
      {
        title: 'The rewrite you keep postponing',
        body: 'The current version works and every new feature costs three times what it should. Nobody has written down what the rebuild would actually cost, so the argument runs again every quarter and nothing moves.',
      },
      {
        title: 'The prototype that became production without anyone deciding',
        body: 'No migrations, no staging, no tests, and one person who knows how to deploy it. It is a good sign — it means somebody wanted the thing — and it is a specific piece of work to fix.',
      },
      {
        title: 'The design that nobody could build',
        body: 'A beautiful set of screens produced without an engineer in the room, and now every one of them implies a query the data model cannot answer. Design and engineering in the same team is not a nicety; it is what stops this.',
      },
      {
        title: 'The launch that is fine until the second country',
        body: 'A second language, a second currency, a second regulator, a second tenant. All four are cheap to allow for at the start and expensive to retrofit, and which of them you will actually need is a decision, not a guess.',
      },
    ],
  },

  deliverables: {
    title: 'What you get.',
    intro: 'The same handover every engagement here ends in, at the scale of a whole product.',
    items: [
      {
        title: 'A written scope',
        body: 'Out of a working session in week one, not a questionnaire: what is being built, in what order, and what is explicitly out. A milestone plan and a price come with it, and the price does not move.',
      },
      {
        title: 'Something clickable, early',
        body: 'In your browser within weeks. We would much rather find out an idea is wrong in week two than in month four, and so would you.',
      },
      {
        title: 'A staging URL from day one',
        body: 'Not a screenshot in a slide. Anyone on your side can open the current state of the product at any moment, without asking us.',
      },
      {
        title: 'A demo every Friday',
        body: 'Thirty minutes of the actual thing running. It is also where scope changes get agreed, out loud, instead of accumulating quietly.',
      },
      {
        title: 'A data model you can read',
        body: 'Written down and explained, with the migrations that got there. On a regulated product this is the document that answers most of the hard questions later.',
      },
      {
        title: 'The decisions, recorded',
        body: 'The handful that would be expensive to reverse — the database, the auth model, the hosting region, the multi-tenancy story — with what we chose and what we chose against. Your next engineer inherits the reasoning, not just the result.',
      },
      {
        title: 'A production release, not a delivery',
        body: 'Real users on real infrastructure, with monitoring, backups and a deploy anybody on the team can run. Finishing means it is live, not that it is in a repository.',
      },
      {
        title: 'The repo, the infrastructure and the accounts',
        body: 'In your name, documented. We hand over cleanly — or stay on as the team that keeps it alive. Both are normal; neither is a surprise at the end.',
      },
    ],
  },

  running: {
    title: 'How it runs.',
    intro:
      'Shape, not a Gantt chart. A three-month build and a six-month build have the same four movements; only the middle one gets longer.',
    steps: [
      {
        label: 'Week one',
        title: 'Scope and plan',
        body: 'A working session with the people who know the product and the people who will use it. You leave with a written scope, a milestone plan and a price that does not move.',
      },
      {
        label: 'Weeks two to four',
        title: 'Data model and prototype',
        body: 'The schema first, because it is the decision everything else inherits — then something clickable on top of it, in your browser, on the staging URL.',
      },
      {
        label: 'The long middle',
        title: 'Ship every week',
        body: 'Milestone by milestone, demoed every Friday. On a regulated product the access rules and the audit trail are built here, not added at the end.',
      },
      {
        label: 'Last weeks',
        title: 'Production, then handover',
        body: 'Launch, monitoring, backups, a runbook and a session with whoever inherits it. Or we stay on as the team that keeps it running.',
      },
    ],
  },

  proof: {
    title: 'The product we have built longest.',
    intro:
      'medicalmotion is the answer to “have you done this in a regulated setting?”, and every figure below is on their own site.',
    evidence: [
      {
        value: '23+',
        label: 'German and Swiss health insurers reimburse a product we have built since its first web version',
        source: 'medicalmotion.com',
        href: 'https://medicalmotion.com',
      },
      {
        value: '5+',
        label: 'published efficacy studies behind it',
        source: 'medicalmotion.com',
        href: 'https://medicalmotion.com',
      },
      {
        value: '6 yrs',
        label: 'FireCMS in production, merged into every week since 2020',
        source: 'github.com/firecmsco/firecms',
        href: 'https://github.com/firecmsco/firecms',
      },
    ],
    body: [
      'We have built the technology behind [medicalmotion](__MEDICALMOTION__) since its first web version in 2019 — the patient app, the therapist tooling, the personalisation engine and the data platform behind their Pain Lab research. Doctors prescribe it, insurers reimburse it, and researchers publish on it, which is three different kinds of scrutiny on the same data model.',
      'The second reason to hire a studio rather than a delivery team is that we still run our own products. [FireCMS](https://firecms.co) has been in production since 2020 and every breaking change, every migration across thousands of live installs and every issue answered in public was ours to deal with. That is where the judgement about which decisions get expensive later actually comes from.',
      'If the product you have in mind is closer to a data platform than to an application, the [data platform engagement](__DATA_PLATFORM__) is the shorter way in.',
    ],
  },

  faq: {
    title: 'Questions we get asked.',
    intro: 'Including the two nobody likes asking out loud.',
    items: [
      {
        q: 'Can you take over a codebase somebody else wrote?',
        a: 'Yes, and it is common. We start with the [architecture review](__REVIEW__) rather than an estimate: two weeks of reading it properly, then a written plan. Quoting a takeover before reading the code produces a number that is wrong in one direction or the other.',
      },
      {
        q: 'Do you do the design as well?',
        a: 'Product design, yes — screens, flows, the interface — in the same team as the engineering, which is what stops a design that implies queries the data model cannot answer. For brand, illustration or motion we bring in people we have worked with for years, by name.',
      },
      {
        q: 'What about GDPR and health data?',
        a: 'It shapes the architecture, so it is a week-one conversation. Where the data sits, who can read it, what is logged and how it comes back out are schema decisions before they are policy documents. We have been answering those questions on a product German and Swiss insurers reimburse since 2019. What we do not do is claim a medical-device certification for your product — that is a process you run, and we build so it stays possible.',
      },
      {
        q: 'What if the scope changes halfway through?',
        a: 'It usually does, and the Friday demo is where it gets agreed. A change that fits inside the plan we absorb; one that does not becomes a new milestone with its own scope, agreed before anyone starts it. What does not happen is a quiet reallocation you find out about at the end.',
      },
      {
        q: 'Who actually writes the code?',
        a: 'The people on the team page. For design, ML or mobile we bring in specialists we have worked with for years, named on the projects that need them.',
      },
      {
        q: 'What happens after launch?',
        a: 'Your choice, and it is settled before the last milestone rather than during it. Either a clean handover — repo, infrastructure, accounts, runbook, and a session with whoever inherits it — or we stay on as the team that keeps it alive. Both are normal.',
      },
    ],
  },

  cta: {
    body: 'Two paragraphs about the product and where it is blocked is plenty. If the honest answer is that you need three months of your own team instead, we will say that.',
  },

  related: {
    title: 'The other three ways in.',
    intro: 'Every engagement here starts with a fixed scope and a milestone plan.',
  },
};
