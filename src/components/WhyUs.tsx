interface ValueData { title: string; description: string; }

const values: ValueData[] = [
  { title: 'Product thinkers', description: 'We challenge assumptions and help shape the product, not just execute a spec. You get a partner who cares whether it actually works.' },
  { title: 'Open-source DNA', description: 'We maintain tools used by thousands of developers. That bar for quality, docs and reliability goes straight into your product.' },
  { title: 'Senior, in-house team', description: 'A tight team in Madrid — no outsourcing, no junior hand-offs. The people you meet are the people who ship.' },
  { title: 'Full-stack, end to end', description: 'From Figma to Postgres, from AI to App Store. One team owns the whole stack, so nothing falls between vendors.' },
];

export function WhyUs() {
  return (
    <section id="about" className="section section-alt">
      <div className="container whyus">
        <div className="whyus__intro reveal">
          <span className="eyebrow">Why Camberi</span>
          <h2>The team behind the products you already trust.</h2>
          <p className="lead">
            We&apos;re the studio behind FireCMS, Rebase and MedicalMotion. A decade of building,
            launching and maintaining our own products means we bring the instincts of people
            who&apos;ve had to live with their code in production.
          </p>
          <a href="#contact" className="btn btn-primary btn-lg whyus__cta">Work with us</a>
        </div>

        <div className="whyus__list">
          {values.map((v, i) => (
            <div key={v.title} className={`whyus__item reveal d${i + 1}`}>
              <h3 className="whyus__title">{v.title}</h3>
              <p className="whyus__desc">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
