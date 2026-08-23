import { CONTAINER, SECTION_LG, SectionHead, Button, ArrowUpRight, GithubIcon } from './ui';
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

/* Repositories are listed the way a repository host lists them — as rows
   in a directory, with the path in the mono voice — rather than as three
   more rounded panels. The page already has enough panels. */
export function OpenSource() {
  return (
    <section id="open-source" className={`${SECTION_LG} bg-bg-alt`}>
      <div className={CONTAINER}>
        <SectionHead
          title={t.openSource.title}
          intro={t.openSource.p1}
          titleClass="max-w-[16ch]"
          className="mb-14 md:mb-16"
        />

        <div className="grid grid-cols-1 min-[900px]:grid-cols-[0.8fr_1.2fr] gap-x-16 gap-y-10">
          <div>
            <p className="text-[1.02rem] leading-[1.65] text-text-muted max-w-[38ch] reveal">
              {t.openSource.p2}
            </p>
            <div className="reveal d1">
              <Button href="https://github.com/firecmsco" external className="mt-7">
                <GithubIcon />
                {t.openSource.cta}
              </Button>
            </div>
          </div>

          <div className="stagger">
            {repos.map((r) => (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-t border-hairline py-6 transition-colors duration-400 ease-expo hover:border-text-main">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-text-light shrink-0 transition-colors duration-300 group-hover:text-text-main">
                    <GithubIcon size={17} />
                  </span>
                  <h3 className="text-[1.0625rem] font-600 text-text-main truncate">{r.name}</h3>
                  <span className="font-mono text-[0.78rem] text-text-light truncate hidden sm:inline">
                    {r.path}
                  </span>
                  <ArrowUpRight className="ml-auto text-text-light shrink-0 transition-all duration-300 ease-expo group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-3 text-[0.95rem] leading-[1.6] text-text-muted max-w-[46ch]">
                  {r.description}
                </p>
                <div className="mt-3.5 flex items-center flex-wrap gap-x-3 gap-y-2 font-mono text-[0.72rem] text-text-light">
                  <span>{r.meta}</span>
                  <span className="flex gap-1.5">
                    {r.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full border border-hairline-soft">
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>
              </a>
            ))}
            <div className="border-t border-hairline" />
          </div>
        </div>
      </div>
    </section>
  );
}
