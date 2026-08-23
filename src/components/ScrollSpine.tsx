import { useEffect, useState } from 'react';
import { t } from '../i18n';

/* ──────────────────────────────────────────────────────────────
   The spine.

   A long page set as a document needs a running head, and this is
   it: a tick per section in the left margin, with the current one
   filled. It replaces the eyebrow labels that used to sit above
   every heading — the same information, moved to the margin where
   page furniture belongs, so each section can open on a bare
   statement instead of a caption.

   Two rules keep it out of the text's way:

   1. It is positioned off the *widest* container on the page
      (CONTAINER_WIDE, 78rem, used by the work section) rather than
      off the viewport edge. Anchoring it to the edge meant the
      gutter shrank as the window did while the rail stayed put, so
      between roughly 1280 and 1400px the ticks crowded the work
      section's copy. Now the gap to the text is constant at every
      width, and the rail only appears once there is genuinely room
      for it.

   2. Nothing but the ticks is visible at rest. A label sitting
      permanently beside the active tick cannot fit in the gutter at
      any width that also fits the page, so labels appear on hover,
      over a pill that keeps them readable wherever they land.
   ────────────────────────────────────────────────────────────── */

const sections = [
  { id: 'automations', label: t.spine.automations },
  { id: 'about', label: t.spine.about },
  { id: 'work', label: t.spine.work },
  { id: 'services', label: t.spine.services },
  { id: 'process', label: t.spine.process },
  { id: 'open-source', label: t.spine.openSource },
  { id: 'team', label: t.spine.team },
  { id: 'contact', label: t.spine.contact },
];

/* The dark bands need light ticks and the light ones need dark. */
const DARK_SECTIONS = new Set(['work', 'process', 'contact']);

/* 78rem is CONTAINER_WIDE; 3.5rem is the distance from that container's
   outer edge back to the rail. Clamped so the rail never leaves the
   window on the narrowest width that shows it. */
const RAIL_LEFT = 'max(1.5rem, calc((100vw - 78rem) / 2 - 3.5rem))';

export function ScrollSpine() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    /* Whichever tracked section covers the middle of the screen wins.
       A plain "is intersecting" test picks two at every boundary and
       makes the marker flicker between them. */
    const pick = () => {
      const line = window.innerHeight * 0.42;
      let current: string | null = null;
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) current = node.id;
      }
      /* Above the first tracked section — the hero — show nothing. */
      setActive(current);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        pick();
      });
    };

    pick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const onDark = active !== null && DARK_SECTIONS.has(active);

  return (
    <nav
      aria-label="Sections"
      style={{ left: RAIL_LEFT }}
      className={`fixed top-1/2 -translate-y-1/2 z-40 hidden min-[1400px]:flex flex-col gap-3.5 transition-opacity duration-500 ease-expo ${
        active ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
      {sections.map((s) => {
        const isActive = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center py-1"
            aria-current={isActive ? 'true' : undefined}>
            <span
              aria-hidden="true"
              className={`block h-px transition-all duration-500 ease-expo ${
                isActive ? 'w-7' : 'w-3.5 group-hover:w-6'
              } ${
                onDark
                  ? isActive
                    ? 'bg-white'
                    : 'bg-white/30 group-hover:bg-white/60'
                  : isActive
                    ? 'bg-text-main'
                    : 'bg-black/20 group-hover:bg-black/45'
              }`}
            />
            {/* Hover only, and on its own pill — the gutter is never wide
                enough to park a label beside the text safely. */}
            <span
              className={`pointer-events-none absolute left-9 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[0.64rem] tracking-[0.1em] uppercase opacity-0 translate-x-[-4px] transition-all duration-300 ease-expo group-hover:opacity-100 group-hover:translate-x-0 ${
                onDark
                  ? 'bg-white/12 text-white/90 backdrop-blur-md'
                  : 'bg-text-main/[0.06] text-text-main backdrop-blur-md'
              }`}>
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
