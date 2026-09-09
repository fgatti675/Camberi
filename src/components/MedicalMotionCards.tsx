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

/**
 * `row` is the work section: a strip that bleeds off the page and scrolls on a
 * phone. `grid` is the case study at /work/medicalmotion/, where the same four
 * cards are the page's only illustration and sit inside the measure — no
 * bleed, so no left-edge fade, and no hover lift, because nothing there is a
 * link. One component either way: the cards are markup, and a second copy of
 * that markup would go stale the first time the product changed.
 */
export function MedicalMotionCards({ variant = 'row' }: { variant?: 'row' | 'grid' }) {
  const grid = variant === 'grid';

  const ordered = CARDS.map((card, i) => ({
    ...card,
    label: t.work.medicalmotion.cards[i],
  }));

  if (grid) {
    return (
      <div
        className="grid grid-cols-2 min-[760px]:grid-cols-4 gap-3"
        role="img"
        aria-label={`medicalmotion: ${t.work.medicalmotion.cards.join(', ')}`}>
        {ordered.map((c) => (
          <div
            key={c.image}
            style={{ backgroundColor: c.bg }}
            className="rounded-[1.15rem] overflow-hidden aspect-[1/1.55] flex flex-col">
            {/* A paragraph, not a heading: on the case study these four are
                captions inside a figure, and four h3s would land in the
                middle of the page's outline — and in the plain-text twin the
                prerender emits — as if they were sections. */}
            <div className="flex items-center justify-center px-4 pt-6 pb-2">
              <p
                style={{ color: c.fg }}
                className="flex min-h-[2.5em] items-center justify-center max-w-[17ch] text-center text-[0.92rem] min-[1100px]:text-[1rem] font-600 leading-[1.25] tracking-[-0.015em] text-balance">
                {c.label}
              </p>
            </div>
            <img
              src={c.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={520}
              height={573}
              className="mt-auto block w-full flex-1 min-h-0 h-full object-cover object-top"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    /* Above 900px the row runs in reverse, which puts the first feature
       against the copy where it is always fully visible and pushes the last
       one off the left of the page — the side this row bleeds to and the side
       that fades. `justify-start` packs to main-start, which in that direction
       is the right edge.

       The vertical `py-2 -my-2` is not spacing — it is headroom for the
       mask. `mask-clip` defaults to `border-box`, so the mask throws away
       anything outside this element's box, and the cards lift 4px on hover:
       their rounded top corners were being sliced flat as they rose, over
       the 700ms of the transition. The padding grows the masked box, the
       negative margin takes the space back out of the layout.

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
      className={`mm-fade flex gap-3 justify-start min-[900px]:flex-row-reverse
                 overflow-x-auto min-[900px]:overflow-visible
                 -mx-6 px-6 min-[900px]:mx-0 min-[900px]:px-0
                 py-2 -my-2
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
          {/* A measure, not just a centre. Left to the full card width these
              wrapped differently from each other — "AI-supported physiotherapy"
              ran edge to edge on one line at 1280 and up while its neighbours
              sat on two, so the labels never lined up and the odd one out left
              a reserved line empty above the phone. Capped at 17ch they all
              break to two lines, at every width. */}
          <div className="flex items-center justify-center px-5 pt-8 pb-2 min-[1100px]:pt-9 min-[1100px]:pb-2">
            <h4
              style={{ color: c.fg }}
              className="flex min-h-[2.5em] items-center justify-center max-w-[17ch] text-center text-[1rem] min-[1100px]:text-[1.12rem] font-600 leading-[1.25] tracking-[-0.015em] text-balance">
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
