import { CONTAINER, SECTION, SectionHeading } from './ui';

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
    <div className="h-full flex text-black/16" aria-hidden="true">
      <aside className="w-[26%] p-[1.1rem_0.9rem] flex flex-col gap-2.5 bg-bg-alt border-r border-hairline-soft">
        <span className="h-2.8 w-11/12 rounded-[4px] bg-black/28 mb-2" />
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-2 rounded-[4px] bg-black/10" style={{ width: `${60 + (i % 3) * 14}%` }} />
        ))}
      </aside>
      <div className="flex-1 p-[1.1rem] flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <span className="h-2.8 w-[30%] rounded-[4px] bg-black/22" />
          <span className="h-5 w-18 rounded-[6px] bg-black/82" />
        </div>
        <div className="flex flex-col gap-[0.55rem]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 pb-[0.55rem] border-b border-hairline-soft">
              <span className="w-4.5 h-4.5 rounded-full bg-black/12 shrink-0" />
              <span className="h-2 rounded-[4px] bg-black/10" style={{ width: '34%' }} />
              <span className="h-2 rounded-[4px] bg-black/10" style={{ width: '22%' }} />
              <span className="ml-auto w-9.5 h-3.5 rounded-full bg-black/8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelMock() {
  return (
    <div className="h-full flex text-black/16" aria-hidden="true">
      <aside className="w-[26%] p-[1.1rem_0.9rem] flex flex-col gap-2.5 bg-bg-alt border-r border-hairline-soft">
        <span className="h-2.8 w-11/12 rounded-[4px] bg-black/28 mb-2" />
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-2 rounded-[4px] bg-black/10" style={{ width: `${55 + (i % 2) * 22}%` }} />
        ))}
      </aside>
      <div className="flex-1 p-[1.1rem] flex flex-col gap-3.5">
        <div className="grid grid-cols-4 gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-2.8 border border-hairline-soft rounded-[8px] flex flex-col gap-1.5">
              <span className="h-3.2 w-[60%] rounded-[4px] bg-black/26" />
              <span className="h-1.6 w-[85%] rounded-[4px] bg-black/10" />
            </div>
          ))}
        </div>
        <div className="mt-1.5 p-3.5 bg-bg-alt border border-hairline-soft rounded-[8px] flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-2 rounded-[4px] bg-black/14" style={{ width: `${[70, 52, 84, 40, 64][i]}%`, marginLeft: i === 1 || i === 3 ? '1.5rem' : 0 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MotionMock() {
  return (
    <div className="h-full flex text-black/16 p-0" aria-hidden="true">
      <div className="relative flex-1 flex items-center justify-center bg-bg-alt border-r border-hairline-soft overflow-hidden">
        <svg viewBox="0 0 120 140" className="w-[42%] text-black/30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
        <span className="absolute left-0 right-0 top-1/2 h-[1px] bg-black/18" />
      </div>
      <aside className="w-[38%] p-[1.1rem] flex flex-col gap-3.5 justify-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <span className="h-2 rounded-[4px] bg-black/12" style={{ width: `${40 + (i % 3) * 12}%` }} />
            <span className="h-2 rounded-full bg-black/6 overflow-hidden"><span className="block h-full rounded-full bg-black/26" style={{ width: `${[80, 55, 92, 38, 68][i]}%` }} /></span>
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
    <section id="work" className={`${SECTION} bg-bg-main relative`}>
      <div className={CONTAINER}>
        <SectionHeading
          className="mb-16 reveal"
          eyebrow="Selected work"
          title="Products that speak for themselves."
          intro="These aren't mockups. They're real products we've designed, built and run for years — powering tens of thousands of projects around the world."
        />

        <div className="flex flex-col gap-26">
          {projects.map((p, i) => (
            <article key={p.id} className={`grid grid-cols-1 min-[860px]:grid-cols-[1.05fr_0.95fr] gap-9 min-[860px]:gap-16 items-center reveal group/row`}>
              <div className={`w-full ${i % 2 ? 'min-[860px]:order-2' : ''}`}>
                <div className="rounded-[1.1rem] overflow-hidden bg-bg-main border border-hairline shadow-[0_2px_4px_rgba(0,0,0,0.04),0_40px_80px_-50px_rgba(0,0,0,0.4)] transition-all duration-400 ease-apple group-hover/row:-translate-y-1.5 group-hover/row:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_50px_90px_-50px_rgba(0,0,0,0.45)]">
                  <div className="h-10 flex items-center gap-3 px-[0.9rem] bg-bg-main border-b border-hairline-soft">
                    <span className="inline-flex gap-1.5"><i className="w-2.5 h-2.5 rounded-full bg-black/12" /><i className="w-2.5 h-2.5 rounded-full bg-black/12" /><i className="w-2.5 h-2.5 rounded-full bg-black/12" /></span>
                    <span className="flex-1 max-w-[60%] mx-auto text-center bg-bg-main border border-hairline-soft rounded-full text-[0.74rem] text-text-light px-[0.8rem] py-[0.22rem]">{p.domain}</span>
                  </div>
                  <div className="h-[300px] max-sm:h-[240px] overflow-hidden bg-bg-main">{p.mock}</div>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[0.78rem] font-600 tracking-[0.06em] uppercase text-text-light">{p.kicker}</span>
                <h3 className="mt-2.5 text-[2.25rem]">{p.title}</h3>
                <p className="mt-4 text-text-muted text-[1.08rem] leading-[1.55] max-w-[30rem]">{p.description}</p>

                <div className="mt-7.5 flex gap-10 flex-wrap">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="block text-[1.3rem] font-600 text-text-main tracking-[-0.02em]">{m.value}</span>
                      <span className="block mt-0.5 text-[0.82rem] text-text-light">{m.label}</span>
                    </div>
                  ))}
                </div>

                <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent font-500 text-[1.0625rem] mt-7.5 group/link hover:underline decoration-1 underline-offset-[3px]">
                  Visit {p.title}
                  <svg className="group-hover/link:translate-x-0.5 transition-transform duration-250 ease-apple" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
