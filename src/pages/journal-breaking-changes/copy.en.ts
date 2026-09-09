import type { PostCopy } from '../journal/post';

/* ══════════════════════════════════════════════════════════════
   REVIEW — Francesco, these are the claims to confirm before this
   post is published. Its route is `draft: true` until you do.

   1. PUBLISHING FireCMS CLOUD INTERNALS. Two sections describe how
      a tenant customization is loaded (module federation, shared
      React, requiredVersion) and a bug in our own canary
      publishing. Both are already in the public CHANGELOG for
      3.4.0, but a changelog and a post on the studio's site have
      different readers. Say if any of it should come out.
   2. "ON npm SINCE 2020 / SIX YEARS." Taken from the site's
      existing copy and the repository's creation date, 2020-04-18.
      If "in production" should date from the first public or paying
      install instead, give me that date and I will change the line.
   3. THE TAILWIND 4 PRERELEASE LINE AS A DECISION. I describe the
      nineteen 3.0.0-tw4 tags (2025-11-25 to 2025-12-13) as a
      deliberate parallel line that kept the CSS engine swap out of
      3.0.0. That is what the tag and publish record shows; the
      record cannot tell me it was the intention. Confirm or correct.
   4. "NOTHING FAILS — THE BUILD PASSES." The v3.0→v3.1 migration
      guide says the custom colours will not be applied and FireCMS
      falls back to its defaults. That there is no console warning
      is my reading of it, not something the guide states.
   5. THE CLOSING SECTION is the only opinion in the post. If it
      reads as a pitch, cut it — the post stands without it.
   6. NUMBERS TO SPOT-CHECK: 3.0.0-beta.1 on 2024-02-01 and 3.0.0 on
      2025-12-01 (twenty-two months); a fixture build going from
      144K to 40K; four canary packages producing five copies of
      @firecms/core. All from the 3.4.0 CHANGELOG or the npm
      registry, none from memory.
   ══════════════════════════════════════════════════════════════

   SOURCES — every specific claim below, and where it comes from.

   · /Users/francesco/firecms/CHANGELOG.md, section [3.4.0] - 2026-08-26:
     the pathSegments threading and its "Nothing to do when upgrading"
     lines; the point-free stripCollectionPath trap; the entity cache
     key collision and encodeEntityId; the shared react/jsx-runtime and
     React error #525; the removal of requiredVersion and the semver
     OR-range finding; the 144K to 40K figure; the canary caret bug and
     the five copies of @firecms/core.
   · Git tags in firecmsco/firecms: v3.0.0-tw4.0 (2025-11-25) through
     v3.0.0-tw4.18 (2025-12-13), nineteen in all; v3.0.0 (2025-12-01);
     v3.1.0 (2026-02-18); v3.0.0-beta.1 through beta.15.
   · npm registry `time` for @firecms/core: 3.0.0-beta.1 2024-02-01,
     3.0.0 2025-12-01, 3.1.0 2026-02-18.
   · website-astro/src/content/docs/docs/self/migrating_from_v3_to_v3_1.mdx:
     the Tailwind 4 steps, the --fcms-primary to --color-primary rename,
     deleting tailwind.config.js and postcss.config.js, and the warning
     about falling back to the default palette.
   · website-astro/src/content/docs/docs/self/migrating_from_v3_1_to_v3_2.mdx:
     "update all @firecms/* packages to version 3.2".
   · github.com/firecmsco/firecms, repository created 2020-04-18.

   Written without backticks on purpose: Prose renders a paragraph as
   plain text, so a backtick would be printed rather than set as code.
   ────────────────────────────────────────────────────────────── */

export const breakingChangesEn: PostCopy = {
  title: 'Shipping breaking changes to installs we cannot see',
  standfirst:
    'FireCMS has been on npm since 2020. Most of what six years of that taught us is one problem: every change reaches installations we cannot test, cannot inspect and cannot ask to upgrade.',
  dateLabel: '9 September 2026',

  sections: [
    {
      body: [
        'The public part of maintaining an open-source framework is the features. The part that takes the time is that we do not know who is running it. We can see download counts and issues; we cannot see the codebase a change is about to break, and nothing comes back off the registry once it is published.',
        'The 3.0 line took twenty-two months of betas — [3.0.0-beta.1](https://github.com/firecmsco/firecms/releases/tag/v3.0.0-beta.1) went out on 1 February 2024 and [3.0.0](https://github.com/firecmsco/firecms/releases/tag/v3.0.0) on 1 December 2025 — and most of that time went on exactly this. What follows is how we handle it now, taken from releases we shipped this year rather than from principle.',
      ],
    },
    {
      heading: 'Additive, optional, and a test that says so',
      body: [
        'Version [3.4.0](https://github.com/firecmsco/firecms/releases/tag/v3.4.0) had to thread a new value, pathSegments, through the datasource, the permissions builder, the plugin surface and every entity callback. The reason was a real defect: an entity id may contain a slash, a flattened path string cannot represent that, and a collection path built from one addressed the wrong entity — or threw outright on write.',
        'Everything about that change is additive. Every new parameter is optional and trailing, every new interface member is optional, and a suite asserts that omitting them reproduces the previous result for each helper — including that getCollection still throws on a malformed path when no segments are given, so a project relying on that error keeps getting it. Four of the five sections of that [changelog entry](https://github.com/firecmsco/firecms/blob/master/CHANGELOG.md) end on the same three words: nothing to do when upgrading.',
        'The test is the load-bearing part. "Additive" is easy to believe about your own diff and hard to be right about.',
      ],
    },
    {
      heading: 'Sometimes an extra parameter is the breaking change',
      body: [
        'Two of those helpers, fullPathToCollectionSegments and stripCollectionPath, take a single argument, and one of our own packages passes them point-free: parentCollectionIds.map(stripCollectionPath). Give a function like that a second parameter and Array.prototype.map fills it with the array index. The call still compiles. It just quietly means something else.',
        'So the segment-aware versions are separate functions rather than extra parameters, and a test pins their arity so nobody merges the tidier-looking form later. We knew to look because we grep our own consumers before changing a signature — which is a thing we can only do for the consumers we can see, and the reason a signature change gets more caution than the diff seems to deserve.',
      ],
    },
    {
      heading: 'Compatibility is a property of the stored data too',
      body: [
        'The same release fixed entity cache keys, which were built as the path, a slash, and the id. That makes the pairs ("a", "b/c") and ("a/b", "c") produce one key, so one entity could be served another entity’s cached values: a draft restored into the wrong form, a reference preview showing the wrong record.',
        'The fix escapes the id — but encodeEntityId is deliberately the identity function for any id without a slash, question mark, hash or percent sign. Nothing already in a browser’s storage changes shape, so no unsaved draft is orphaned by the upgrade. A correct fix that silently discards everyone’s local state would be a worse release than the bug it closes.',
      ],
    },
    {
      heading: 'When you cannot avoid breaking, break on a line people opt into',
      body: [
        'Moving every package from Tailwind CSS 3 to 4 could not be made additive. It changes the CSS variable names a host application writes and the build plugin it installs.',
        'We did not put it in 3.0.0. Between 25 November and 13 December 2025 we cut nineteen prereleases, tagged v3.0.0-tw4.0 through [v3.0.0-tw4.18](https://github.com/firecmsco/firecms/releases/tag/v3.0.0-tw4.18), as a parallel line — while 3.0.0 itself went stable on 1 December, on Tailwind 3. Tailwind 4 arrived for everyone in [3.1.0](https://github.com/firecmsco/firecms/releases/tag/v3.1.0) on 18 February 2026, with [a written migration](https://github.com/firecmsco/firecms/blob/master/website-astro/src/content/docs/docs/self/migrating_from_v3_to_v3_1.mdx): install the Vite plugin, rename --fcms-primary to --color-primary, delete tailwind.config.js and postcss.config.js.',
        'The rename is the step worth dwelling on. Skip it and nothing fails: the build passes, the app runs, and FireCMS falls back to its default palette, so the only symptom is that the project’s brand colours are gone. The guide carries that as a warning rather than a bullet, because a migration step whose failure mode is visual is the one people finish an upgrade without noticing.',
      ],
    },
    {
      heading: 'A version gate you never check is not a gate',
      body: [
        'FireCMS Cloud loads a tenant’s customization at runtime into a host application we deploy, which means a bundle built two years ago has to render inside whatever React the host is on today. The shared React was declared with a range: "^18.0.0 || ^19.0.0".',
        'In 3.4.0 we removed it, for two reasons that were both true at once. A customization is built with no local copy of React to fall back on, so when a version gate fails the remote does not degrade — it dies on an undefined module. And it was never the gate it looked like: the federation plugin’s bundled semver cannot parse an OR range, so that string had matched no host, ever. Removing it makes the host the single authority over React’s version, which is the only arrangement under which we can move React underneath deployments nobody is going to rebuild.',
        'The bug that sent us looking was next door. react/jsx-runtime was not in the shared set, so any bundle compiled with the automatic JSX transform pulled the runtime in, and the runtime pulled a second copy of React with it. That is not merely wasteful: React 19 refuses to render an element created by React 18, because the two majors stamp elements with different symbols, so such a bundle died with error #525. Sharing the runtime fixed it, and took a fixture build from 144K to 40K.',
      ],
    },
    {
      heading: 'The range bug we shipped to ourselves',
      body: [
        'Both migration guides open by telling you to update every @firecms/* package to the same version. That is not tidiness. Our own canary releases pinned our packages to each other with a caret — "@firecms/core": "^3.4.0-canary.abc1234" — and that range also matches the stable 3.4.0, which npm prefers because it is higher. A canary install therefore pulled stable transitive packages; those required ^3.4.0 in turn; and npm nested a second copy of @firecms/core to satisfy them.',
        'Two copies of the core package means two React context objects. The application’s provider fills one and a plugin reads the other, so the symptom is a controller that is present, correctly typed, and empty. Installing four packages at one canary version produced five copies of the core. Canary publishes now pin our own packages exactly.',
        'Stable releases were never affected, which is the only reason it survived as long as it did: it was a bug in the version we ask people to install when they are helping us test.',
      ],
    },
    {
      heading: 'What we take from it',
      body: [
        'None of this is a rule about semantic versioning. It is closer to a habit: assume the upgrade will be done on a Friday by somebody who has not read the release notes, and arrange the change so it works anyway. Every optional trailing parameter, every identity-preserving encoder and every parallel prerelease line is a way of not sending a bill to people who did not ask for one.',
      ],
    },
  ],
};
