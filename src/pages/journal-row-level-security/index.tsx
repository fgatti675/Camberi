import { Article } from '../journal/post';
import { pick } from '../journal/locale';
import { rowLevelSecurityMeta } from './meta';
import { rowLevelSecurityEn } from './copy.en';
import { rowLevelSecurityEs } from './copy.es';

/* Draft until Francesco has read the REVIEW block at the top of `copy.en.ts`.
   The first item there is the one that decides whether this page ships at
   all: rebase.pro already carries a post making the same argument. */

export default function RowLevelSecurity() {
  return <Article copy={pick(rowLevelSecurityEn, rowLevelSecurityEs)} meta={rowLevelSecurityMeta} />;
}
