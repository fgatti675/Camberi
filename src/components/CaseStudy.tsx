import type { ReactNode } from 'react';
import { Prose, inline } from './PageLayout';
import { Rule, Evidence, Tag, Button, ArrowRight } from './ui';

/* ──────────────────────────────────────────────────────────────
   The anatomy of a case study.

   Every case study on this site answers the same six questions in
   the same order, because that is the order a buyer reads them in:
   who the client is, what was in the way, which decisions were
   taken and why, what shipped, what came of it, and who did the
   work. The primitives below are that order made concrete, so a
   second case study cannot quietly become a different document.

   Three rules are enforced here rather than left to each page:

   - A number is only shown with a public source beside it
     (`Evidence`, from ui.tsx). Anything we cannot link to goes in
     the facts block as plain text or does not go on the page.
   - The testimonial renders **nothing** until there is a real one.
     Placeholder quotes were removed from this site as worse than
     nothing, so `quote: null` is a normal state, not a gap to fill.
   - The section rhythm is the inner-page rhythm — a rule, the
     heading in the left column, the body at reading width — the
     same one `/legal/` uses, so a case study reads as part of the
     document rather than as a brochure bolted on.
   ────────────────────────────────────────────────────────────── */

/** A real client quote. Never invented — see `Testimonial`. */
export interface CaseQuote {
  text: string;
  /** The person who said it. */
  name: string;
  /** Their role, in their words. */
  role: string;
  company: string;
}

/** One of the two or three calls the engagement turned on. */
export interface CaseDecision {
  title: string;
  body: string[];
}

/** A row of the facts block: engagement, years, stack, credits. */
export interface CaseFact {
  label: string;
  value: string;
  /** Stack lines and dates are data, so they are set in the mono. */
  data?: boolean;
}

/** A figure and the public page it can be checked against. */
export interface CaseEvidence {
  value: string;
  label: string;
  source: string;
  href: string;
}

/* ── A section ────────────────────────────────────────────────
   Rule, heading in the narrow left column, body at reading width
   in the right one. Identical to the block layout on `/legal/`. */
export function CaseSection({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-16 md:mt-24 ${className}`}>
      <Rule />
      <div className="pt-8 grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-x-10 gap-y-5">
        <h2 className="reveal font-sans text-[1.15rem] font-600 leading-[1.3] tracking-[-0.018em] text-text-main">
          {title}
        </h2>
        <div className="reveal d1">{children}</div>
      </div>
    </section>
  );
}

/* ── The decisions ────────────────────────────────────────────
   The heart of the page, and the only part set in the display
   serif: each decision states the call in one line and then argues
   it. Numbered, because "the second thing we did" is how people
   refer back to them, and a reader who only takes the headings
   away has still taken the argument away. */
export function Decisions({ items }: { items: CaseDecision[] }) {
  return (
    <ol className="flex flex-col gap-12 md:gap-14 stagger">
      {items.map((item, i) => (
        <li key={item.title}>
          <span className="font-mono text-[0.72rem] font-500 tracking-[0.12em] text-text-light">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2.5 display text-[1.4rem] md:text-[1.6rem] leading-[1.2] tracking-[-0.02em] text-text-main max-w-[24ch] text-balance">
            {item.title}
          </h3>
          <Prose paragraphs={item.body} className="mt-4" />
        </li>
      ))}
    </ol>
  );
}

/* A plain list, dashed like the one on the legal notice. Used for
   "what shipped", where the content really is an inventory. */
export function CaseList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3 max-w-[62ch]">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-5 text-text-muted leading-[1.65] before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-hairline">
          {inline(item)}
        </li>
      ))}
    </ul>
  );
}

/* ── A screenshot ─────────────────────────────────────────────
   `width` and `height` are not decoration: without them the
   browser reserves no space and the page reflows around the image
   as it arrives. Every `<img>` on the site carries its natural
   size for that reason. */
export function Shot({
  src,
  alt,
  width,
  height,
  caption,
  href,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  href?: string;
}) {
  const image = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={width}
      height={height}
      className="block w-full h-auto"
    />
  );

  return (
    <figure className="mt-8">
      <div className="overflow-hidden rounded-[1.15rem] border border-hairline bg-bg-alt shadow-[0_30px_70px_-45px_rgba(0,0,0,0.5)]">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="block">
            {image}
          </a>
        ) : (
          image
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[0.72rem] leading-[1.5] tracking-[-0.01em] text-text-light">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ── The outcome ──────────────────────────────────────────────
   Figures only where a stranger can go and check them. `Evidence`
   carries the source link inside the component precisely so that
   an unsourced number cannot be added without noticing. */
export function CaseOutcome({ items }: { items: CaseEvidence[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-8">
      {items.map((item) => (
        <Evidence
          key={item.label}
          value={item.value}
          label={item.label}
          source={item.source}
          href={item.href}
        />
      ))}
      <div className="border-t border-hairline-soft" />
    </div>
  );
}

/* ── The testimonial slot ─────────────────────────────────────
   Renders nothing at all while `quote` is null, which is the
   state it ships in. The placeholder quotes that used to be on
   this site were removed because an invented endorsement is worse
   than an absent one — so this component has no fallback, no
   skeleton and no "quote coming soon".

   To fill it: replace `quote: null` in the page's `copy.en.ts` and
   `copy.es.ts` with the real words, the person's name, their role
   and their company. The Spanish file takes the quote in the
   language the person actually said it in — a client quote is
   evidence, and translating it makes it something else. */
export function Testimonial({ quote }: { quote: CaseQuote | null }) {
  if (!quote) return null;

  return (
    <section className="mt-16 md:mt-24">
      <Rule />
      <figure className="pt-10 md:pt-12 max-w-[46rem] reveal">
        <blockquote className="display text-[1.5rem] md:text-[1.9rem] leading-[1.3] tracking-[-0.02em] text-text-main text-balance">
          “{quote.text}”
        </blockquote>
        <figcaption className="mt-6 font-mono text-[0.74rem] tracking-[-0.01em] text-text-light">
          {quote.name} — {quote.role}, {quote.company}
        </figcaption>
      </figure>
    </section>
  );
}

/* ── The facts ────────────────────────────────────────────────
   What the engagement was, when, on what, and by whom. A
   definition list rather than prose: a reader checking whether we
   have done their kind of work is scanning, not reading. Names are
   named — a credit with no name behind it is not a credit. */
export function CaseFacts({
  title,
  rows,
  stack,
  stackLabel,
  note,
}: {
  title: string;
  rows: CaseFact[];
  stack?: string[];
  stackLabel?: string;
  note?: string[];
}) {
  return (
    <section className="mt-16 md:mt-24">
      <Rule />
      <div className="pt-8 grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-x-10 gap-y-5">
        <h2 className="reveal font-sans text-[1.15rem] font-600 leading-[1.3] tracking-[-0.018em] text-text-main">
          {title}
        </h2>

        <div className="reveal d1">
          <dl className="stagger">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 min-[640px]:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] gap-x-8 gap-y-1 border-t border-hairline-soft py-4">
                <dt className="font-mono text-[0.72rem] font-500 uppercase tracking-[0.12em] text-text-light min-[640px]:pt-1">
                  {row.label}
                </dt>
                <dd
                  className={`text-text-main max-w-[52ch] leading-[1.6] ${
                    row.data ? 'font-mono text-[0.92rem] tracking-[-0.01em]' : ''
                  }`}>
                  {inline(row.value)}
                </dd>
              </div>
            ))}

            {stack && stack.length > 0 && (
              <div className="grid grid-cols-1 min-[640px]:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] gap-x-8 gap-y-2 border-t border-hairline-soft py-4">
                <dt className="font-mono text-[0.72rem] font-500 uppercase tracking-[0.12em] text-text-light min-[640px]:pt-1">
                  {stackLabel}
                </dt>
                {/* A list rather than a row of loose spans: the plain-text
                    twin the prerender emits reads these one per line instead
                    of running "Cloud Run Cloud SQL Postgres" together. */}
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {stack.map((s) => (
                      <li key={s}>
                        <Tag>{s}</Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            <div className="border-t border-hairline-soft" />
          </dl>

          {note && note.length > 0 && (
            <Prose paragraphs={note} className="mt-6 text-[0.95rem]" />
          )}
        </div>
      </div>
    </section>
  );
}

/* ── The way out ──────────────────────────────────────────────
   A case study that ends at the last full stop wastes the only
   moment the reader is convinced. Two exits: talk to us, or read
   the rest of the work. */
export function CaseFooter({
  title,
  body,
  primary,
  primaryHref,
  secondary,
  secondaryHref,
}: {
  title: string;
  body: string;
  primary: string;
  primaryHref: string;
  secondary: string;
  secondaryHref: string;
}) {
  return (
    <section className="mt-16 md:mt-24">
      <Rule />
      <div className="pt-10 md:pt-12 flex flex-col gap-6 reveal">
        <h2 className="display text-[1.7rem] md:text-[2.1rem] leading-[1.18] tracking-[-0.025em] text-text-main max-w-[20ch] text-balance">
          {title}
        </h2>
        <p className="text-text-muted leading-[1.65] max-w-[46ch]">{body}</p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Button href={primaryHref}>
            {primary}
            <ArrowRight className="transition-transform duration-300 ease-expo group-hover/btn:translate-x-0.5" />
          </Button>
          {/* Wrapped so the two labels land on separate lines in the
              plain-text twin rather than as one run-on sentence. */}
          <div>
            <a
              href={secondaryHref}
              className="group/link inline-flex items-center gap-1.5 text-text-main font-500 hover:text-accent transition-colors duration-300">
              {secondary}
              <ArrowRight className="transition-transform duration-300 ease-expo group-hover/link:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
