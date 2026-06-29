import { CONTAINER, SECTION_BEFORE_DIVIDER, Eyebrow, CARD, CARD_HOVER, Button } from './ui';

interface Repo {
  name: string;
  path: string;
  description: string;
  language: string;
  langColor: string;
  tags: string[];
  href: string;
}

/* Real repos — verify the exact paths/handles before launch. */
const repos: Repo[] = [
  {
    name: 'FireCMS',
    path: 'firecmsco/firecms',
    description: 'A headless CMS and admin panel built on Firebase & MongoDB. Fully extensible, used by teams worldwide.',
    language: 'TypeScript',
    langColor: '#3178c6',
    tags: ['CMS', 'React', 'Firebase'],
    href: 'https://github.com/firecmsco/firecms',
  },
  {
    name: 'Neat',
    path: '@firecms/neat',
    description: 'The WebGL gradient engine powering the animated backgrounds on this very page. Three.js under the hood.',
    language: 'TypeScript',
    langColor: '#3178c6',
    tags: ['WebGL', 'Three.js', 'Shaders'],
    href: 'https://github.com/firecmsco/neat',
  },
  {
    name: 'Rebase',
    path: 'rebase.pro',
    description: 'Production-ready admin panel, REST & GraphQL APIs and a typed SDK — generated straight from your Postgres schema.',
    language: 'TypeScript',
    langColor: '#3178c6',
    tags: ['Postgres', 'SDK', 'Realtime'],
    href: 'https://rebase.pro',
  },
];

export function OpenSource() {
  return (
    <section id="open-source" className={`${SECTION_BEFORE_DIVIDER} bg-bg-main border-t border-hairline-soft`}>
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 min-[860px]:grid-cols-[0.9fr_1.1fr] gap-12 min-[860px]:gap-16 items-center mb-14">
          <div className="reveal">
            <Eyebrow>Open source</Eyebrow>
            <h2 className="text-text-main">We build in the open.</h2>
            <p className="mt-5 text-[1.2rem] md:text-[1.35rem] leading-[1.45] font-400 tracking-[-0.016em] text-text-muted">
              Our tools are used by thousands of developers every day. Maintaining open-source
              software in public sets a bar for quality, docs and reliability — and that bar
              goes straight into the work we do for you.
            </p>
            <Button href="https://github.com/firecmsco" external className="mt-7">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
              Explore our GitHub
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {repos.map((r, i) => (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block ${CARD} ${CARD_HOVER} p-6 reveal d${i + 1}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-text-light shrink-0"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z" /></svg>
                    <span className="font-600 text-text-main truncate">{r.name}</span>
                    <span className="text-[0.85rem] text-text-light font-mono truncate hidden sm:inline">{r.path}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-light shrink-0 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
                </div>
                <p className="mt-3 text-[0.95rem] leading-[1.55] text-text-muted">{r.description}</p>
                <div className="mt-4 flex items-center gap-4 text-[0.82rem] text-text-light">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.langColor }} />
                    {r.language}
                  </span>
                  <span className="flex gap-1.5">
                    {r.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full border border-hairline-soft">{t}</span>
                    ))}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
