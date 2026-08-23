import { CONTAINER, SECTION_LG, SectionHead, Button, ArrowRight, ArrowUpRight } from './ui';
import { t } from '../i18n';

/* ──────────────────────────────────────────────────────────────
   The automations thesis.

   Every product this studio has shipped does the same thing: it
   takes a job somebody was doing by hand and hands it to the
   machine. Nothing here is a promise — each row names a product
   that is live right now, and the row is a link to it.

   The typography carries the argument. The input is set in the
   mono voice, small and grey, because it is raw material: a
   schema, a URL, a question. The output is set in the display
   serif, large and black, because it is the finished thing. The
   reader watches material become work product six times without
   anyone having to say so.

   Three columns, like a specification sheet: which product, what
   it takes, what it gives back.
   ────────────────────────────────────────────────────────────── */

/* Written out in full rather than composed from a shared fragment:
   Tailwind scans source text for complete class names, so a variant
   glued on at runtime never reaches the stylesheet. */
const GRID_ROW =
  'min-[880px]:grid-cols-[9.5rem_minmax(0,0.72fr)_minmax(0,1.3fr)] min-[1180px]:grid-cols-[11rem_minmax(0,0.72fr)_minmax(0,1.3fr)]';
const GRID_HEAD =
  'grid-cols-[9.5rem_minmax(0,0.72fr)_minmax(0,1.3fr)] min-[1180px]:grid-cols-[11rem_minmax(0,0.72fr)_minmax(0,1.3fr)]';


function Row({
  from,
  to,
  product,
  href,
}: {
  from: string;
  to: string;
  product: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group grid grid-cols-1 ${GRID_ROW} items-center gap-y-3 min-[880px]:gap-x-10 py-7 min-[880px]:py-8 border-t border-hairline-soft transition-colors duration-500 ease-expo hover:border-hairline`}>
      {/* Which product. The index column of the sheet.

          No logo mark here on purpose: at sixteen pixels these read as
          grey smudges rather than as brands — medicalmotion's is a crop
          of a wordmark and loses its shape entirely — and they were the
          only non-typographic element in a table whose whole argument is
          made in type. The name carries it. */}
      <span className="flex items-center gap-2 min-w-0 order-2 min-[880px]:order-none">
        <span className="font-mono text-[0.74rem] tracking-[-0.01em] text-text-muted whitespace-nowrap transition-colors duration-500 ease-expo group-hover:text-accent">
          {product}
        </span>
        <ArrowUpRight
          size={11}
          className="shrink-0 text-text-light transition-all duration-500 ease-expo group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>

      {/* What it takes. */}
      <span className="order-1 min-[880px]:order-none min-[880px]:text-right font-mono text-[0.84rem] leading-[1.55] text-text-light transition-colors duration-500 ease-expo group-hover:text-text-muted">
        {from}
      </span>

      {/* What it gives back, and the divider it hangs off. The arrow is
          anchored to the divider rather than to a computed page fraction,
          so it stays put whatever the column widths resolve to. */}
      <span className="order-3 min-[880px]:order-none relative block min-[880px]:self-stretch min-[880px]:flex min-[880px]:flex-col min-[880px]:justify-center min-[880px]:pl-10 min-[880px]:border-l border-hairline-soft transition-colors duration-500 ease-expo group-hover:border-hairline">
        <span
          aria-hidden="true"
          className="tf-arrow pointer-events-none absolute left-0 top-1/2 hidden min-[880px]:flex">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline bg-bg-main text-text-light transition-all duration-500 ease-expo group-hover:border-accent group-hover:bg-accent group-hover:text-white group-hover:scale-110">
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-px" />
          </span>
        </span>
        <span className="tf-out display block text-[1.45rem] min-[880px]:text-[1.8rem] leading-[1.14] text-text-main text-balance">
          {to}
        </span>
      </span>
    </a>
  );
}

export function Automations() {
  return (
    <section id="automations" className={`${SECTION_LG} bg-bg-main`}>
      <div className={CONTAINER}>
        <SectionHead
          title={t.automations.title}
          intro={t.automations.intro}
          titleClass="max-w-[15ch]"
          className="mb-16 md:mb-20"
        />

        {/* Column captions, so the two voices are named once and the
            pattern is legible from the first row onward. */}
        <div className={`hidden min-[880px]:grid ${GRID_HEAD} gap-x-10 pb-4`}>
          <span />
          <span className="label text-right text-text-light">{t.automations.fromLabel}</span>
          <span className="label pl-10 text-text-light">{t.automations.toLabel}</span>
        </div>

        <div className="stagger">
          {t.automations.rows.map((r) => (
            <Row key={r.product} {...r} />
          ))}
        </div>
        <div className="border-t border-hairline-soft" />

        <div className="mt-14 flex flex-col min-[720px]:flex-row min-[720px]:items-center gap-6 min-[720px]:gap-10 reveal">
          <p className="max-w-[38rem] text-[1.05rem] leading-[1.6] text-text-muted">
            {t.automations.closing}
          </p>
          <Button href="#contact" className="shrink-0">
            {t.automations.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
