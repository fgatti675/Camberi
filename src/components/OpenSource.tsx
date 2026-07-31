import { CONTAINER, SECTION, Eyebrow, CARD, CARD_HOVER, Button, ArrowUpRight, GithubIcon } from './ui';
import { t } from '../i18n';

interface Repo {
  name: string;
  path: string;
  description: string;
  meta: string;
  tags: string[];
  href: string;
}

/* Figures come from the dictionary so they can be phrased per language
   (1.3k vs 1,3k); refresh them before a launch push. */
const repos: Repo[] = [
  {
    name: 'FireCMS',
    path: 'firecmsco/firecms',
    ...t.openSource.repos.firecms,
    tags: ['CMS', 'React', 'Firebase'],
    href: 'https://github.com/firecmsco/firecms',
  },
  {
    name: 'Rebase',
    path: 'rebase.pro',
    ...t.openSource.repos.rebase,
    tags: ['Postgres', 'SDK', 'Realtime'],
    href: 'https://rebase.pro',
  },
  {
    name: 'Neat',
    path: '@firecms/neat',
    ...t.openSource.repos.neat,
    tags: ['WebGL', 'Shaders', 'Three.js'],
    href: 'https://neat.firecms.co',
  },
];

export function OpenSource() {
  return (
    <section id="open-source" className={`${SECTION} bg-bg-main border-t border-hairline-soft`}>
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[0.9fr_1.1fr] gap-12 min-[900px]:gap-16 items-center">
          <div className="reveal">
            <Eyebrow>{t.openSource.eyebrow}</Eyebrow>
            <h2 className="text-text-main text-balance">{t.openSource.title}</h2>
            <p className="mt-5 text-[1.2rem] md:text-[1.3rem] leading-[1.5] font-400 tracking-[-0.016em] text-text-muted">
              {t.openSource.p1}
            </p>
            <p className="mt-4 text-[1.05rem] leading-[1.6] text-text-muted">
              {t.openSource.p2}
            </p>
            <Button href="https://github.com/firecmsco" external className="mt-8">
              <GithubIcon />
              {t.openSource.cta}
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {repos.map((r, i) => (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block ${CARD} ${CARD_HOVER} p-6 reveal d${i + 1}`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-text-light shrink-0">
                      <GithubIcon size={17} />
                    </span>
                    <span className="font-600 text-text-main truncate">{r.name}</span>
                    <span className="text-[0.85rem] text-text-light font-mono truncate hidden sm:inline">
                      {r.path}
                    </span>
                  </div>
                  <ArrowUpRight className="text-text-light shrink-0 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-3 text-[0.95rem] leading-[1.55] text-text-muted">{r.description}</p>
                <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-2 text-[0.82rem] text-text-light">
                  <span className="tabular-nums">{r.meta}</span>
                  <span className="flex gap-1.5">
                    {r.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full border border-hairline-soft">
                        {t}
                      </span>
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
