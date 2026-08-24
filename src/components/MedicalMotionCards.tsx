import { t } from '../i18n';

/* ──────────────────────────────────────────────────────────────
   medicalmotion's feature cards, rebuilt in HTML.

   This used to be one flat screenshot of their landing page — a
   bitmap of a layout, soft on retina and frozen at whatever the
   site looked like the day it was captured. It had already gone
   stale: their second card is pale blue now, not navy, the third
   is teal rather than green, the first says "unique" where the
   picture still said "individual", and a fourth card had been
   added that the picture did not know about.

   So the cards are markup and the phones are the real transparent
   renders from their own CMS, at their own background colours.
   Crisp at any density, and when their product moves, only the
   asset and the label have to follow.

   Colours are taken from the live site rather than sampled off a
   screenshot: #f7f4f3, #dfeff3, #008980, #ceb9fa, with their navy
   #000038 for text on the three light cards.
   ────────────────────────────────────────────────────────────── */

interface Card {
  bg: string;
  fg: string;
  image: string;
}

/* Order matches medicalmotion.com. The labels live in the dictionary so the
   Spanish page reads in Spanish; the phone renders stay the English builds,
   which is what their CMS publishes. */
const CARDS: Card[] = [
  { bg: '#f7f4f3', fg: '#000038', image: '/work/mm/feat-01.webp' },
  { bg: '#dfeff3', fg: '#000038', image: '/work/mm/feat-02.webp' },
  { bg: '#008980', fg: '#ffffff', image: '/work/mm/feat-03.webp' },
  { bg: '#ceb9fa', fg: '#000038', image: '/work/mm/feat-04.webp' },
];

export function MedicalMotionCards() {
  const labels = t.work.medicalmotion.cards;
  return (
    /* Above 900px `justify-end` anchors the last card against the copy and
       lets the row overflow off the left of the page, which is the side this
       row bleeds to. Below that there is no bleed: the row becomes a scroller
       and has to start at the first card, or a phone opens it already scrolled
       to the end with cards one and two behind the reader. */
    <div
      className="flex gap-3 justify-start min-[900px]:justify-end overflow-x-auto min-[900px]:overflow-visible
                 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="img"
      aria-label={`medicalmotion: ${labels.join(', ')}`}>
      {CARDS.map((c, i) => (
        <div
          key={c.image}
          style={{ backgroundColor: c.bg }}
          className="shrink-0 w-[11rem] min-[1100px]:w-[12rem] rounded-[1.15rem] overflow-hidden
                     flex flex-col transition-transform duration-700 ease-expo
                     group-hover/row:-translate-y-1"
          /* A gentle stagger on hover so the strip reads as a set of objects
             rather than one picture. */
          >
          <h4
            style={{ color: c.fg }}
            className="px-4 pt-4 pb-3 text-[0.82rem] min-[1100px]:text-[0.88rem] font-600 leading-[1.25] tracking-[-0.012em] text-balance">
            {labels[i]}
          </h4>
          {/* The renders are cropped at the bottom by design, so the phone
              runs off the bottom edge of its card exactly as it does on
              their own site. */}
          <img
            src={c.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={520}
            height={573}
            className="mt-auto block w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}
