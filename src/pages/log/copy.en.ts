/* English copy for /log/.

   The words only. The entries themselves are data and live in `entries.ts`,
   in both languages, beside the source that proves each one.

   Month names are spelled out here rather than left to `Intl`: the page is
   rendered by Node at build time and by the browser on hydration, and the two
   have to produce byte-identical markup. A locale database that differs
   between them is a hydration mismatch nobody would think to look for. */

export const logEn = {
  title: 'Log',
  intro:
    'Everything we shipped, dated, with a link to where you can check it. Only things that are out — nothing planned, nothing in progress.',

  /** Read by the mono line under the masthead. `__COUNT__` and `__DATE__` are filled in. */
  meta: '__COUNT__ entries · newest __DATE__',

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

  /** `__MONTH__ __YEAR__` — the group heading. Spanish puts a "de" in it. */
  monthHeading: '__MONTH__ __YEAR__',

  /** A whole date, for the mono line and each row's tooltip. */
  dateFormat: '__DAY__ __MONTH__ __YEAR__',

  /** Screen-reader label on each row's link. */
  sourceLabel: 'Source',
};

export type LogCopy = typeof logEn;
