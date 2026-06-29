import { CONTAINER, SECTION, SectionHeading, CARD } from './ui';

interface Quote {
  text: string;
  name: string;
  role: string;
  initials: string;
}

/* PLACEHOLDER copy — replace with real client quotes (and add photos to avatars) before launch. */
const quotes: Quote[] = [
  {
    text: 'Camberi shipped in weeks what our previous agency couldn’t in a quarter. They think like product owners, not contractors — and the code is genuinely ours to keep.',
    name: 'Client Name',
    role: 'Founder & CEO, Company',
    initials: 'CN',
  },
  {
    text: 'The team behind FireCMS is exactly who you want building your platform. Senior people, weekly demos, zero hand-waving. We always knew where the project stood.',
    name: 'Client Name',
    role: 'VP Engineering, Company',
    initials: 'CN',
  },
  {
    text: 'They took an ambitious AI idea and turned it into a real, clinical-grade product. Design, ML and infrastructure handled by one tight team. Rare, and worth it.',
    name: 'Client Name',
    role: 'Product Lead, Company',
    initials: 'CN',
  },
];

/* PLACEHOLDER — replace with real client / company logos (SVG or <img>). */
const clients = ['Company', 'Company', 'Company', 'Company', 'Company'];

export function Testimonials() {
  return (
    <section className={`${SECTION} bg-bg-main`}>
      <div className={CONTAINER}>
        <SectionHeading
          className="mb-14 reveal"
          eyebrow="In their words"
          title="Teams trust us with the work that matters."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <figure key={i} className={`flex flex-col ${CARD} p-7 reveal d${i + 1}`}>
              <svg className="text-accent/40 mb-4" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 4C6.5 4 4 6.5 4 9.5c0 2.6 1.9 4.8 4.4 5.4-.2 2.3-1.7 3.6-3.4 4.1L6 21c3.4-.9 6-3.9 6-8.5V9.5C12 6.5 11 4 9.5 4Zm10 0C16.5 4 14 6.5 14 9.5c0 2.6 1.9 4.8 4.4 5.4-.2 2.3-1.7 3.6-3.4 4.1L16 21c3.4-.9 6-3.9 6-8.5V9.5C22 6.5 21 4 19.5 4Z" /></svg>
              <blockquote className="text-[1.05rem] leading-[1.55] text-text-main font-400 flex-1">{q.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-text-main/90 text-white flex items-center justify-center text-[0.82rem] font-600 shrink-0">{q.initials}</span>
                <span>
                  <span className="block font-600 text-text-main text-[0.95rem]">{q.name}</span>
                  <span className="block text-[0.85rem] text-text-light">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 reveal">
          <p className="text-center text-[0.85rem] text-text-light mb-7">Trusted by teams building on our tools</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-5">
            {clients.map((c, i) => (
              <span key={i} className="text-[1.25rem] font-600 tracking-[-0.02em] text-text-main opacity-30">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
