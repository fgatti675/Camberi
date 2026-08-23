import { CONTAINER } from './ui';
import { t } from '../i18n';

/* Teams running products on software we wrote — the set FireCMS and Rebase
   list publicly, exported as one-colour silhouettes so the wall reads as a
   single typographic line rather than seventeen brand palettes.

   The assets are optically balanced at export time: each is scaled by the
   square root of its ink area, not by bounding-box height, so a long thin
   wordmark does not read as twice the size of a compact mark sitting at the
   same height. Every file shares one canvas height, which is why a single
   `h-*` class below is enough.

   The two rows carry different logos on purpose — the same list scrolling
   past twice in opposite directions reads as a rendering bug. */
type Logo = { src: string; alt: string };

const rowOne: Logo[] = [
  { src: '/logos/medicalmotion.png', alt: 'medicalmotion' },
  { src: '/logos/clario.png', alt: 'Clario' },
  { src: '/logos/somnio.png', alt: 'Somnio Software' },
  { src: '/logos/withu.png', alt: 'WithU' },
  { src: '/logos/gearfocus.png', alt: 'GearFocus' },
  { src: '/logos/nfq.png', alt: 'NFQ' },
  { src: '/logos/riverstone.png', alt: 'Riverstone' },
  { src: '/logos/kodecreators.png', alt: 'Kode Creators' },
  { src: '/logos/viscap.png', alt: 'VisCap.ai' },
];

const rowTwo: Logo[] = [
  { src: '/logos/deardoc.png', alt: 'DearDoc' },
  { src: '/logos/codelabs.png', alt: 'Code Labs' },
  { src: '/logos/bitforge.png', alt: 'Bitforge' },
  { src: '/logos/socialincome.png', alt: 'Social Income' },
  { src: '/logos/sustentalent.png', alt: 'SustenTalent' },
  { src: '/logos/mindswitch.png', alt: 'Mindswitch' },
  { src: '/logos/abacus.png', alt: 'Abacus Plus' },
  { src: '/logos/fyclabs.png', alt: 'FYC Labs' },
];

function Row({ logos, reverse = false }: { logos: Logo[]; reverse?: boolean }) {
  /* Duplicated once so the -50% translate lands on an identical frame. */
  const track = [...logos, ...logos];
  return (
    <div
      className={`flex w-max items-center gap-x-16 md:gap-x-24 ${
        reverse ? 'animate-marquee-reverse' : 'animate-marquee'
      }`}>
      {track.map((l, i) => (
        <img
          key={`${l.alt}-${i}`}
          src={l.src}
          alt={l.alt}
          loading="lazy"
          className="h-8 md:h-9 w-auto shrink-0 opacity-30 hover:opacity-70 transition-opacity duration-300"
        />
      ))}
    </div>
  );
}

export function LogoWall() {
  return (
    <section className="pt-20 pb-16 md:pt-24 md:pb-20 bg-bg-main">
      <div className={CONTAINER}>
        <p className="text-center font-mono text-[0.72rem] tracking-[0.1em] uppercase text-text-light reveal">
          {t.logoWall.caption}
        </p>
      </div>

      {/* Full-bleed track, masked to white at both edges so logos enter and
          leave the page instead of hitting a hard crop. */}
      <div
        className="marquee-host mt-9 flex flex-col gap-6 overflow-hidden reveal d1"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}>
        <Row logos={rowOne} />
        <Row logos={rowTwo} reverse />
      </div>
    </section>
  );
}
