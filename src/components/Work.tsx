import {
  brand,
  CONTAINER_WIDE,
  SectionHead,
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
    logo: brand('medicalmotion-icon.png'),
    href: 'https://medicalmotion.com',
    domain: 'medicalmotion.com',
    image: '/work/medicalmotion.webp',
    glow: 'rgba(16,185,129,0.30)',
  },
  {
    id: 'firecms',
    ...t.work.firecms,
    title: 'FireCMS',
    logo: brand('firecms.svg'),
    href: 'https://firecms.co',
    domain: 'firecms.co',
    image: '/work/firecms.webp',
    glow: 'rgba(255,122,0,0.26)',
  },
  {
    id: 'rebase',
    ...t.work.rebase,
    title: 'Rebase',
    logo: brand('rebase.svg'),
    href: 'https://rebase.pro',
    domain: 'rebase.pro',
    image: '/work/rebase.webp',
    glow: 'rgba(0,90,255,0.34)',
  },
  {
    id: 'sustentalent',
    ...t.work.sustentalent,
    title: 'SustenTalent',
    /* The isotype, not the full lockup — a wordmark shrinks to a sliver
       inside the 44px square this renders into. */
    logo: brand('sustentalent.svg'),
    href: 'https://sustentalent.com',
    domain: 'sustentalent.com',
    image: '/work/sustentalent.webp',
    glow: 'rgba(21,209,127,0.28)',
  },
];

const alsoBuilt = [
  {
    title: 'Dataki',
    domain: 'dataki.ai',
    href: 'https://dataki.ai',
    logo: brand('dataki.svg'),
    image: '/work/dataki.webp',
    description: t.work.dataki,
  },
  {
    title: 'Unbrand.my',
    domain: 'unbrand.my',
    href: 'https://unbrand.my',
    logo: brand('unbrand.svg'),
    image: '/work/unbrand.webp',
    description: t.work.unbrand,
  },
  {
    title: 'Neat',
    domain: 'neat.firecms.co',
    href: 'https://neat.firecms.co',
    logo: brand('neat.svg'),
    image: '/work/neat.webp',
    description: t.work.neat,
  },
  {
    title: 'Dadaki',
    domain: 'dadaki.com',
    href: 'https://dadaki.com',
    logo: brand('dadaki.svg'),
    image: '/work/dadaki.webp',
    description: t.work.dadaki,
  },
];

/** The screenshot itself, as an object on the dark surface rather than a
    picture of a browser. The chrome — dots, a URL bar, a green dot — was
    costume: it dressed a real product shot up as a mockup, and the domain it
    carried now sits on the metadata line where the rest of the metadata is.

    The whole frame is a link: the section's claim is that you can go and use
    these. It stays out of the tab order and the accessibility tree because
    the named link below the copy is the one that should be announced. */
function Frame({
  image,
  alt,
  href,
  bleed,
}: {
  image: string;
  alt: string;
  href: string;
  bleed: 'left' | 'right';
}) {
  /* Written out literally — Tailwind scans for whole class names. The side
     that runs off the page loses its corner and its border, so the shot reads
     as continuing past the edge rather than as a card that happens to be
     clipped. */
  const edge =
    bleed === 'left'
      ? 'min-[900px]:rounded-l-none min-[900px]:border-l-0'
      : 'min-[900px]:rounded-r-none min-[900px]:border-r-0';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className={`block rounded-[1.15rem] ${edge} overflow-hidden border border-white/12 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] transition-all duration-700 ease-expo group-hover/row:-translate-y-2 group-hover/row:border-white/25 group-hover/row:shadow-[0_60px_120px_-50px_rgba(0,0,0,1)]`}>
      <img src={image} alt={alt} loading="lazy" className="block w-full h-auto" />
    </a>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="relative py-28 md:py-40 text-white bg-bg-dark isolate overflow-hidden">
      <AmbientGradient config={AMBIENT_WORK} className="h-[52rem]" strength={0.3} />

      <div className={`relative z-10 ${CONTAINER_WIDE}`}>
        <SectionHead
          dark
          title={t.work.title}
          intro={t.work.intro}
          titleClass="max-w-[17ch]"
          className="mb-20 md:mb-28"
        />

        <div className="flex flex-col gap-28 md:gap-40">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="group/row grid grid-cols-1 min-[900px]:grid-cols-[1.08fr_0.92fr] gap-10 min-[900px]:gap-16 items-center reveal">
              <div
                /* No `w-full` here on purpose: an explicit width pins the box
                   to its grid column, so the negative margin slides the shot
                   sideways instead of widening it. Left auto, the same margin
                   grows it into the bleed. */
                className={`relative ${
                  i % 2 ? 'min-[900px]:order-2 bleed-r' : 'bleed-l'
                }`}>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-10 -z-10 blur-3xl transition-opacity duration-700 opacity-70 group-hover/row:opacity-100"
                  style={{ background: `radial-gradient(60% 60% at 50% 50%, ${p.glow} 0%, transparent 72%)` }}
                />
                <Frame
                  image={p.image}
                  alt={`${p.title} interface`}
                  href={p.href}
                  bleed={i % 2 ? 'right' : 'left'}
                />
              </div>

              <div className="flex flex-col">
                {/* The product's real mark, lifted from its own site, locked up
                    with the name so it reads as a logo rather than a stray dot. */}
                <div className="flex items-center gap-3.5">
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

                {/* Metadata sits under the name, where a caption belongs,
                    rather than floating above it as a label. */}
                <span className="mt-3 font-mono text-[0.72rem] tracking-[0.02em] text-white/55">
                  {p.kicker} · {p.domain}
                </span>

                {/* The claim, in the display voice. */}
                <p className="mt-5 display text-[1.7rem] md:text-[2rem] leading-[1.14] text-white text-balance">
                  {p.lead}
                </p>

                <p className="mt-4 text-white/55 text-[1rem] leading-[1.65] max-w-[34rem]">{p.body}</p>

                <div className="mt-8 flex gap-9 flex-wrap border-t border-white/10 pt-7">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="figure text-[1.5rem] text-white leading-none">
                        {m.value}
                      </span>
                      <span className="mt-2 text-[0.8rem] text-white/60">{m.label}</span>
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
                  className="mt-8 inline-flex items-center gap-1.5 self-start text-accent-light font-500 text-[1.0625rem] group/link hover:text-white transition-colors duration-300">
                  {t.work.visit(p.title)}
                  <ArrowUpRight className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300 ease-expo" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Smaller things, still real. */}
        <div className="mt-28 md:mt-40 pt-14 border-t border-white/10">
          <h3 className="display text-[1.6rem] md:text-[1.9rem] leading-[1.15] font-400 tracking-[-0.028em] text-white/85 reveal">
            {t.work.alsoTitle}
          </h3>

          <div className="mt-9 grid grid-cols-1 min-[700px]:grid-cols-2 gap-6 stagger">
            {alsoBuilt.map((a) => (
              <a
                key={a.title}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group overflow-hidden ${CARD_DARK} ${CARD_DARK_HOVER}`}>
                <div className="h-[14rem] overflow-hidden border-b border-white/8">
                  <img
                    src={a.image}
                    alt={`${a.title} interface`}
                    loading="lazy"
                    className="block w-full h-full object-cover object-top transition-transform duration-700 ease-expo group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2.5">
                    <img src={a.logo} alt="" aria-hidden="true" className="w-6 h-6 rounded-[0.35rem] object-contain shrink-0" />
                    <h4 className="text-white font-600 text-[1.15rem]">{a.title}</h4>
                    <span className="font-mono text-[0.75rem] text-white/55 truncate">{a.domain}</span>
                    <ArrowUpRight className="ml-auto shrink-0 text-white/55 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-2.5 text-white/50 text-[0.95rem] leading-[1.6]">{a.description}</p>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-10 text-white/55 text-[0.98rem] leading-[1.65] max-w-[42rem] reveal">
            {t.work.alsoNote}
          </p>
        </div>
      </div>
    </section>
  );
}
