import { CONTAINER, SECTION, SectionHeading } from './ui';
import { AmbientGradient } from './AmbientGradient';
import { AMBIENT_PROCESS } from './neatConfigs';
import { t } from '../i18n';

/* A short dark beat in the middle of the long light stretch between the
   work section and the footer. Hard edges top and bottom — the same
   crisp full-bleed language as the gradient bands. */
export function Process() {
  return (
    <section
      id="process"
      className={`relative ${SECTION} text-white bg-bg-dark isolate overflow-hidden`}>
      <AmbientGradient config={AMBIENT_PROCESS} className="h-[34rem]" />
      <div className={`relative z-10 ${CONTAINER}`}>
        <SectionHeading
          dark
          className="mb-16 reveal"
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          intro={t.process.intro}
        />

        <div className="grid grid-cols-1 min-[560px]:grid-cols-2 min-[960px]:grid-cols-4 gap-x-10 gap-y-10">
          {t.process.steps.map((s, i) => (
            <div key={s.title} className={`reveal d${i + 1} pt-6 border-t-2 border-white/25`}>
              <span className="text-[0.9rem] font-700 text-accent-light tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-white font-600">{s.title}</h3>
              <p className="mt-2.5 text-white/55 text-[0.97rem] leading-[1.58]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
