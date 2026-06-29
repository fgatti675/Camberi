interface ServiceData { icon: React.ReactNode; title: string; description: string; }

const services: ServiceData[] = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
    title: 'Web applications',
    description: 'Full-stack SaaS platforms and dashboards, built with React, Next.js and TypeScript — and the polish of a product company.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6h.01M6 18h.01" /></svg>,
    title: 'Backend & infrastructure',
    description: 'Robust APIs, data models and cloud infrastructure your team can trust — Node, Postgres, Firebase and Google Cloud.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" /></svg>,
    title: 'AI & automation',
    description: 'LLM features, agents and MCP integrations that do real work — from RAG to workflow automation, shipped to production.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="3" /><path d="M12 18h.01" /></svg>,
    title: 'Mobile apps',
    description: 'Cross-platform apps with a native feel, from prototype to the App Store — React Native and Flutter.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" /></svg>,
    title: 'Product design',
    description: 'Interfaces and design systems that make complex products feel obvious. UX strategy, prototyping and brand.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    title: 'Open source & advisory',
    description: 'We maintain OSS used by thousands. Architecture reviews, fractional-CTO support and team enablement.',
  },
];

export function Services() {
  return (
    <section id="services" className="section section-dark">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">What we do</span>
          <h2>One team for the whole product.</h2>
          <p className="lead">From the first sketch to a product running in production — design, engineering and AI under one roof.</p>
        </div>

        <div className="svc-grid">
          {services.map((s, i) => (
            <article key={s.title} className={`svc reveal d${(i % 3) + 1}`}>
              <span className="svc__icon">{s.icon}</span>
              <h3 className="svc__title">{s.title}</h3>
              <p className="svc__desc">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
