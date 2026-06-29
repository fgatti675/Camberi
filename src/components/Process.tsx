interface Step { n: string; title: string; desc: string; }

const steps: Step[] = [
  { n: '01', title: 'Discovery', desc: 'A focused kick-off to map goals, users and constraints. You leave with a clear scope, milestones and a fixed quote.' },
  { n: '02', title: 'Design', desc: 'We prototype fast and validate early — real, clickable interfaces, not endless documents.' },
  { n: '03', title: 'Build', desc: 'Weekly demos, a live staging environment, and code you own from day one. Senior engineers only.' },
  { n: '04', title: 'Ship & scale', desc: 'We launch, monitor and iterate — then hand off cleanly, or stay on as your long-term product partner.' },
];

export function Process() {
  return (
    <section id="process" className="section section-dark">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">How we work</span>
          <h2>Senior, transparent, fast.</h2>
          <p className="lead">You always know what&apos;s being built, why, and what it costs.</p>
        </div>

        <div className="steps">
          {steps.map((s, i) => (
            <div key={s.n} className={`step reveal d${i + 1}`}>
              <span className="step__n">{s.n}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
