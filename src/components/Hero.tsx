import { NeatCanvas } from './NeatCanvas';
import { HERO_CONFIG } from './neatConfigs';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg">
        <NeatCanvas config={HERO_CONFIG} parallax parallaxStrength={0.18} />
      </div>

      <div className="hero__content container">
        <h1 className="hero__title reveal">
          We build software<br />
          <span className="hero__title-soft">that earns its keep.</span>
        </h1>

        <p className="hero__subtitle reveal d1">
          A product engineering studio in Madrid, building the web and mobile
          products real businesses run on.
        </p>

        <div className="hero__actions reveal d2">
          <a href="#contact" className="btn btn-on-color btn-lg">Start a project</a>
          <a href="#work" className="btn btn-glass-light btn-lg">See our work</a>
        </div>
      </div>
    </section>
  );
}
