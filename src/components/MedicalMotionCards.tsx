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
       row bleeds to.

       Below that there is no bleed and the row becomes a scroller, which
       needs two things. It has to start at the first card, or a phone opens
       it already scrolled past cards one and two. And it has to run to both
       screen edges rather than stopping at the container's padding — the
       negative margin cancels that padding and the matching inline padding
       puts it back inside the scroller, so the first card still lines up with
       the copy while the strip itself reaches the edge of the screen.

       `scroll-pl-6` matters more than it looks: snapping aligns a card's
       start edge with the *scrollport* edge, so without it the browser
       scrolled 24px on load to satisfy the snap and undid the padding,
       landing card one flush against the screen instead of on the text
       margin. */
    <div
      className="flex gap-3 justify-start min-[900px]:justify-end
                 overflow-x-auto min-[900px]:overflow-visible
                 -mx-6 px-6 min-[900px]:mx-0 min-[900px]:px-0
                 snap-x snap-mandatory min-[900px]:snap-none
                 scroll-pl-6 min-[900px]:scroll-pl-0
                 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="img"
      aria-label={`medicalmotion: ${labels.join(', ')}`}>
      {CARDS.map((c, i) => (
        <div
          key={c.image}
          style={{ backgroundColor: c.bg }}
          /* grow + shrink-0 + a basis, rather than a fixed width: where the row is
             wider than the strip the cards expand to fill it, so they always run
             from the edge of the screen to the copy; where it is narrower they
             hold their size and overflow off the page instead of squashing. */
          className="shrink-0 grow snap-start basis-[11rem] min-[900px]:basis-[11.75rem] min-[1100px]:basis-[12.5rem] rounded-[1.15rem] overflow-hidden
                     flex flex-col transition-transform duration-700 ease-expo
                     group-hover/row:-translate-y-1"
          /* A gentle stagger on hover so the strip reads as a set of objects
             rather than one picture. */
          >
          {/* The label reserves two lines whether or not it needs them. Three of
              these wrap and "Your Health Cockpit" does not, so without a floor
              its card carried a different amount of text and the phone below it
              sat at a different height from its neighbours. The min-height is in
              `em`, so it stays exactly two lines at both type sizes. */}
          <div className="px-4 pt-5 pb-4 min-[1100px]:pt-7 min-[1100px]:pb-6">
            <h4
              style={{ color: c.fg }}
              className="min-h-[2.5em] text-[0.82rem] min-[1100px]:text-[0.88rem] font-600 leading-[1.25] tracking-[-0.012em] text-balance">
              {labels[i]}
            </h4>
          </div>
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
