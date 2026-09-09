/* English copy for /security/.

   The page a buyer's IT or compliance person opens before a call. Its whole
   value is that it does not overclaim: every sentence here is either
   something already visible in the work (the handover model, the repositories,
   how access is enforced in Rebase, medicalmotion's regulatory context) or a
   commitment that costs one email to honour (an NDA, a DPA, a subprocessor
   list, telling a client when something has gone wrong).

   Anything that would need a policy document behind it — a 2FA rule, a
   secrets-management standard, device encryption, backup cadence, offboarding
   — is deliberately absent. Publishing a control nobody is enforcing is worse
   than publishing nothing, because the first audit finds it. Those went to
   Francesco as a list to decide on; when he decides, they belong here.
   ────────────────────────────────────────────────────────────── */

interface SecurityBlock {
  id: string;
  title: string;
  body: string[];
  list?: string[];
}

const blocks: SecurityBlock[] = [
  {
    id: 'certifications',
    title: 'What we are not',
    body: [
      'We hold no SOC 2 report and no ISO 27001 certificate, and we are not going to imply otherwise. Both describe an organisation with an audit budget and a compliance function; this is three engineers. If your procurement process requires one of them, say so before we scope — it is a reason not to work together, not something to discover in month three.',
      'What follows is what we actually do, written so that you can check it against the work rather than take it on faith.',
    ],
  },
  {
    id: 'ownership',
    title: 'Your code stays yours',
    body: [
      'Client work lives in the client’s own repositories, on the client’s own infrastructure, under the client’s own accounts. We work inside them as members with the access the work needs, and when an engagement ends the accounts stay where they are — nothing has to be migrated back, because nothing was ever somewhere else.',
      'That is the same thing the rest of this site says about how an engagement finishes: your repo, your infrastructure, your accounts, documented. It matters here because it is also the answer to most of the questions a security review asks. There is no Camberi-hosted copy of your system to be compromised, no shared tenancy with another client, and no vendor account standing between you and your production environment.',
    ],
  },
  {
    id: 'where',
    title: 'Where things run',
    body: [
      'Our own code — the frameworks and tools this studio publishes — is on GitHub at [github.com/firecmsco](__GITHUB__), in public. Google Cloud is the platform we use most, for our own products and for the client systems we are asked to run.',
      'For any given project we will tell you which third-party services it depends on and what each one processes, before you sign anything.',
    ],
  },
  {
    id: 'access',
    title: 'How access is enforced',
    body: [
      'Where we design the data layer, authorisation is enforced by the database rather than by application code. Rebase — the Postgres backend we wrote and run for our own products and for client systems built on it — puts every access rule in Postgres row-level security, so a route handler that forgets a check cannot return another tenant’s rows. SustenTalent’s multi-tenant data is separated this way.',
      'This is an architectural preference with a specific reason behind it: middleware is the part of a system that gets refactored, and a rule that lives in the query planner survives the refactor. It is also the part of our work most easily verified — the policies are in the schema, and the schema is something you own.',
    ],
  },
  {
    id: 'regulated',
    title: 'Regulated data',
    body: [
      'We have worked with health data under German regulation since medicalmotion’s first web version in 2019: the patient app, the therapist tooling and the data platform behind their research. That is the environment where the practical questions get asked — who may see a record, what is logged, what happens to it when a patient leaves — and it is why we are comfortable with a procurement process that asks them.',
      'We are not a medical device manufacturer and we do not certify anyone else’s. Where a client’s product is regulated, we build to the requirements their regulatory work sets.',
    ],
  },
  {
    id: 'paperwork',
    title: 'What we will sign',
    body: [
      'None of these need a negotiation. Ask, and we send them.',
    ],
    list: [
      'A non-disclosure agreement before scoping, if you would rather describe the problem under one. Yours or ours.',
      'A data processing agreement under article 28 of the GDPR, for any engagement where we handle personal data on your behalf.',
      'A named list of the subprocessors a project uses — the specific services, not a category — kept current for as long as we are working on it.',
    ],
  },
  {
    id: 'incidents',
    title: 'If something goes wrong',
    body: [
      'If we become aware of an incident affecting your data or your systems, we tell you without undue delay, in writing, with what we know at that point rather than waiting until we know everything. Where we are acting as your processor, article 33(2) of the GDPR requires exactly that, and the obligation is in the DPA above.',
      'To report something to us, write to [__EMAIL__](mailto:__EMAIL__) and say it is a security report in the subject line. It reaches everyone here.',
    ],
  },
];

export const securityEn = {
  title: 'How we handle your code and data',
  intro:
    'What a small studio can honestly tell you about security: no certifications, three engineers, and a specific account of how the work is set up.',
  updated: 'Last updated 9 September 2026',
  blocks,
};

export type SecurityCopy = typeof securityEn;
