import { PageLayout, PageHead, Prose, inline } from '../../components/PageLayout';
import { CONTAINER, Rule } from '../../components/ui';
import { SITE } from '../../site';
import { locale } from '../../i18n';
import { securityEn, type SecurityCopy } from './copy.en';
import { securityEs } from './copy.es';

/* ──────────────────────────────────────────────────────────────
   The security page.

   A studio this size cannot show SOC 2 or ISO 27001, and health
   and public-sector buyers will still ask what happens to their
   data. The answer that works is a factual self-description, so
   this page opens by saying what it is not and then describes the
   arrangement — client-owned repositories and accounts, access
   enforced in the database, the paperwork we will sign — and stops.
   Nothing here is a control we would have to invent a policy to
   support, because a page like this is read by people whose job is
   to check.

   Same construction as the legal notice and the privacy policy:
   one column of headings, one of prose, facts from `src/site.ts`.
   ────────────────────────────────────────────────────────────── */

const copy: SecurityCopy = locale === 'es' ? securityEs : securityEn;

const VARS: Record<string, string> = {
  EMAIL: SITE.email,
  GITHUB: SITE.social.github,
};

export default function Security() {
  return (
    <PageLayout>
      <PageHead title={copy.title} intro={copy.intro} meta={copy.updated} titleClass="max-w-[17ch]" />

      <div className={`${CONTAINER} pb-28 md:pb-36`}>
        {copy.blocks.map((block) => (
          <section key={block.id} className="mt-14 md:mt-18">
            <Rule />
            <div className="pt-8 grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-x-10 gap-y-5">
              <h2 className="reveal font-sans text-[1.15rem] font-600 leading-[1.3] tracking-[-0.018em] text-text-main">
                {block.title}
              </h2>
              <div className="reveal d1">
                <Prose paragraphs={block.body} vars={VARS} />
                {block.list && (
                  <ul className="mt-5 flex flex-col gap-3 max-w-[62ch]">
                    {block.list.map((item) => (
                      <li
                        key={item}
                        className="relative pl-5 text-text-muted leading-[1.65] before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-hairline">
                        {inline(item, VARS)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
