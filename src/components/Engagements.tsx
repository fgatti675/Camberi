import { CONTAINER, SECTION_LG, SectionHeading, CARD, CARD_HOVER, ArrowRight, Button } from './ui';
import { t } from '../i18n';

const icons: React.ReactNode[] = [
  (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
  ),
  (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 9v6M9 12h6" /></svg>
  ),
  (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" /><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" /></svg>
  ),
  (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" /></svg>
  ),
  (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  ),
  (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
  ),
];

export function Engagements() {
  return (
    <section id="services" className={`${SECTION_LG} bg-bg-main`}>
      <div className={CONTAINER}>
        <SectionHeading
          className="mb-16 md:mb-20 reveal"
          eyebrow={t.engagements.eyebrow}
          title={t.engagements.title}
          intro={t.engagements.intro}
        />

        <div className="grid grid-cols-1 min-[620px]:grid-cols-2 min-[960px]:grid-cols-3 gap-5">
          {t.engagements.items.map((e, i) => (
            <article key={e.title} className={`flex flex-col ${CARD} ${CARD_HOVER} p-8 reveal d${(i % 3) + 1}`}>
              <div className="flex items-center justify-between">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-[0.8rem] text-accent bg-accent/8 ring-1 ring-inset ring-accent/15">
                  {icons[i]}
                </span>
                <span className="text-[0.8rem] font-600 text-text-light tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-6 text-text-main font-600 text-[1.15rem] leading-[1.25]">{e.title}</h3>
              <p className="mt-2.5 text-text-muted text-[0.97rem] leading-[1.58] flex-1">{e.description}</p>
              <span className="mt-6 pt-4 border-t border-hairline-soft text-[0.82rem] text-text-light">
                {e.scope}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 reveal">
          <p className="text-text-muted text-[1.05rem]">{t.engagements.unsure}</p>
          <Button href="#contact" size="sm">
            {t.engagements.unsureCta}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
