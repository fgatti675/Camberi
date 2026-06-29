interface Metric { value: string; label: string; }
interface ProjectData {
  id: string;
  domain: string;
  kicker: string;
  title: string;
  description: string;
  metrics: Metric[];
  link: string;
  mock: React.ReactNode;
}

/* ── Minimal greyscale product mock-ups (no fake screenshots, no colour) ── */

function CmsMock() {
  return (
    <div className="mock mock--cms" aria-hidden="true">
      <aside className="mock__side">
        <span className="mock__brand" />
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="mock__nav" style={{ width: `${60 + (i % 3) * 14}%` }} />
        ))}
      </aside>
      <div className="mock__main">
        <div className="mock__top">
          <span className="mock__h" />
          <span className="mock__btn" />
        </div>
        <div className="mock__table">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="mock__row">
              <span className="mock__avatar" />
              <span className="mock__cell" style={{ width: '34%' }} />
              <span className="mock__cell" style={{ width: '22%' }} />
              <span className="mock__pill" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelMock() {
  return (
    <div className="mock mock--panel" aria-hidden="true">
      <aside className="mock__side">
        <span className="mock__brand" />
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="mock__nav" style={{ width: `${55 + (i % 2) * 22}%` }} />
        ))}
      </aside>
      <div className="mock__main">
        <div className="mock__stats">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="mock__stat">
              <span className="mock__stat-n" />
              <span className="mock__stat-l" />
            </div>
          ))}
        </div>
        <div className="mock__code">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="mock__code-line" style={{ width: `${[70, 52, 84, 40, 64][i]}%`, marginLeft: i === 1 || i === 3 ? '1.5rem' : 0 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MotionMock() {
  return (
    <div className="mock mock--motion" aria-hidden="true">
      <div className="mock__stage">
        <svg viewBox="0 0 120 140" className="mock__figure" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="60" cy="22" r="9" />
          <path d="M60 31v44" />
          <path d="M60 40 34 56M60 40l26 16" />
          <path d="M60 75 42 116M60 75l18 41" />
          <circle cx="34" cy="56" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="86" cy="56" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="42" cy="116" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="78" cy="116" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="60" cy="40" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="60" cy="75" r="3.5" fill="currentColor" stroke="none" />
        </svg>
        <span className="mock__scan" />
      </div>
      <aside className="mock__readout">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mock__metric-row">
            <span className="mock__metric-l" style={{ width: `${40 + (i % 3) * 12}%` }} />
            <span className="mock__metric-bar"><span style={{ width: `${[80, 55, 92, 38, 68][i]}%` }} /></span>
          </div>
        ))}
      </aside>
    </div>
  );
}

const projects: ProjectData[] = [
  {
    id: 'firecms',
    domain: 'firecms.co',
    kicker: 'Our flagship · since 2019',
    title: 'FireCMS',
    description:
      'One of the most popular content management systems for Firebase. What began as an internal tool has been built and maintained in the open for years, and now powers tens of thousands of projects worldwide — with a cloud platform and enterprise tier on top.',
    metrics: [
      { value: '10k+', label: 'projects powered' },
      { value: 'Firebase', label: '+ MongoDB' },
      { value: 'Open', label: 'source' },
    ],
    link: 'https://firecms.co',
    mock: <CmsMock />,
  },
  {
    id: 'rebase',
    domain: 'rebase.pro',
    kicker: 'Our product · 2024',
    title: 'Rebase',
    description:
      'A production-ready admin panel, REST & GraphQL APIs, a typed SDK and real-time sync — all generated from your Postgres schema. From schema to running back-office in minutes.',
    metrics: [
      { value: 'Postgres', label: 'native' },
      { value: 'Typed', label: 'SDK' },
      { value: 'REST + GraphQL', label: 'APIs' },
    ],
    link: 'https://rebase.pro',
    mock: <PanelMock />,
  },
  {
    id: 'medicalmotion',
    domain: 'medicalmotion.com',
    kicker: 'Client product · AI healthcare',
    title: 'MedicalMotion',
    description:
      'An AI motion-tracking platform for healthcare professionals: precise movement analysis and rehabilitation monitoring through computer vision, delivered as a polished clinical product.',
    metrics: [
      { value: 'Real-time', label: 'pose tracking' },
      { value: 'Computer', label: 'vision' },
      { value: 'Clinical', label: 'grade UX' },
    ],
    link: 'https://medicalmotion.com',
    mock: <MotionMock />,
  },
];

export function Portfolio() {
  return (
    <section id="work" className="section section-alt">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Selected work</span>
          <h2>Products that speak for themselves.</h2>
          <p className="lead">These aren&apos;t mockups. They&apos;re real products we&apos;ve designed, built and run for years — powering tens of thousands of projects around the world.</p>
        </div>

        <div className="work">
          {projects.map((p, i) => (
            <article key={p.id} className={`work-row reveal ${i % 2 ? 'work-row--reverse' : ''}`}>
              <div className="work-row__media">
                <div className="frame">
                  <div className="frame__bar">
                    <span className="frame__dots"><i /><i /><i /></span>
                    <span className="frame__url">{p.domain}</span>
                  </div>
                  <div className="frame__screen">{p.mock}</div>
                </div>
              </div>

              <div className="work-row__body">
                <span className="work-row__kicker">{p.kicker}</span>
                <h3 className="work-row__title">{p.title}</h3>
                <p className="work-row__desc">{p.description}</p>

                <div className="work-row__metrics">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="work-metric">
                      <span className="work-metric__value">{m.value}</span>
                      <span className="work-metric__label">{m.label}</span>
                    </div>
                  ))}
                </div>

                <a href={p.link} target="_blank" rel="noopener noreferrer" className="tlink work-row__link">
                  Visit {p.title}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
