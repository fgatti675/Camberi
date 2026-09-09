import { PageLayout, PageHead, Prose } from '../../components/PageLayout';
import {
  CONTAINER,
  SectionHead,
  Button,
  ArrowRight,
  ArrowUpRight,
  DarkGlow,
} from '../../components/ui';
import { t, locale } from '../../i18n';
import { SERVICE_PATHS, contactHref, servicePath } from './service';
import { servicesEn, type ServicesCopy } from './copy.en';
import { servicesEs } from './copy.es';

/* ──────────────────────────────────────────────────────────────
   The services hub.

   Four engagements used to be four anchors on one page, which meant
   the home page had to rank for automation, product engineering,
   Postgres and architecture review at the same time. Each is now a
   page; this one is how you choose between them.

   It reads the four titles, week ranges and scope lines straight
   from `t.engagements`, so the home page's list and this page can
   never drift apart. Only the choosing paragraph is written here.

   The bar chart is the same device the home page uses, and for the
   same reason: length is the one number a buyer wants before
   anything else, and drawn against a shared axis the four items
   answer "how much am I committing to?" at a glance.
   ────────────────────────────────────────────────────────────── */

const copy: ServicesCopy = locale === 'es' ? servicesEs : servicesEn;

const SCALE_WEEKS = Math.max(...t.engagements.items.map((e) => e.weeks[1]));
const TICKS = [4, 8, 12, 16, 20, 24].filter((w) => w < SCALE_WEEKS);
const MIN_BAR_PCT = 2.2;

const pct = (weeks: number) => (weeks / SCALE_WEEKS) * 100;

function geometry(weeks: number[]) {
  const left = pct(weeks[0]);
  return { left, width: Math.max(pct(weeks[1]) - left, MIN_BAR_PCT) };
}

const GRID =
  'min-[860px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[1100px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]';

export default function Services() {
  return (
    <PageLayout>
      <PageHead
        title={copy.title}
        intro={t.engagements.intro}
        meta={copy.meta}
        titleClass="max-w-[17ch]"
      />

      <div className={`${CONTAINER} mt-12 md:mt-16`}>
        <Prose paragraphs={copy.lead} className="reveal d2 text-[1.05rem]" />
      </div>

      <section className={`${CONTAINER} mt-16 md:mt-20`}>
        {/* The axis, aligned to the bar column so every row reads against
            the same ruler. Hidden when the layout stacks — there is no
            track to align to on a phone. */}
        <div className={`hidden min-[860px]:grid ${GRID} gap-x-12 pb-3`}>
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
          {t.engagements.items.map((item, i) => {
            const { left, width } = geometry(item.weeks);
            return (
              <a
                key={item.title}
                href={servicePath(SERVICE_PATHS[i])}
                aria-label={`${item.title} — ${t.engagements.readMore}`}
                className={`group grid grid-cols-1 ${GRID} gap-x-12 gap-y-5 items-start border-t border-hairline pt-7 pb-8 transition-colors duration-300 hover:border-text-main`}>
                <div>
                  <h2 className="font-sans text-[1.25rem] min-[860px]:text-[1.35rem] font-600 leading-[1.25] tracking-[-0.02em] text-text-main text-balance transition-colors duration-300 group-hover:text-accent">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-[0.99rem] leading-[1.62] text-text-muted max-w-[52ch]">
                    {copy.blurbs[i]}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.74rem] text-text-light transition-colors duration-300 group-hover:text-accent">
                    {t.engagements.readMore}
                    <ArrowUpRight
                      size={12}
                      className="shrink-0 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>

                <div className="min-[860px]:pt-2.5">
                  <div
                    aria-hidden="true"
                    className="relative h-[0.42rem] w-full rounded-full bg-black/[0.07] overflow-hidden">
                    <div
                      className="bar-fill absolute inset-y-0 rounded-full"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        background: i === 0 ? 'var(--color-accent)' : 'var(--color-text-main)',
                      }}
                    />
                  </div>
                  <span
                    className="mt-3 block font-mono text-[0.72rem] tracking-[0.02em] text-text-light min-[860px]:[padding-left:var(--bar-left)]"
                    style={{ '--bar-left': `${left}%` } as React.CSSProperties}>
                    {item.scope}
                  </span>
                </div>
              </a>
            );
          })}
          <div className="border-t border-hairline" />
        </div>
      </section>

      {/* ── The constant ────────────────────────────────────────
          The four differ in length and in subject; the way the work
          runs is identical, and it is the half of the decision a
          list of capabilities never answers. Same four steps as the
          home page, because they really are the same four steps. */}
      <section className="relative mt-20 md:mt-28 py-20 md:py-28 text-white bg-bg-dark isolate overflow-hidden">
        <DarkGlow />
        <div className={`relative z-10 ${CONTAINER}`}>
          <SectionHead
            dark
            title={copy.same.title}
            intro={copy.same.intro}
            titleClass="max-w-[15ch]"
            className="mb-14 md:mb-16"
          />
          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 min-[1000px]:grid-cols-4 gap-x-10 gap-y-12 stagger">
            {t.process.steps.map((step, i) => (
              <div key={step.title} className="relative pt-7">
                <span
                  aria-hidden="true"
                  className="rule absolute inset-x-0 top-0 h-px bg-white/30"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                />
                <span className="figure text-[0.85rem] text-accent-light">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-white font-600">{step.title}</h3>
                <p className="mt-2.5 text-white/60 text-[0.97rem] leading-[1.62]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} mt-20 md:mt-28 pb-28 md:pb-36`}>
        <SectionHead
          title={t.contact.title}
          intro={t.engagements.unsure}
          titleClass="max-w-[12ch]"
        />
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 reveal d1">
          <Button href={contactHref}>
            {t.engagements.unsureCta}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover/btn:translate-x-0.5" />
          </Button>
          <p className="font-mono text-[0.76rem] tracking-[0.01em] text-text-light">
            {t.contact.reply}
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
