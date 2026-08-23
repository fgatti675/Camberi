import { CONTAINER, SECTION_LG, SectionHead, Button, ArrowRight } from './ui';
import { t } from '../i18n';

/* ──────────────────────────────────────────────────────────────
   A services index, not a deck of cards.

   This used to be six identical panels of icon-plus-heading-plus-
   paragraph, which is the least informative shape a list of
   services can take: every option looks equally weighted and the
   icons carry no meaning. It is now set like the index of a
   catalogue — the one engagement we most want to sell runs the
   full measure, the rest sit in two dense columns separated by
   hairlines. Scannable, and honest about what leads.
   ────────────────────────────────────────────────────────────── */

const [featured, ...rest] = t.engagements.items;

export function Engagements() {
  return (
    <section id="services" className={`${SECTION_LG} bg-bg-main`}>
      <div className={CONTAINER}>
        <SectionHead
          title={t.engagements.title}
          intro={t.engagements.intro}
          titleClass="max-w-[16ch]"
          className="mb-16 md:mb-20"
        />

        {/* The lead engagement, at full measure. */}
        <a
          href="#contact"
          className="group block border-t-2 border-text-main pt-8 pb-10 reveal">
          <div className="grid grid-cols-1 min-[820px]:grid-cols-[1fr_1.25fr] gap-x-14 gap-y-4 items-start">
            <div className="flex flex-col gap-3">
              <h3 className="text-[1.5rem] min-[820px]:text-[1.75rem] font-600 leading-[1.15] tracking-[-0.024em] text-text-main text-balance max-w-[18ch]">
                {featured.title}
              </h3>
              <span className="font-mono text-[0.74rem] tracking-[0.02em] text-text-light">
                {featured.scope}
              </span>
            </div>
            <div>
              <p className="text-[1.08rem] leading-[1.62] text-text-muted max-w-[52ch]">
                {featured.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.95rem] font-500 text-accent">
                {t.engagements.unsureCta}
                <ArrowRight className="h-4 w-4 transition-transform duration-400 ease-expo group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </a>

        {/* Everything else, two dense columns. */}
        <div className="grid grid-cols-1 min-[820px]:grid-cols-2 gap-x-14 stagger">
          {rest.map((e) => (
            <article key={e.title} className="flex flex-col border-t border-hairline pt-7 pb-9">
              <h3 className="text-[1.1rem] font-600 leading-[1.25] tracking-[-0.02em] text-text-main text-balance">
                {e.title}
              </h3>
              <p className="mt-2.5 text-[0.97rem] leading-[1.6] text-text-muted flex-1 max-w-[46ch]">
                {e.description}
              </p>
              <span className="mt-5 font-mono text-[0.72rem] tracking-[0.02em] text-text-light">
                {e.scope}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-8 pt-10 border-t border-hairline flex flex-wrap items-center gap-x-6 gap-y-4 reveal">
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
