import { CONTAINER, SECTION, Eyebrow, Button } from './ui';

interface ValueData { title: string; description: string; }

const values: ValueData[] = [
  { title: 'Product thinkers', description: 'We challenge assumptions and help shape the product, not just execute a spec. You get a partner who cares whether it actually works.' },
  { title: 'Open-source DNA', description: 'We maintain tools used by thousands of developers. That bar for quality, docs and reliability goes straight into your product.' },
  { title: 'Senior, in-house team', description: 'A tight team in Madrid — no outsourcing, no junior hand-offs. The people you meet are the people who ship.' },
  { title: 'Full-stack, end to end', description: 'From Figma to Postgres, from AI to App Store. One team owns the whole stack, so nothing falls between vendors.' },
];

export function WhyUs() {
  return (
    <section id="about" className={`relative ${SECTION} bg-bg-main border-t border-hairline-soft`}>
      <div className={`${CONTAINER} grid grid-cols-1 min-[940px]:grid-cols-2 gap-10 min-[940px]:gap-20 items-start`}>
        <div className="sticky top-24 max-[940px]:static reveal">
          <Eyebrow>Why Camberi</Eyebrow>
          <h2 className="mt-0 text-text-main">The team behind the products you already trust.</h2>
          <p className="mt-5 text-[1.2rem] md:text-[1.35rem] leading-[1.45] font-400 tracking-[-0.016em] text-text-muted">
            We&apos;re the studio behind FireCMS — one of the most popular CMSs for Firebase,
            powering tens of thousands of projects — as well as Rebase and MedicalMotion. More
            than a decade of building, launching and maintaining our own products in the open
            means we bring the instincts of people who&apos;ve had to live with their code in
            production, not just hand it off.
          </p>
          <Button href="#contact" className="mt-8">Work with us</Button>
        </div>

        <div className="flex flex-col">
          {values.map((v, i) => (
            <div key={v.title} className={`py-7 border-t border-hairline first:pt-0 first:border-t-0 reveal d${i + 1}`}>
              <h3 className="text-text-main font-600">{v.title}</h3>
              <p className="mt-2 text-text-muted text-base leading-[1.55]">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
