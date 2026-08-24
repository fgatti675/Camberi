import { useEffect, useRef, useState } from 'react';
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
  const ordered = CARDS.map((card, i) => ({
    ...card,
    label: t.work.medicalmotion.cards[i],
  }));
  const rowRef = useRef<HTMLDivElement>(null);

  /* The leading-edge fade is only right when something is actually being cut
     off. Above roughly 1700px the cards grow to fill the row exactly, nothing
     overflows, and fading then just dims the first card's label for no reason.
     The cards hold their basis when space runs out and grow when it does not,
     so their combined width exceeding the row is precisely the clipped case. */
  const [clipped, setClipped] = useState(false);
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const kids = Array.from(row.children) as HTMLElement[];
      const gaps = (kids.length - 1) * parseFloat(getComputedStyle(row).columnGap || '0');
      const strip = kids.reduce((sum, k) => sum + k.offsetWidth, 0) + gaps;
      /* A few pixels of slack: when the cards grow to fill the row, flex
         distributes fractional widths and the total lands a pixel or two over,
         which is not a clip and should not trigger the fade. */
      setClipped(window.innerWidth >= 900 && strip > row.clientWidth + 6);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, []);
  return (
    /* Above 900px the row runs in reverse, which puts the first feature
       against the copy where it is always fully visible and pushes the last
       one off the left of the page — the side this row bleeds to and the side
       that fades. `justify-start` packs to main-start, which in that direction
       is the right edge.

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
      ref={rowRef}
      className={`${clipped ? 'mm-fade' : ''} flex gap-3 justify-start min-[900px]:flex-row-reverse
                 overflow-x-auto min-[900px]:overflow-visible
                 -mx-6 px-6 min-[900px]:mx-0 min-[900px]:px-0
                 snap-x snap-mandatory min-[900px]:snap-none
                 scroll-pl-6 min-[900px]:scroll-pl-0
                 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      role="img"
      aria-label={`medicalmotion: ${t.work.medicalmotion.cards.join(', ')}`}>
      {ordered.map((c) => (
        <div
          key={c.image}
          style={{ backgroundColor: c.bg }}
          /* grow + shrink-0 + a basis, rather than a fixed width: where the row is
             wider than the strip the cards expand to fill it, so they always run
             from the edge of the screen to the copy; where it is narrower they
             hold their size and overflow off the page instead of squashing. */
          className="shrink-0 grow snap-start basis-[13rem] min-[900px]:basis-[15rem] min-[1100px]:basis-[17rem] rounded-[1.15rem] overflow-hidden
                     min-[900px]:aspect-[1/1.55] flex flex-col transition-transform duration-700 ease-expo
                     group-hover/row:-translate-y-1"
          /* A gentle stagger on hover so the strip reads as a set of objects
             rather than one picture. */
          >
          {/* The label reserves two lines whether or not it needs them. Three of
              these wrap and "Your Health Cockpit" does not, so without a floor
              its card carried a different amount of text and the phone below it
              sat at a different height from its neighbours. The min-height is in
              `em`, so it stays exactly two lines at both type sizes. */}
          {/* The label reserves two lines whether or not it needs them, and sits
              centred in that space. Three of these wrap and "Your Health Cockpit"
              does not — reserving the height without centring left it hanging at
              the top of its card with a hole underneath, which is worse than not
              reserving it at all. */}
          <div className="flex items-center justify-center px-5 pt-6 pb-5 min-[1100px]:pt-7 min-[1100px]:pb-6">
            <h4
              style={{ color: c.fg }}
              className="flex min-h-[2.5em] items-center text-center text-[1rem] min-[1100px]:text-[1.12rem] font-600 leading-[1.25] tracking-[-0.015em] text-balance">
              {c.label}
            </h4>
          </div>
          {/* The renders are cropped at the bottom by design, so the phone
              runs off the bottom edge of its card exactly as it does on
              their own site. */}
          {/* The phone fills everything the label leaves rather than sitting at
              its natural size with a field of colour above it. `object-cover`
              scales it to cover that box, which crops the sides — the renders
              carry about 4% of transparent margin there, so it takes the empty
              space before it touches the phone. */}
          <img
            src={c.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={520}
            height={573}
            className="mt-auto block w-full h-auto min-[900px]:flex-1 min-[900px]:min-h-0 min-[900px]:h-full min-[900px]:object-cover min-[900px]:object-top"
          />
        </div>
      ))}
    </div>
  );
}
