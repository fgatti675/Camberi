import { CONTAINER, SECTION_LG, Eyebrow, Stat } from './ui';
import { t } from '../i18n';

/* Every number here is checkable against a public source — GitHub, npm,
   or the client's own site. That is the whole point of the section. */
export function Thesis() {
  return (
    <section id="about" className={`${SECTION_LG} bg-bg-main border-t border-hairline-soft`}>
      <div className={CONTAINER}>
        <div className="reveal">
          <Eyebrow>{t.thesis.eyebrow}</Eyebrow>
          <h2 className="text-text-main max-w-[20ch] text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.06] tracking-[-0.035em]">
            {t.thesis.title}
          </h2>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 min-[860px]:grid-cols-2 gap-x-16 gap-y-6 max-w-[62rem]">
          <div className="flex flex-col gap-5 text-[1.1rem] md:text-[1.18rem] leading-[1.55] tracking-[-0.012em] text-text-muted reveal d1">
            <p>{t.thesis.p1}</p>
            <p>{t.thesis.p2}</p>
          </div>

          <div className="flex flex-col gap-5 text-[1.1rem] md:text-[1.18rem] leading-[1.55] tracking-[-0.012em] text-text-muted reveal d2">
            <p>{t.thesis.p3}</p>
            <p className="text-text-main font-500 text-[1.2rem] md:text-[1.3rem] leading-[1.45]">
              {t.thesis.p4}
            </p>
          </div>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-2 min-[940px]:grid-cols-4 gap-y-12 gap-x-8 border-t border-hairline pt-12">
          {t.thesis.stats.map((p, i) => (
            <div key={p.label} className={`reveal d${i + 1}`}>
              <Stat value={p.value} label={p.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
