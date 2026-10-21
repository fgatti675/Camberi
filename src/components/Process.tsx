import { CONTAINER, SECTION, SectionHead } from './ui';
import { AmbientGradient } from './AmbientGradient';
import { AMBIENT_PROCESS } from './neatConfigs';
import { t } from '../i18n';

/* A short dark beat in the middle of the long light stretch between the
   work section and the footer.

   The step numbers stay here — unlike everywhere else on the page, this
   sequence really is a sequence, and the reader needs to know that week
   one comes before the handover. Each step hangs off its own rule, and
   the rules draw in from the left in order, so the row reads as a
   timeline being laid down rather than four columns appearing at once. */
export function Process() {
  return (
    <section
      id="process"
      className={`relative ${SECTION} text-white bg-bg-dark isolate overflow-hidden`}>
      <AmbientGradient config={AMBIENT_PROCESS} className="h-[34rem]" strength={0.22} />
      <div className={`relative z-10 ${CONTAINER}`}>
        <SectionHead
          dark
          title={t.process.title}
          intro={t.process.intro}
          titleClass="max-w-[14ch]"
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 min-[560px]:grid-cols-2 min-[960px]:grid-cols-4 gap-x-10 gap-y-12 stagger">
          {t.process.steps.map((s, i) => (
            <div key={s.title} className="relative pt-7">
              <span
                aria-hidden="true"
                className="rule absolute inset-x-0 top-0 h-px bg-white/30"
                style={{ transitionDelay: `${i * 0.12}s` }}
              />
              <span className="figure text-[0.85rem] text-accent-light">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-white font-600">{s.title}</h3>
              <p className="mt-2.5 text-white/55 text-[0.97rem] leading-[1.62]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
