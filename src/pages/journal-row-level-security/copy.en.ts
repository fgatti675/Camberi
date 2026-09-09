import type { PostCopy } from '../journal/post';

/* ══════════════════════════════════════════════════════════════
   REVIEW — Francesco, confirm these before this post is published.
   Its route is `draft: true` until you do.

   1. OVERLAP WITH REBASE'S OWN BLOG. rebase.pro published "Your
      backend's security should not depend on remembering to check"
      on 2026-08-23, which makes the same argument. This post is
      deliberately the mechanical half — what a rule compiles to,
      which module enforces it, what refuses to be served — and it
      links to that one rather than restating it. Decide whether
      Camberi should carry a second piece on the subject at all.
   2. NAMING INTERNALS. It names the rebase_user role, rebase.uid(),
      the per-transaction SET LOCAL ROLE, BaasOptions.unprotectedTables
      and three source files by path. The policy builder and the
      security-rules page are public documentation; the module paths
      and the role name are not documented in the same place. Say if
      the file paths should go.
   3. "REBASE IS IN PUBLIC BETA." Taken from the closing line of the
      rebase.pro post. The repository is at 0.19.1 and its
      compatibility page sets out what may change. Confirm that is
      still the right way to describe it.
   4. rls-check DATES. The package first appears on npm on
      2026-07-27 and was announced on rebase.pro on 2026-08-23. I
      use the announcement date in the text because that is the one
      a reader can check. Tell me if the July date is the one you
      would rather state.
   5. THE FIFTEEN CHECKS. The count comes from the docblock in
      website/src/data/rls-checks.ts, which says the list is copied
      verbatim from the tool's source. If checks have been added
      since, the number needs updating with them.
   6. NO CUSTOMER IS NAMED and no client database is described. If
      you would rather the post used a concrete engagement as the
      example, that is a different post and needs the client's yes.
   ══════════════════════════════════════════════════════════════

   SOURCES — all in /Users/francesco/rebase.

   · website/src/content/docs/docs/collections/security-rules.md —
     securityRules, the ownerField and access shortcuts, the policy
     builder, rebase.uid() / rebase.roles() / rebase.jwt(), permissive
     vs restrictive, the roles / pgRoles distinction, autoValue
     "user_on_create", and the closing section on rows versus fields.
   · packages/server-postgres/src/security/rls-enforcement.ts — the
     user-context / server-context model, rebase_user being a
     non-owner NOSUPERUSER NOBYPASSRLS role, applyAuthContext setting
     the GUCs and SET LOCAL ROLE per transaction, and the statement
     that securityRules are the whole authorization model while
     app-layer callbacks are not a security boundary.
   · packages/server/src/init.ts — BaasOptions.unprotectedTables,
     default "exclude", and the reasoning printed with each exclusion.
   · packages/server-postgres/src/schema/introspect-runtime.ts —
     readRlsStatus, and why a table with RLS disabled cannot be served.
   · packages/server-postgres/src/schema/generate-postgres-ddl-logic.ts —
     planJunctionTables and planCollectionPolicies, and the comment
     that a junction created there always has policies planned for it.
   · GitHub releases: v0.13.0 (2026-08-04) removing rebase.data;
     v0.10.0 (2026-07-20) settling on uid.
   · website/src/data/rls-checks.ts — the fifteen checks and their ids.
   · website/src/content/blog/2026-08-23-security-that-does-not-depend-on-remembering.md
     — the announcement this post links to.

   Written without backticks on purpose: Prose renders a paragraph as
   plain text, so a backtick would be printed rather than set as code.
   ────────────────────────────────────────────────────────────── */

export const rowLevelSecurityEn: PostCopy = {
  title: 'Where we put the access rules, and why it is Postgres',
  standfirst:
    'In Rebase the same collection file that generates the schema and the API generates the row-level security policies. This is the mechanical account of what that produces.',
  dateLabel: '9 September 2026',

  sections: [
    {
      body: [
        'Every authorization bug we have shipped had the same shape: not a bypass, a missing line. A route added in a hurry that queried the table directly. A join that reached through a protected table into an unprotected one. The code was not wrong, it was absent, and absence has no stack trace.',
        'That argument is made at length on [Rebase’s own blog](https://rebase.pro/blog/2026-08-23-security-that-does-not-depend-on-remembering/), so this is the other half: what the decision actually compiles to, which module enforces it, and the two places we deliberately did not put it.',
      ],
    },
    {
      heading: 'What a rule compiles to',
      body: [
        'A collection is a TypeScript file. Alongside its fields it declares securityRules, and the shortest useful pair is two lines: an operation "select" with access "public", and operations insert, update and delete with an ownerField of "authorId". The second compiles to USING (author_id = rebase.uid()), attached to the table as a Postgres policy and applied by the same migration that creates the column.',
        'Three functions carry the caller into SQL — rebase.uid(), rebase.roles() and rebase.jwt() — and the backend sets them per transaction. Beyond the shortcuts there is a builder: policy.existsIn compiles a membership test to one correlated EXISTS subquery rather than a per-row lookup. The whole surface is in [the security rules page](https://rebase.pro/docs/collections/security-rules/).',
        'One detail in that page is worth repeating because it is the premise everything else rests on: ownerField compares a column to the caller’s id, it does not fill that column in. The column has to be declared with autoValue "user_on_create", so the driver stamps the acting user on insert and overwrites whatever the request body sent. A column the caller supplies is a column the caller can lie about.',
      ],
    },
    {
      heading: 'Why the database and not the middleware',
      body: [
        'A request authenticated through the driver runs as rebase_user: a role that does not own the tables, is not a superuser and does not have BYPASSRLS. Per transaction, the enforcement module sets the session variables the policies read and issues SET LOCAL ROLE rebase_user — transaction-scoped, so it survives a connection pooler. Migrations, auth flows and raw SQL run on the owner connection instead, which is the trusted plane and is the only thing that bypasses a policy.',
        'The consequence is the point. A handler that forgets its check does not get every row; it gets the rows that caller may see, because the scoping is not in the path a developer can skip. That module’s own documentation states the position plainly: the collection’s securityRules are the whole authorization model, and application-layer callbacks are validation and side effects rather than a security boundary. Writing that down matters, because the alternative is two layers each half-believing the other enforces something.',
      ],
    },
    {
      heading: 'The tables it refuses to serve',
      body: [
        'Rebase can also be pointed at a database it did not create, and introspect it. That is where a default has to be chosen, and the option is called unprotectedTables. It defaults to excluding them: a table found with row-level security switched off is not served at all, and every exclusion is logged with the SQL that would protect it.',
        'The reasoning is written next to the code that reads the catalogue. Every authenticated request runs as rebase_user, and that role is granted DML on the schema — so serving a table with no policies hands every row to every signed-in user. Excluding it is not caution, it is the only honest reading of what the table says about itself. The default state of a new table is nobody, and you move it deliberately.',
      ],
    },
    {
      heading: 'Junction tables, which nobody remembers',
      body: [
        'A many-to-many relation implies a table nobody declared. It is also an edge list — the permissions matrix, or the membership graph, in one relation — and very often the only unprotected thing between two carefully protected endpoints.',
        'So the junctions are derived from the same plan the policies are derived from. The comment above that function says why: a table created there always has policies planned for it, because a junction with row-level security left off is readable and writable by every signed-in user. Deriving both from one plan is what makes it structurally impossible to create the table and forget the policy, rather than merely unlikely.',
      ],
    },
    {
      heading: 'Two names for one thing is how it leaks',
      body: [
        'Version [0.13.0](https://github.com/rebasepro/rebase/releases/tag/v0.13.0) removed rebase.data in favour of rebase.dataAsAdmin. They were the same accessor. The problem was the name: on a browser client, data is what you call the user-scoped accessor, so one expression meant "whatever this person may read" in the front end and "everything, no policies" on the server, and both read fine at the call site. The server client type now omits the property, so the old spelling is a compile error rather than a silent privilege — while the property still exists at runtime, so untyped JavaScript does not break.',
        '[0.10.0](https://github.com/rebasepro/rebase/releases/tag/v0.10.0), three weeks earlier, was the same class of problem pointing the other way: the authenticated person was uid in the domain model and in the policies, and userId in the JWT claim and the request context, so a route handler and a hook two frames apart saw them under different keys, and three unrelated places had independently grown the same defensive fallback to cope. Neither release fixed a vulnerability. Both removed the conditions for one.',
      ],
    },
    {
      heading: 'What this model does not cover',
      body: [
        'Row-level security scopes rows, not columns. A policy that lets someone read their team’s rows lets them read every field of those rows, salary included. Per-property access rules cover that, and they are applied by the server rather than by Postgres, so they hold across the API but not across raw SQL. The two stack and cannot contradict each other — a field rule cannot widen row access — but they are enforced in different places, and pretending otherwise would be exactly the sort of thing this design exists to avoid.',
        'And some rules are not predicates. Anything that has to call an external service, or reason about state the database does not hold, stays in application code. What the model changes is the default: the row scoping that covers most of the surface sits where it cannot be skipped, so the part written by hand is the genuinely unusual part rather than all of it.',
        'It also costs something. A policy is a predicate on every query and a careless one is a sequential scan nobody ordered. Generated policies help mainly by being consistent and reviewable: they are SQL, they live in your migrations, and they have the same shape everywhere.',
      ],
    },
    {
      heading: 'Checking a database you already have',
      body: [
        'None of this requires taking our word for it, or using Rebase. We published [rls-check](https://rebase.pro/docs/rls-check/) in August 2026: fifteen checks against any Postgres — Supabase, Neon, RDS, Cloud SQL, a container on a laptop — from read-only catalogue queries, sending nothing anywhere.',
        'It looks for the failures that actually leak rather than the ones that are easy to test for: a table granted to an anonymous role with row-level security off; a permissive policy that is true for every row; a policy shaped like "there is a signed-in user", which separates signed-in from signed-out and scopes nothing beyond that; a view reading past the policies on its base tables; an unprotected junction between two protected endpoints; a SECURITY DEFINER routine with an unpinned search path; a grant to PUBLIC.',
        'It is the same list this design is built to make unreachable, which is why it is worth running against a database we had nothing to do with.',
      ],
    },
  ],
};
