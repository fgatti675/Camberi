import { useEffect } from 'react';

/* One observer for the whole page.

   Four entrance primitives share it — `.reveal` (rise and unblur),
   `.stagger` (a container whose children resolve in sequence), `.wipe`
   (a statement that clips up from its own baseline) and `.rule` (a
   hairline that draws itself in). They all key off the same `in-view`
   class, so a section can combine them without any of them needing to
   know about the others.

   Elements are unobserved once they have played: these are entrances,
   not scroll-linked effects, and nothing should replay on the way back
   up the page. */
const SELECTOR = '.reveal, .stagger, .wipe, .rule';

export function useScrollAnimation() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(SELECTOR));

    /* Anything already on screen at load has effectively been seen, and
       animating it in behind the reader's eyes reads as jank rather than
       as choreography. Play those immediately. */
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
