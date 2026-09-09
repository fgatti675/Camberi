import { PageLayout, PageHead } from '../../components/PageLayout';
import { CONTAINER, Rule, ArrowUpRight } from '../../components/ui';
import { locale } from '../../i18n';
import type { Route } from '../../routes/types';
import { entries, type LogEntry } from './entries';
import { logEn, type LogCopy } from './copy.en';
import { logEs } from './copy.es';

/* ──────────────────────────────────────────────────────────────
   The log.

   A dated list of what actually shipped, each line linking to the
   release, commit or page that proves it. It exists because the
   rest of this site argues that our claims are checkable, and a
   studio that says so should be able to show a year of receipts
   rather than a promise to write articles later. It is not a blog:
   there is no opinion in it, nothing planned appears, and an entry
   without a public source does not get written.

   The data is in `entries.ts` — curated and committed, never
   fetched during a build, so the build is offline and produces the
   same bytes twice. `scripts/log-candidates.mjs` prints what is new
   since the newest committed entry when it is time to refresh.

   Dates are formatted from the ISO string by hand rather than
   through `Intl` or `Date`: this page is rendered by Node at build
   time and by the browser on hydration, and a locale database or a
   timezone that differs between the two is a hydration mismatch.
   ────────────────────────────────────────────────────────────── */

const copy: LogCopy = locale === 'es' ? logEs : logEn;

/** `2026-08-26` → `[2026, 8, 26]`, with no `Date` and therefore no timezone. */
function parts(iso: string): [year: string, month: number, day: string] {
  const [y, m, d] = iso.split('-');
  return [y, Number(m), d];
}

function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/__([A-Z]+)__/g, (whole, key) => vars[key] ?? whole);
}

function monthHeading(iso: string): string {
  const [year, month] = parts(iso);
  return fill(copy.monthHeading, { MONTH: copy.months[month - 1], YEAR: year });
}

function longDate(iso: string): string {
  const [year, month, day] = parts(iso);
  return fill(copy.dateFormat, {
    DAY: String(Number(day)),
    MONTH: copy.months[month - 1],
    YEAR: year,
  });
}

interface Month {
  key: string;
  heading: string;
  entries: LogEntry[];
}

/** Newest first, then split at each change of month. */
function byMonth(all: LogEntry[]): Month[] {
  const sorted = [...all].sort((a, b) => b.date.localeCompare(a.date));
  const months: Month[] = [];
  for (const entry of sorted) {
    const key = entry.date.slice(0, 7);
    const last = months[months.length - 1];
    if (last?.key === key) last.entries.push(entry);
    else months.push({ key, heading: monthHeading(entry.date), entries: [entry] });
  }
  return months;
}

const months = byMonth(entries);
const newest = months[0]?.entries[0]?.date ?? '';

/* One row. Built like `Evidence` in ui.tsx — the figure, the claim and the
   place to go and check it — because it is making the same kind of argument,
   one line at a time. The whole row is the link: a date and a source label are
   small targets, and the sentence between them is what a reader aims at. */
function Row({ entry }: { entry: LogEntry }) {
  const external = entry.href.startsWith('http');
  const [, , day] = parts(entry.date);

  return (
    <a
      href={entry.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group grid grid-cols-[2.5rem_minmax(0,1fr)] min-[820px]:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,15rem)] items-baseline gap-x-6 gap-y-2 border-t border-hairline-soft py-5 transition-colors duration-300 ease-expo hover:border-text-main">
      <time
        dateTime={entry.date}
        title={longDate(entry.date)}
        className="font-mono text-[0.8rem] tracking-[-0.01em] text-text-light transition-colors duration-300 group-hover:text-text-main">
        {day}
      </time>
      <p className="text-[0.98rem] leading-[1.6] text-text-main max-w-[58ch]">
        {locale === 'es' ? entry.es : entry.en}
      </p>
      <span className="col-start-2 min-[820px]:col-start-3 font-mono text-[0.72rem] tracking-[-0.01em] text-text-light inline-flex items-center gap-1.5 min-[820px]:justify-self-end transition-colors duration-300 group-hover:text-accent">
        <span className="truncate">{entry.source}</span>
        <ArrowUpRight
          size={11}
          className="shrink-0 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </a>
  );
}

export function Log() {
  return (
    <PageLayout>
      <PageHead
        title={copy.title}
        intro={copy.intro}
        meta={fill(copy.meta, { COUNT: String(entries.length), DATE: longDate(newest) })}
        titleClass="max-w-[10ch]"
      />

      <div className={`${CONTAINER} pb-28 md:pb-36`}>
        {months.map((month) => (
          <section key={month.key} className="mt-14 md:mt-16 first:mt-16 md:first:mt-20">
            <Rule />
            <h2 className="reveal pt-7 md:pt-9 font-sans text-[1.05rem] font-600 leading-[1.3] tracking-[-0.015em] text-text-main">
              {month.heading}
            </h2>
            <div className="mt-6 stagger">
              {month.entries.map((entry) => (
                <Row key={`${entry.date}-${entry.href}`} entry={entry} />
              ))}
              <div className="border-t border-hairline-soft" />
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}

export const route: Route = {
  path: '/log/',
  priority: 0.5,
  component: Log,
  locales: {
    en: {
      title: 'Log — Camberi',
      description:
        'A dated record of what we shipped: FireCMS, Rebase and Neat releases, and changes to this site, each linking to the release, commit or page where you can check it.',
    },
    es: {
      title: 'Registro — Camberi',
      description:
        'Un registro con fechas de lo que hemos publicado: releases de FireCMS, Rebase y Neat, y cambios en esta web, con un enlace a la release, el commit o la página donde comprobarlo.',
    },
  },
};
