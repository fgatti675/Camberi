import type { ServiceCopy } from '../services/service';

/* English copy for /services/automation/.

   Search intent: an operations, finance or support lead looking for
   someone to automate work their team does by hand — increasingly with a
   model in the loop, and increasingly worried about what happens when the
   model is wrong. Every heading answers a question that reader is actually
   asking, in their words rather than ours.

   Links are `[label](href)` and `__TOKEN__` values come from
   `src/pages/services/service.ts`. No prices, ever — the shape of the
   engagement is fair game, the number is not. */

export const automationEn: ServiceCopy = {
  title: 'The work your team redoes every week, done by software instead.',
  intro:
    'Automation and AI for operations teams: we take the processes people run by hand and build them so they keep running — including the ones with a language model in them.',
  meta: 'Typically 3–10 weeks · fixed scope and milestone plan agreed in week one',

  lead: [
    'Almost every team has a handful of jobs that are done by a person because nobody ever got round to doing them any other way. A spreadsheet re-keyed on Monday morning. A weekly report assembled from four dashboards. An approval that lives in somebody’s inbox and stops when they take a holiday. None of them are hard. All of them are somebody’s Tuesday.',
    'We find the ones worth automating, build them, and leave them running without a babysitter. That includes LLM features and agents — but a model in production is a different object from a model in a demo, so it ships with an evaluation set, a cost per run and a defined fallback for the day it is confidently wrong.',
    'If you are not sure yet which of your processes are worth it, the [architecture review](__REVIEW__) is two weeks and ends in a written plan you can act on without us.',
  ],

  fit: {
    title: 'Who this is for.',
    intro:
      'The honest version, both halves. An automation built on a process nobody has agreed on just freezes the disagreement in code.',
    forTitle: 'A good fit',
    for: [
      'An operations, finance, support or recruiting team that runs the business out of spreadsheets, a shared inbox and three SaaS tools that do not talk to each other.',
      'You can name the process, and somebody can show it to us on their screen in twenty minutes.',
      'It happens often enough that removing it gives a person their week back — daily, weekly, or per customer.',
      'You want a language model in the loop and you need to answer, before it ships, what happens on the cases it gets wrong.',
      'You already have the data somewhere. It is in a database, a spreadsheet, an inbox or an API — not only in somebody’s head.',
    ],
    notTitle: 'Not a good fit',
    not: [
      'The process changes every month and two people describe it differently. Write it down first; automating it now just makes the disagreement permanent.',
      'You want a model trained or fine-tuned from scratch. We integrate models and build the evaluation and the guardrails around them; training one is a different specialism.',
      'The volume is a couple of documents a week. The maintenance will cost more than the manual work, and we will tell you so on the first call.',
      'You want a chat widget on the marketing site. That is a smaller job than this, and it does not need us.',
      'The real blocker is that nobody owns the process. Software does not fix that, and it is usually visible within an hour of watching the work.',
    ],
  },

  problems: {
    title: 'What this usually looks like when you arrive.',
    intro:
      'Nobody goes looking for “workflow automation”. They go looking for the specific thing that happens to them every Monday.',
    items: [
      {
        title: 'The spreadsheet that gets re-keyed every Monday',
        body: 'The numbers already exist in three systems. Somebody copies them into a fourth, by hand, and the copy is out of date before the meeting starts. The fix is rarely a new tool — it is a job that reads the three systems and writes the fourth.',
      },
      {
        title: 'The report assembled from four dashboards',
        body: 'Every figure is available. Turning them into the thing the board reads costs an afternoon a week, and the person doing it is the person who understands the business best.',
      },
      {
        title: 'The approval that lives in an inbox',
        body: 'There is no record of who approved what, no way to see what is waiting, and the whole process stops when one person is away. A queue with roles and an audit trail is a week of work and ends the argument.',
      },
      {
        title: 'The LLM feature that worked in the demo',
        body: 'Extraction, classification or drafting that is right most of the time, with no measurement of how often and no plan for the rest. The missing pieces are an evaluation set built from your own cases, a number you can watch, and a path for the low-confidence ones.',
      },
      {
        title: 'The integration that broke and nobody noticed',
        body: 'A script somebody wrote two years ago, running on a laptop or a cron job with no alerting. It has been failing silently since April. Automation that nobody can see the health of is a liability, not an asset.',
      },
      {
        title: 'The data entry that is really a data model problem',
        body: 'The same customer exists three times under three spellings, so every process downstream needs a human to reconcile it. Sometimes the automation is upstream of where the pain is.',
      },
    ],
  },

  deliverables: {
    title: 'What you get.',
    intro: 'The same handover as every engagement here, plus the parts specific to running a model in production.',
    items: [
      {
        title: 'A written scope',
        body: 'In week one: which processes, in which order, what “done” means for each, and what we are deliberately not doing. Agreed before anything is built.',
      },
      {
        title: 'A milestone plan',
        body: 'What lands when. It is what you hold us to, and it is the reason nobody has to ask for a status update.',
      },
      {
        title: 'A staging URL from day one',
        body: 'The work is visible from the first week, on your own data where that is safe, and on a realistic copy where it is not.',
      },
      {
        title: 'A demo every Friday',
        body: 'Thirty minutes, with the people who do the work in the room rather than only the people who bought it. Half the design decisions come out of that call.',
      },
      {
        title: 'An evaluation set, for anything with a model in it',
        body: 'Built from your real cases, not from examples we invented. It gives you a pass rate you can watch over time, and it is the thing that turns “the AI is quite good” into a number.',
      },
      {
        title: 'A cost per run and a fallback',
        body: 'What each execution costs, where the ceiling is, and what happens when the model is unavailable, too slow or wrong: a human queue, a deterministic path, or a refusal. Decided by you, in the scope.',
      },
      {
        title: 'Monitoring you can see',
        body: 'Every automation reports whether it ran, what it did and what it skipped, and it tells somebody when it stops. Silent failure is the default failure mode of this kind of work.',
      },
      {
        title: 'The repo, the infrastructure and the accounts',
        body: 'In your name, documented, with a runbook. We leave cleanly — or stay on as the team that keeps it running.',
      },
    ],
  },

  running: {
    title: 'How it runs.',
    intro:
      'Shape, not a Gantt chart. The dates come out of the milestone plan in week one, and the first automation is live long before the end.',
    steps: [
      {
        label: 'Week one',
        title: 'Watch the work',
        body: 'We sit with the people doing it and watch it happen — not a questionnaire, not a workshop. Then we rank the candidates by hours returned against effort, and you pick.',
      },
      {
        label: 'Weeks two to three',
        title: 'One process, end to end',
        body: 'The highest-value automation runs on real data in staging, with a person still approving every output. That is where you find out what the process actually is.',
      },
      {
        label: 'Middle stretch',
        title: 'Live, with the manual path still open',
        body: 'It goes into production for a subset of the work while the old way still exists. We measure agreement between the two before anything is switched off.',
      },
      {
        label: 'Last weeks',
        title: 'The rest, then handover',
        body: 'The remaining processes, alerting, the runbook, and a session with whoever will own it. Or we stay on and own it ourselves.',
      },
    ],
  },

  proof: {
    title: 'Automations of ours that are running right now.',
    intro: 'Not references. Products you can open, with the numbers linked to where you can check them.',
    evidence: [
      {
        value: 'Daily',
        label: 'vacancy scrape and enrichment pipeline feeding SustenTalent’s prospect list',
        source: 'sustentalent.com',
        href: 'https://sustentalent.com',
      },
      {
        value: 'SQL',
        label: 'Dataki answers a plain-English question with a real dashboard and the query it wrote',
        source: 'dataki.ai',
        href: 'https://dataki.ai',
      },
      {
        value: '6 yrs',
        label: 'FireCMS in production, merged into every week since 2020',
        source: 'github.com/firecmsco/firecms',
        href: 'https://github.com/firecmsco/firecms',
      },
    ],
    body: [
      '[SustenTalent](__SUSTENTALENT__) is the clearest example of the pattern. It is a job board, and the recruiting operation that works it is built into the same product: a weekday scrape reads real vacancies down the employer axis rather than the posting axis, an enrichment pipeline fills in the company behind each posting, the shared mailbox syncs itself, and the admin derives the next step for every prospect instead of asking anyone to keep a status column up to date. Nobody maintains the prospect list. It falls out of running the board.',
      '[Dataki](https://dataki.ai) is the model-in-production example: you ask a question in plain English and it returns a dashboard together with the SQL it wrote to get there. Showing the query is the guardrail — it is what lets a human check the answer instead of trusting it.',
      'And the reason any of this is worth buying from us rather than building once and forgetting: we still run everything we have built. [FireCMS](https://firecms.co) has been in production since 2020 and merged into every week since.',
    ],
  },

  faq: {
    title: 'Questions we get asked.',
    intro: 'The ones that come up on almost every first call.',
    items: [
      {
        q: 'Do we have to replace the tools we already use?',
        a: 'Usually not. Most of this work is integration — reading from the systems you have and writing back into them. Replacing a tool your team knows is expensive and rarely the reason the process is slow.',
      },
      {
        q: 'What happens when the model gets it wrong?',
        a: 'That is decided in the scope, before anything ships. Every model feature gets an evaluation set built from your own cases, so you have a measured pass rate rather than an impression, and a defined path for the cases below the confidence threshold — a human queue, a deterministic fallback, or a refusal to answer. A feature with no answer to this question does not go live.',
      },
      {
        q: 'How do you keep the cost of an LLM feature predictable?',
        a: 'By measuring cost per run during the build and designing around it: caching, smaller models for the easy cases, and a hard ceiling on what a single execution can spend. You get the number before the feature is live, not on the first invoice.',
      },
      {
        q: 'Does our data get sent to a model provider?',
        a: 'Only if you decide it can, and only the fields the task needs. Where that is not acceptable — regulated data, a client contract that forbids it — the options are a provider with the right terms and region, or a model running on infrastructure you control. It is a scope decision, and it changes what is possible, so we raise it in week one.',
      },
      {
        q: 'Who owns and runs it afterwards?',
        a: 'You do. The repository, the infrastructure and the accounts are in your name from the first week, and the handover includes a runbook. If you would rather not run it, we stay on — but that is a choice, not a dependency we build in.',
      },
      {
        q: 'We do not know which processes are worth automating.',
        a: 'Then start with the [architecture review](__REVIEW__): two weeks, a written plan, ranked by what each item costs you today. Most of it is work your own team can do, and that is a fine outcome.',
      },
    ],
  },

  cta: {
    body: 'Two paragraphs is plenty: what the process is, who does it today, and how often. If it is not worth automating we will say so.',
  },

  related: {
    title: 'The other three ways in.',
    intro: 'Every engagement here starts with a fixed scope and a milestone plan.',
  },
};
