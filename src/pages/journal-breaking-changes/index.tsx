import { Article } from '../journal/post';
import { pick } from '../journal/locale';
import { breakingChangesMeta } from './meta';
import { breakingChangesEn } from './copy.en';
import { breakingChangesEs } from './copy.es';

/* A journal post. Draft until Francesco has read the REVIEW block at the top
   of `copy.en.ts` — `draft: true` means `pnpm dev` serves the page while
   `pnpm build` neither renders it nor lists it in the sitemap or llms.txt.
   Publishing it is one line: delete the flag. */

export default function BreakingChanges() {
  return <Article copy={pick(breakingChangesEn, breakingChangesEs)} meta={breakingChangesMeta} />;
}
