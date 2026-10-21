import { useEffect, type RefObject } from 'react';

/* ──────────────────────────────────────────────────────────────
   The page changes colour as the story moves.

   Sections opt in with a tone (`data-tone="main"`, `"alt"`, `"night"`),
   and instead of each one painting its own rectangle the page itself
   carries the colour, blending from one tone to the next as each boundary
   crosses the screen.

   The dark bands with a NEAT ribbon (work, process, contact) do not opt
   in. Their ribbons are composed on solid black, and a ribbon over a
   half-blended grey looks like a mistake, so those bands keep their own
   background and their hard edges. In practice the blend happens around
   the agents section, which has no ribbon to protect.

   The blend runs while the boundary travels from 75% of the viewport
   height to 25%. Sections open and close on several rems of padding, so
   while the colour is moving, the copy on either side is mostly out of
   frame — text never sits on a colour it was not set for for more than a
   moment. A section that blends on both sides must be at least a screen
   tall (the agents section is), or it never reaches its full tone.
   Smoothstep keeps each tone at full strength for longer at both ends of
   the window.

   Progressive enhancement: the sections keep their own backgrounds in the
   prerendered HTML and only turn transparent once `tone-flow-on` is on
   the container, so without JavaScript — or before hydration — the page
   looks exactly as it did.
   ────────────────────────────────────────────────────────────── */

const BLEND_START = 0.75;
const BLEND_END = 0.25;

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB | null {
  const m = hex.trim().match(/^#([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);

function mix(a: RGB, b: RGB, t: number): string {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export function useToneFlow(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const root = getComputedStyle(document.documentElement);
    const sections = Array.from(container.querySelectorAll<HTMLElement>(':scope > section[data-tone]'));
    const tones = sections.map((s) => hexToRgb(root.getPropertyValue(`--color-bg-${s.dataset.tone}`)));
    /* A tone without a matching hex token would paint black; leave the page
       as it is rather than guess. */
    if (!sections.length || tones.some((c) => !c)) return;
    const colors = tones as RGB[];

    container.classList.add('tone-flow-on');

    let raf = 0;
    const paint = () => {
      raf = 0;
      const vh = window.innerHeight;
      const start = vh * BLEND_START;
      const end = vh * BLEND_END;
      let color = mix(colors[0], colors[0], 0);
      for (let i = 0; i < sections.length; i++) {
        const top = sections[i].getBoundingClientRect().top;
        if (top <= end) {
          color = mix(colors[i], colors[i], 0);
        } else {
          if (i > 0 && top < start) {
            color = mix(colors[i - 1], colors[i], smoothstep((start - top) / (start - end)));
          }
          break;
        }
      }
      container.style.backgroundColor = color;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      container.classList.remove('tone-flow-on');
      container.style.backgroundColor = '';
    };
  }, [ref]);
}
