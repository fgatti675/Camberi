import {
  CONTAINER_WIDE,
  SectionHeading,
  ArrowUpRight,
  Tag,
  CARD_DARK,
  CARD_DARK_HOVER,
} from './ui';
import { AmbientGradient } from './AmbientGradient';
import { AMBIENT_WORK } from './neatConfigs';
import { t } from '../i18n';

interface Project {
  id: string;
  kicker: string;
  title: string;
  /** The product's own logo mark, taken from its live site. */
  logo: string;
  lead: string;
  body: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  href: string;
  domain: string;
  image: string;
  /** Bloom colour behind the screenshot — taken from the product's own brand. */
  glow: string;
}

const projects: Project[] = [
  {
    id: 'medicalmotion',
    ...t.work.medicalmotion,
    title: 'medicalmotion',
    logo: '/brand/medicalmotion-icon.png',
    href: 'https://medicalmotion.com',
    domain: 'medicalmotion.com',
    image: '/work/medicalmotion.webp',
    glow: 'rgba(16,185,129,0.30)',
  },
  {
    id: 'firecms',
    ...t.work.firecms,
    title: 'FireCMS',
    logo: '/brand/firecms.svg',
    href: 'https://firecms.co',
    domain: 'firecms.co',
    image: '/work/firecms.webp',
    glow: 'rgba(255,122,0,0.26)',
  },
  {
    id: 'rebase',
    ...t.work.rebase,
    title: 'Rebase',
    logo: '/brand/rebase.svg',
    href: 'https://rebase.pro',
    domain: 'rebase.pro',
    image: '/work/rebase.webp',
    glow: 'rgba(0,90,255,0.34)',
  },
];

const alsoBuilt = [
  {
    title: 'Dataki',
    domain: 'dataki.ai',
    href: 'https://dataki.ai',
    logo: '/brand/dataki.svg',
    image: '/work/dataki.webp',
    description: t.work.dataki,
  },
  {
    title: 'Unbrand.my',
    domain: 'unbrand.my',
    href: 'https://unbrand.my',
    logo: '/brand/unbrand.svg',
    image: '/work/unbrand.webp',
    description: t.work.unbrand,
  },
  {
    title: 'Neat',
    domain: 'neat.firecms.co',
    href: 'https://neat.firecms.co',
    logo: '/brand/firecms.svg',
    image: '/work/neat.webp',
    description: t.work.neat,
  },
  {
    title: 'Dadaki',
    domain: 'dadaki.com',
    href: 'https://dadaki.com',
    logo: '/brand/dadaki.svg',
    image: '/work/dadaki.webp',
    description: t.work.dadaki,
  },
];

/** Browser chrome around a real screenshot, on the dark surface. The whole
    frame is a link — the section's claim is that you can go and use these. */
function Frame({
  domain,
  image,
  alt,
  href,
}: {
  domain: string;
  image: string;
  alt: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className="block rounded-[1.15rem] overflow-hidden bg-white/[0.05] border border-white/12 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] transition-all duration-500 ease-apple group-hover/row:-translate-y-1.5 group-hover/row:border-white/20">
      <div className="h-10 flex items-center gap-3 px-[0.9rem] border-b border-white/8 bg-white/[0.03]">
        <span className="inline-flex gap-1.5">
          <i className="w-2.5 h-2.5 rounded-full bg-white/14" />
          <i className="w-2.5 h-2.5 rounded-full bg-white/14" />
          <i className="w-2.5 h-2.5 rounded-full bg-white/14" />
        </span>
        <span className="flex-1 max-w-[62%] mx-auto flex items-center justify-center gap-1.5 bg-white/[0.05] border border-white/8 rounded-full text-[0.74rem] text-white/45 px-[0.8rem] py-[0.22rem]">
          <i className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shrink-0" />
          <span className="truncate">{domain}</span>
        </span>
      </div>
      <img src={image} alt={alt} loading="lazy" className="block w-full h-auto" />
    </a>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="relative py-28 md:py-40 text-white bg-bg-dark isolate overflow-hidden">
      <AmbientGradient config={AMBIENT_WORK} className="h-[52rem]" />

      <div className={`relative z-10 ${CONTAINER_WIDE}`}>
        <SectionHeading
          dark
          className="mb-20 md:mb-28 reveal"
          eyebrow={t.work.eyebrow}
          title={t.work.title}
          intro={t.work.intro}
        />

        <div className="flex flex-col gap-28 md:gap-40">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="group/row grid grid-cols-1 min-[900px]:grid-cols-[1.08fr_0.92fr] gap-10 min-[900px]:gap-16 items-center reveal">
              <div className={`relative w-full ${i % 2 ? 'min-[900px]:order-2' : ''}`}>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-10 -z-10 blur-3xl transition-opacity duration-500 opacity-70 group-hover/row:opacity-100"
                  style={{ background: `radial-gradient(60% 60% at 50% 50%, ${p.glow} 0%, transparent 72%)` }}
                />
                <Frame domain={p.domain} image={p.image} alt={`${p.title} interface`} href={p.href} />
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-3">
                  <span className="text-[0.76rem] font-700 text-white/25 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.76rem] font-600 tracking-[0.08em] uppercase text-accent-light">
                    {p.kicker}
                  </span>
                </div>
                {/* The product's real mark, lifted from its own site, locked up
                    with the name so it reads as a logo rather than a stray dot. */}
                <div className="mt-3.5 flex items-center gap-3.5">
                  <img
                    src={p.logo}
                    alt=""
                    aria-hidden="true"
                    className="h-11 w-11 object-contain shrink-0"
                  />
                  <h3 className="text-white text-[2.1rem] md:text-[2.5rem] font-600 tracking-[-0.035em] leading-[1.05]">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-4 text-white/85 text-[1.2rem] md:text-[1.3rem] leading-[1.4] tracking-[-0.016em] font-500 text-balance">
                  {p.lead}
                </p>
                <p className="mt-4 text-white/55 text-[1rem] leading-[1.6] max-w-[32rem]">{p.body}</p>

                <div className="mt-8 flex gap-9 flex-wrap border-t border-white/10 pt-7">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="text-[1.45rem] font-600 text-white tracking-[-0.03em] leading-none tabular-nums">
                        {m.value}
                      </span>
                      <span className="mt-1.5 text-[0.8rem] text-white/45">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Tag key={s} dark>
                      {s}
                    </Tag>
                  ))}
                </div>

                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-1.5 self-start text-accent-light font-500 text-[1.0625rem] group/link hover:text-white transition-colors duration-200">
                  {t.work.visit(p.title)}
                  <ArrowUpRight className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-250 ease-apple" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Smaller things, still real. */}
        <div className="mt-28 md:mt-40 pt-14 border-t border-white/10">
          <p className="text-[0.78rem] font-600 tracking-[0.09em] uppercase text-white/40 reveal">
            {t.work.alsoTitle}
          </p>

          <div className="mt-8 grid grid-cols-1 min-[700px]:grid-cols-2 gap-6">
            {alsoBuilt.map((a, i) => (
              <a
                key={a.title}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group overflow-hidden ${CARD_DARK} ${CARD_DARK_HOVER} reveal d${(i % 2) + 1}`}>
                <img
                  src={a.image}
                  alt={`${a.title} interface`}
                  loading="lazy"
                  className="block w-full h-[14rem] object-cover object-top border-b border-white/8"
                />
                <div className="p-7">
                  <div className="flex items-center gap-2.5">
                    <img src={a.logo} alt="" aria-hidden="true" className="w-6 h-6 rounded-[0.35rem] object-contain shrink-0" />
                    <h4 className="text-white font-600 text-[1.15rem]">{a.title}</h4>
                    <span className="text-[0.82rem] text-white/35 font-mono truncate">{a.domain}</span>
                    <ArrowUpRight className="ml-auto shrink-0 text-white/35 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-2.5 text-white/50 text-[0.95rem] leading-[1.55]">{a.description}</p>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-10 text-white/40 text-[0.98rem] leading-[1.6] max-w-[38rem] reveal">
            {t.work.alsoNote}
          </p>
        </div>
      </div>
    </section>
  );
}
