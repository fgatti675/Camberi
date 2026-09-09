import { PageLayout, PageHead } from '../../components/PageLayout';
import { CONTAINER, ArrowRight } from '../../components/ui';
import { locale } from '../../i18n';
import { localePath } from '../../routes/paths';
import type { PostCopy, PostMeta } from './post';
import { pick } from './locale';
import { journalEn, type JournalCopy } from './copy.en';
import { journalEs } from './copy.es';
import { breakingChangesMeta } from '../journal-breaking-changes/meta';
import { breakingChangesEn } from '../journal-breaking-changes/copy.en';
import { breakingChangesEs } from '../journal-breaking-changes/copy.es';
import { rowLevelSecurityMeta } from '../journal-row-level-security/meta';
import { rowLevelSecurityEn } from '../journal-row-level-security/copy.en';
import { rowLevelSecurityEs } from '../journal-row-level-security/copy.es';

/* ──────────────────────────────────────────────────────────────
   The journal index.

   Drafted, not published. `draft: true` on this route and on both
   posts means `pnpm dev` serves all three and `pnpm build` renders
   none of them, so nothing reaches the sitemap, llms.txt or a
   crawler until Francesco has read each post's REVIEW block and
   removed the flag.

   The list below is written out rather than globbed. A page that
   discovered its own children would publish the next draft somebody
   started, which is the opposite of what the flag is for.
   ────────────────────────────────────────────────────────────── */

const copy: JournalCopy = locale === 'es' ? journalEs : journalEn;

interface Entry {
  meta: PostMeta;
  copy: PostCopy;
}

const posts: Entry[] = [
  { meta: breakingChangesMeta, copy: pick(breakingChangesEn, breakingChangesEs) },
  { meta: rowLevelSecurityMeta, copy: pick(rowLevelSecurityEn, rowLevelSecurityEs) },
].sort((a, b) => b.meta.date.localeCompare(a.meta.date));

/** Formatted from the ISO string, never through `Date` — see src/pages/log/index.tsx. */
function longDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return copy.dateFormat
    .replace('__DAY__', String(Number(day)))
    .replace('__MONTH__', copy.months[Number(month) - 1])
    .replace('__YEAR__', year);
}

export default function Journal() {
  return (
    <PageLayout>
      <PageHead title={copy.title} intro={copy.intro} titleClass="max-w-[10ch]" />

      <div className={`${CONTAINER} pb-28 md:pb-36`}>
        <div className="mt-14 md:mt-20 stagger">
          {posts.map(({ meta, copy: post }) => (
            <a
              key={meta.path}
              href={localePath(locale, meta.path)}
              className="group block border-t border-hairline-soft py-8 transition-colors duration-300 ease-expo hover:border-text-main">
              <time
                dateTime={meta.date}
                className="font-mono text-[0.72rem] tracking-[-0.01em] text-text-light">
                {longDate(meta.date)}
              </time>
              <h2 className="mt-3 text-[1.35rem] md:text-[1.55rem] font-600 leading-[1.25] tracking-[-0.022em] text-text-main max-w-[24ch]">
                {post.title}
              </h2>
              <p className="mt-3 text-[0.98rem] leading-[1.6] text-text-muted max-w-[56ch]">
                {post.standfirst}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-500 text-text-light transition-colors duration-300 group-hover:text-accent">
                {copy.read}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-1" />
              </span>
            </a>
          ))}
          <div className="border-t border-hairline-soft" />
          {posts.length === 0 && <p className="py-8 text-text-muted">{copy.empty}</p>}
        </div>
      </div>
    </PageLayout>
  );
}
