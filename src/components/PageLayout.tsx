import { Fragment, type ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Header } from './Header';
import { Footer } from './Footer';
import { CONTAINER, SectionHead } from './ui';
import { locale, localeHome } from '../i18n';

/* ──────────────────────────────────────────────────────────────
   The frame every page that is not the home page sits in.

   Two things it does that the home page does not need. The header
   starts in its light state, because there is no hero behind it to
   be transparent over. And the scroll spine is absent: it is a
   running head for the home page's nine sections, and a rail of
   ticks pointing at sections that are not here would be furniture
   for its own sake.

   Everything else — the container, the rule, the section head, the
   entrance choreography — is the same set of primitives the home
   page is built from, which is what makes an inner page read as
   part of the same document rather than as an annexe.
   ────────────────────────────────────────────────────────────── */
export function PageLayout({ children }: { children: ReactNode }) {
  useScrollAnimation();

  return (
    <>
      <Header variant="solid" />
      <main className="bg-bg-main">{children}</main>
      <Footer linkBase={localeHome[locale]} />
    </>
  );
}

/* ── The masthead ─────────────────────────────────────────────
   A page opens exactly the way a section does: a rule, a statement
   in the display serif, a standfirst beside it. The only
   differences are that the statement is the page's h1 and that it
   is set at section size rather than hero size — an inner page is
   a chapter, not a cover.

   `meta` is for the small print a document needs and a section does
   not: a last-updated date, a version, a jurisdiction. It sits
   under the rule in the mono voice, because that is what the mono
   voice is for.

   No eyebrow. They were removed from the whole site on purpose. */
export function PageHead({
  title,
  intro,
  meta,
  titleClass = 'max-w-[16ch]',
}: {
  title: ReactNode;
  intro?: ReactNode;
  meta?: ReactNode;
  titleClass?: string;
}) {
  return (
    <header className="pt-32 md:pt-44 pb-2">
      <div className={CONTAINER}>
        <SectionHead
          as="h1"
          title={title}
          intro={intro}
          titleClass={`text-[clamp(2.4rem,5.4vw,4.1rem)] tracking-[-0.028em] ${titleClass}`}
        />
        {meta && (
          <p className="reveal d2 mt-10 font-mono text-[0.74rem] tracking-[-0.01em] text-text-light">
            {meta}
          </p>
        )}
      </div>
    </header>
  );
}

/* ── Body copy ────────────────────────────────────────────────
   Pages whose content is paragraphs — a legal notice, a privacy
   policy, a service description — keep their words in a
   `copy.en.ts` / `copy.es.ts` pair beside the page, as plain
   strings. Two things those strings can carry:

     [label](href)   an inline link, external ones opened in a new tab
     __TOKEN__       a value from src/site.ts, passed in as `vars`

   Facts therefore never get typed into copy twice, and a corrected
   NIF or address propagates to every page that mentions it. */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const TOKEN = /__([A-Z0-9_]+)__/g;

const LINK_CLASS =
  'text-text-main underline decoration-hairline underline-offset-[0.2em] transition-colors duration-200 hover:text-accent hover:decoration-accent';

export function inline(text: string, vars?: Record<string, string>): ReactNode[] {
  const resolved = vars ? text.replace(TOKEN, (whole, key) => vars[key] ?? whole) : text;
  const out: ReactNode[] = [];
  let cursor = 0;

  for (const match of resolved.matchAll(LINK)) {
    const at = match.index ?? 0;
    if (at > cursor) out.push(<Fragment key={`t${cursor}`}>{resolved.slice(cursor, at)}</Fragment>);
    const href = match[2];
    const external = href.startsWith('http');
    out.push(
      <a
        key={`l${at}`}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={LINK_CLASS}>
        {match[1]}
      </a>
    );
    cursor = at + match[0].length;
  }
  if (cursor < resolved.length) out.push(<Fragment key="tail">{resolved.slice(cursor)}</Fragment>);
  return out;
}

export function Prose({
  paragraphs,
  vars,
  className = '',
}: {
  paragraphs: string[];
  vars?: Record<string, string>;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 text-text-muted leading-[1.65] max-w-[62ch] ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i}>{inline(p, vars)}</p>
      ))}
    </div>
  );
}
