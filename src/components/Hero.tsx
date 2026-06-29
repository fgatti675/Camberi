import { NeatCanvas } from './NeatCanvas';
import { HERO_CONFIG } from './neatConfigs';

export function Hero() {
  return (
    <section className="relative isolate min-h-[92vh] flex items-end pt-80 pb-[20vh] overflow-hidden" id="top">
      <div className="absolute inset-0 -z-20">
        <NeatCanvas config={HERO_CONFIG} parallax parallaxStrength={0.18} />
      </div>

      <div className="relative z-10 text-center max-w-[46rem] mx-auto w-full px-6 lg:px-8">
        <h1 className="reveal text-white font-600 [text-shadow:0_2px_36px_rgba(0,8,60,0.22)]">
          We build software<br />
          <span className="text-white/58 font-600">that earns its keep.</span>
        </h1>

        <p className="reveal d1 mt-6 mx-auto max-w-[34rem] text-[1.15rem] md:text-[1.3rem] leading-[1.45] font-400 tracking-[-0.016em] text-white/92 [text-shadow:0_1px_20px_rgba(0,8,60,0.2)]">
          A product engineering studio in Madrid. For over a decade we&apos;ve
          built and shipped our own products — like FireCMS and Rebase — and we
          bring that same depth to yours.
        </p>

        <div className="reveal d2 mt-10 flex flex-wrap gap-3 justify-center">
          <a href="#contact" className="inline-flex items-center gap-1.5 rounded-full px-[1.7rem] py-[0.85rem] text-[1.0625rem] font-500 tracking-[-0.01em] cursor-pointer border border-transparent whitespace-nowrap transition-all duration-250 ease-apple active:scale-[0.97] bg-white text-text-main hover:bg-white/88 shadow-sm">Start a project</a>
          <a href="#work" className="inline-flex items-center gap-1.5 rounded-full px-[1.7rem] py-[0.85rem] text-[1.0625rem] font-500 tracking-[-0.01em] cursor-pointer border border-white/40 whitespace-nowrap transition-all duration-250 ease-apple active:scale-[0.97] bg-white/14 text-white backdrop-blur-md hover:bg-white/24">See our work</a>
        </div>
      </div>
    </section>
  );
}
