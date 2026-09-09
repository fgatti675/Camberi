/* English copy for /services/.

   The hub. It carries the promise that is the same in all four
   engagements — a fixed scope agreed in week one — and one paragraph per
   engagement that is written to make the choice, not to repeat the page it
   links to. The engagement titles, week ranges and scope lines are read
   from `t.engagements`, so this page and the home page never disagree
   about what the four things are called. */

export const servicesEn = {
  title: 'Four ways in, each with a fixed scope and an end date.',
  meta: 'From two weeks to six months · scope, milestone plan and price agreed in week one',

  lead: [
    'These are the shapes our work actually takes. They differ in length and in what is being decided — not in how they run: a written scope out of week one, a milestone plan, a staging URL from the first day and a demo every Friday, whichever one you pick.',
    'If more than one of them describes you, that is normal. Most engagements start with the shortest and grow into the next one, and a two-week review is a much cheaper way to find out which than a three-month discovery phase.',
  ],

  /** One paragraph per engagement, in the order of `t.engagements.items`. */
  blurbs: [
    'The processes your team runs by hand — the spreadsheet re-keyed on Monday, the report assembled from four dashboards, the approval that lives in an inbox — built so they keep running without a babysitter. LLM features included, and those ship with an evaluation set, a cost per run and a defined fallback.',
    'The whole product, with design, frontend, backend and infrastructure owned by one team: zero to production, or the rewrite of a v1 that can no longer be extended. Including the regulated kind, where the data is medical and the architecture has to survive scrutiny.',
    'The layer underneath. Schema design, migrations off a managed backend you have outgrown, access rules enforced by Postgres rather than by application code, and admin tooling your operations team can actually use — plus FireCMS and Rebase implementation from the people who wrote the frameworks.',
    'Two weeks, a proper read of your stack, and a document that ranks what is wrong by what it is costing you. Written so your own team can act on it without us, which is often the right outcome.',
  ],

  same: {
    title: 'What is the same in all four.',
    intro:
      'The length changes. The way the work runs does not, and it is the part that decides whether a project is pleasant or not.',
  },
};

export type ServicesCopy = typeof servicesEn;
