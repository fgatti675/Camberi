import { CONTAINER, SECTION_AFTER_DIVIDER, SectionHeading, DarkGlow } from './ui';

interface Step { n: string; title: string; desc: string; }

const steps: Step[] = [
  { n: '01', title: 'Discovery', desc: 'A focused kick-off to map goals, users and constraints. You leave with a clear scope, milestones and a fixed quote.' },
  { n: '02', title: 'Design', desc: 'We prototype fast and validate early — real, clickable interfaces, not endless documents.' },
  { n: '03', title: 'Build', desc: 'Weekly demos, a live staging environment, and code you own from day one. Senior engineers only.' },
  { n: '04', title: 'Ship & scale', desc: 'We launch, monitor and iterate — then hand off cleanly, or stay on as your long-term product partner.' },
];

export function Process() {
  return (
    <section id="process" className={`relative ${SECTION_AFTER_DIVIDER} text-white bg-bg-dark isolate overflow-hidden`}>
      <DarkGlow />
      <div className={`relative z-10 ${CONTAINER}`}>
        <SectionHeading
          dark
          className="mb-16 reveal"
          eyebrow="How we work"
          title="Senior, transparent, fast."
          intro="You always know what's being built, why, and what it costs."
        />

        <div className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[940px]:grid-cols-4 gap-0 min-[540px]:gap-8 min-[940px]:gap-10">
          {steps.map((s, i) => (
            <div key={s.n} className={`reveal d${i + 1} pt-6 border-t border-white/10 max-[540px]:border-t-0 ${i === 0 ? 'max-[540px]:pt-0 max-[540px]:pb-7 max-[540px]:border-b max-[540px]:border-white/8' : 'max-[540px]:py-7 max-[540px]:border-b max-[540px]:border-white/8 last:max-[540px]:border-b-0 last:max-[540px]:pb-0'}`}>
              <span className="text-[0.95rem] font-700 text-accent-light tracking-normal">{s.n}</span>
              <h3 className="mt-3.5 text-white font-600">{s.title}</h3>
              <p className="mt-2.5 text-white/55 text-[0.98rem] leading-[1.55]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
