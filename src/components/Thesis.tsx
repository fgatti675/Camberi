import { CONTAINER, SECTION_LG, SectionHead, Evidence } from './ui';
import { t } from '../i18n';

/* ──────────────────────────────────────────────────────────────
   Why us, then the evidence for it.

   This section used to run as two columns with the statement stuck
   to the left rail and the paragraphs on the right, and it did not
   work: the sticky heading scrolled away and left the entire left
   half of the screen empty for the length of the argument, and the
   conclusion sat to the *left* of the paragraph that sets it up,
   so the eye read the punchline before the joke.

   It now runs straight down the page in the order the argument is
   actually made — claim, three paragraphs of why, the conclusion at
   statement size, then six numbers you can go and check.
   ────────────────────────────────────────────────────────────── */
export function Thesis() {
  return (
    <section id="about" className={`${SECTION_LG} bg-bg-alt`}>
      <div className={CONTAINER}>
        <SectionHead
          title={t.thesis.title}
          intro={t.thesis.p1}
          titleClass="max-w-[13ch]"
          className="mb-14 md:mb-18"
        />

        {/* The argument. Two columns, read left to right, both at a
            proper measure rather than one wide column of nothing. */}
        <div className="grid grid-cols-1 min-[820px]:grid-cols-2 gap-x-14 gap-y-6 text-[1.06rem] md:text-[1.12rem] leading-[1.65] text-text-muted">
          <p className="reveal max-w-[46ch]">{t.thesis.p2}</p>
          <p className="reveal d1 max-w-[46ch]">{t.thesis.p3}</p>
        </div>

        {/* The conclusion, at statement size, underneath the argument
            that earns it. */}
        <p className="mt-16 md:mt-24 display text-[2rem] md:text-[2.7rem] leading-[1.08] text-text-main text-balance max-w-[24ch] wipe">
          {t.thesis.p4}
        </p>

        {/* ── The ledger ────────────────────────────────────────────
            Six figures, each one a link to the place it comes from. */}
        <div className="mt-20 md:mt-28">
          <p className="display text-[1.6rem] md:text-[1.95rem] leading-[1.15] text-text-main max-w-[26ch] mb-10 md:mb-12 reveal">
            {t.thesis.ledgerTitle}
          </p>

          <div className="reveal">
            {t.thesis.ledger.map((e) => (
              <Evidence
                key={e.source}
                value={e.value}
                label={e.label}
                source={e.source}
                href={e.href}
              />
            ))}
            <div className="border-t border-hairline-soft" />
          </div>
        </div>
      </div>
    </section>
  );
}
