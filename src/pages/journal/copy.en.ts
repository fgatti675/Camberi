/* English copy for /journal/.

   The index only. Each post's words live in its own directory, beside the
   comment block naming the files every claim in it came from.

   The whole section is `draft: true` — index and posts alike — because an
   unreviewed post in Francesco's voice must not be published, and an index
   with nothing under it is worse than no index. Both flags come off together.
   Month names are spelled out rather than left to `Intl`, for the reason in
   `src/pages/log/copy.en.ts`. */

export const journalEn = {
  title: 'Journal',
  intro:
    'Notes on decisions in our own code — what we chose, what it cost, and the versions and files you can read it in.',

  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dateFormat: '__DAY__ __MONTH__ __YEAR__',

  /** The affordance at the foot of each card. The whole card is the link. */
  read: 'Read it',

  /** Shown in place of the list while there is nothing published. */
  empty: 'Nothing here yet.',
};

export type JournalCopy = typeof journalEn;
