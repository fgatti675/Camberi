import { CONTAINER, SECTION_LG, SectionHead, Button, ArrowRight, ArrowUpRight } from './ui';
import { t } from '../i18n';
import { SERVICE_PATHS, servicePath } from '../pages/services/service';

/* ──────────────────────────────────────────────────────────────
   A scale of engagements, not a list of them.

   This section already carried the one number a buyer actually
   wants — how long each engagement runs — and was spending it on a
   grey line of small print under each item. Drawn to a shared axis
   instead, the same seven items answer "how much am I committing
   to?" at a glance: the architecture review is a tick, building a
   product runs off to six months, and the distance between them is
   the argument the heading is making.

   It also gives the section something to look at. Every other
   section has an image, a figure or a gradient; this one had
   nothing but paragraphs.
   ────────────────────────────────────────────────────────────── */

/* The longest engagement sets the scale, so the axis never has dead
   space at the end and never clips a bar. */
const SCALE_WEEKS = Math.max(...t.engagements.items.map((e) => e.weeks[1]));
const TICKS = [4, 8, 12, 16, 20, 24].filter((w) => w < SCALE_WEEKS);

const pct = (weeks: number) => (weeks / SCALE_WEEKS) * 100;

/* Where a bar starts and how wide it runs, as percentages of the track. */
function geometry(weeks: number[]) {
  const left = pct(weeks[0]);
  return { left, width: Math.max(pct(weeks[1]) - left, MIN_BAR_PCT) };
}

/* A fixed-duration engagement is a point, not a span. Give it enough
   width to read as a mark rather than collapsing to nothing. */
const MIN_BAR_PCT = 2.2;

const GRID =
  'min-[820px]:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] min-[1100px]:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]';

function Bar({ weeks, lead }: { weeks: number[]; lead: boolean }) {
  const { left, width } = geometry(weeks);
  return (
    <div
      aria-hidden="true"
      className="relative h-[0.42rem] w-full rounded-full bg-black/[0.07] overflow-hidden">
      <div
        className="bar-fill absolute inset-y-0 rounded-full"
        style={{
          left: `${left}%`,
          width: `${width}%`,
          background: lead ? 'var(--color-accent)' : 'var(--color-text-main)',
        }}
      />
    </div>
  );
}

export function Engagements() {
  return (
    <section id="services" className={`${SECTION_LG} bg-bg-main`}>
      <div className={CONTAINER}>
        <SectionHead
          title={t.engagements.title}
          intro={t.engagements.intro}
          titleClass="max-w-[16ch]"
          className="mb-14 md:mb-16"
        />

        {/* The axis, aligned to the bar column so every row reads against
            the same ruler. */}
        <div className={`hidden min-[820px]:grid ${GRID} gap-x-12 pb-3`}>
          <span className="label text-text-light self-end">{t.engagements.axisLabel}</span>
          <div className="relative h-4">
            {TICKS.map((w) => (
              <span
                key={w}
                className="absolute bottom-0 font-mono text-[0.68rem] text-text-light -translate-x-1/2"
                style={{ left: `${pct(w)}%` }}>
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="stagger">
          {t.engagements.items.map((e, i) => (
            /* Each row now leads somewhere: the engagement has a page of its
               own under /services/, and this list is the way in from the home
               page. The whole row is the target rather than a small link at
               the end of the paragraph. */
            <a
              key={e.title}
              href={servicePath(SERVICE_PATHS[i])}
              aria-label={`${e.title} — ${t.engagements.readMore}`}
              className={`group grid grid-cols-1 ${GRID} gap-x-12 gap-y-4 items-start border-t border-hairline pt-6 pb-7 transition-colors duration-300 hover:border-text-main`}>
              <div>
                <h3
                  className={`leading-[1.25] tracking-[-0.02em] text-text-main text-balance transition-colors duration-300 group-hover:text-accent ${
                    i === 0 ? 'text-[1.3rem] font-600' : 'text-[1.08rem] font-600'
                  }`}>
                  {e.title}
                </h3>
                <p className="mt-2.5 text-[0.97rem] leading-[1.6] text-text-muted max-w-[44ch]">
                  {e.description}
                </p>
                <span className="mt-3.5 inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-text-light transition-colors duration-300 group-hover:text-accent">
                  {t.engagements.readMore}
                  <ArrowUpRight
                    size={11}
                    className="shrink-0 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>

              <div className="min-[820px]:pt-2">
                <Bar weeks={e.weeks} lead={i === 0} />
                {/* Indented to its own bar, and only once the chart exists —
                    stacked on a phone there is no track to align to. */}
                <span
                  className="mt-3 block font-mono text-[0.72rem] tracking-[0.02em] text-text-light min-[820px]:[padding-left:var(--bar-left)]"
                  style={{ '--bar-left': `${geometry(e.weeks).left}%` } as React.CSSProperties}>
                  {e.scope}
                </span>
              </div>
            </a>
          ))}
          <div className="border-t border-hairline" />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 reveal">
          <p className="text-text-muted text-[1.05rem]">{t.engagements.unsure}</p>
          <Button href="#contact" size="sm">
            {t.engagements.unsureCta}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
