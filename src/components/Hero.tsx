import { NeatCanvas } from './NeatCanvas';
import { HERO_CONFIG } from './neatConfigs';
import { t } from '../i18n';

/* The one saturated moment on the page, and the only place the gradient is
   allowed to be the subject rather than the texture.

   The composition is unchanged — the ribbon owns the top of the frame and
   the words sit low, underneath it. What changed is the voice: the title is
   set in the display serif rather than the platform sans, which is the
   difference between a background with a caption and an actual cover.

   The top padding is responsive because it was not: a flat 20rem plus the
   20vh bottom pad overflowed a short laptop viewport and pushed the call to
   action under the fold. */
export function Hero() {
  return (
    <section
      className="relative isolate min-h-[92vh] flex items-end pt-44 md:pt-72 lg:pt-80 pb-[16vh] md:pb-[20vh] overflow-hidden"
      id="top">
      <div className="absolute inset-0 -z-20">
        <NeatCanvas config={HERO_CONFIG} parallax parallaxStrength={0.18} />
      </div>

      <div className="relative z-10 text-center max-w-[55rem] mx-auto w-full px-6 lg:px-8">
        <h1 className="reveal text-white [text-shadow:0_2px_40px_rgba(0,8,60,0.28)]">
          <span className="block">{t.hero.titleTop}</span>
          <span className="block text-white/60">{t.hero.titleBottom}</span>
        </h1>

        <p className="reveal d1 mt-7 mx-auto max-w-[35rem] text-[1.12rem] md:text-[1.25rem] leading-[1.5] text-white/90 [text-shadow:0_1px_20px_rgba(0,8,60,0.25)]">
          {t.hero.intro}
        </p>

        <div className="reveal d2 mt-10 flex flex-wrap gap-3 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full px-[1.6rem] py-[0.8rem] text-[1.02rem] font-500 tracking-[-0.01em] cursor-pointer border border-transparent whitespace-nowrap transition-all duration-300 ease-expo active:scale-[0.97] bg-white text-text-main hover:bg-white/88 shadow-[0_10px_30px_-12px_rgba(0,10,60,0.5)]">
            {t.hero.primary}
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-1.5 rounded-full px-[1.6rem] py-[0.8rem] text-[1.02rem] font-500 tracking-[-0.01em] cursor-pointer border border-white/40 whitespace-nowrap transition-all duration-300 ease-expo active:scale-[0.97] bg-white/14 text-white backdrop-blur-md hover:bg-white/24 hover:border-white/60">
            {t.hero.secondary}
          </a>
        </div>
      </div>

      {/* A quiet cue that the page continues. The line drops and fades on a
          slow loop rather than bouncing — the page underneath is a document,
          not an app. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-7 hidden md:flex flex-col items-center gap-2.5">
        <span className="font-mono text-[0.64rem] tracking-[0.22em] uppercase text-white/60">
          {t.hero.scrollCue}
        </span>
        <span className="relative block h-9 w-px overflow-hidden bg-white/20">
          <span className="hero-cue absolute inset-x-0 top-0 block h-3.5 bg-white/80" />
        </span>
      </div>
    </section>
  );
}
