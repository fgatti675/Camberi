import { PageLayout, PageHead, Prose } from '../../components/PageLayout';
import { CONTAINER, Rule } from '../../components/ui';

/* ──────────────────────────────────────────────────────────────
   The shape of a journal post, and the frame it is read in.

   Every post is its own page directory — `src/pages/journal-<slug>/`
   — so it is discovered like any other route and can be published
   one at a time by removing `draft: true`. What they share is this
   module: the type their copy is written against, and a single
   column layout.

   One column, at Prose's 62ch measure, and no furniture. A post is
   an argument someone reads start to finish; the two-column
   treatment on /legal/ is for a document people scan for a field.
   ────────────────────────────────────────────────────────────── */

/** One section of a post: an optional heading, then paragraphs. */
export interface PostSection {
  /** Omitted on the opening section, which runs straight on from the standfirst. */
  heading?: string;
  /** Paragraphs. `[label](href)` is an inline link — see `Prose`. */
  body: string[];
}

export interface PostCopy {
  title: string;
  /** The standfirst beside the title. One sentence. */
  standfirst: string;
  /** How the date reads in this language. The ISO date lives on the post's `meta`. */
  dateLabel: string;
  sections: PostSection[];
}

/** What the index needs to list a post without importing its body. */
export interface PostMeta {
  /** The route path, English. */
  path: string;
  /** ISO, for sorting and the `datetime` attribute. */
  date: string;
}

export function Article({ copy, meta }: { copy: PostCopy; meta: PostMeta }) {
  return (
    <PageLayout>
      <PageHead
        title={copy.title}
        intro={copy.standfirst}
        meta={<time dateTime={meta.date}>{copy.dateLabel}</time>}
        titleClass="max-w-[18ch]"
      />

      <article className={`${CONTAINER} pb-28 md:pb-36`}>
        {copy.sections.map((section, i) => (
          <section key={section.heading ?? i} className={i === 0 ? 'mt-14 md:mt-20' : 'mt-12 md:mt-14'}>
            {section.heading && (
              <>
                <Rule className="mb-7 md:mb-8" />
                <h2 className="reveal font-sans text-[1.15rem] font-600 leading-[1.35] tracking-[-0.018em] text-text-main max-w-[34ch] mb-4">
                  {section.heading}
                </h2>
              </>
            )}
            <div className="reveal d1">
              <Prose paragraphs={section.body} />
            </div>
          </section>
        ))}
      </article>
    </PageLayout>
  );
}
