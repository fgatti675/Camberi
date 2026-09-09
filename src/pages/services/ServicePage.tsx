import type { ReactNode } from 'react';
import { PageLayout, PageHead, Prose, inline } from '../../components/PageLayout';
import {
  CONTAINER,
  SectionHead,
  Evidence,
  Button,
  ArrowRight,
  ArrowUpRight,
  DarkGlow,
} from '../../components/ui';
import { t } from '../../i18n';
import {
  SERVICE_PATHS,
  contactHref,
  serviceVars,
  servicePath,
  type ServiceCopy,
} from './service';

/* ──────────────────────────────────────────────────────────────
   One engagement, one page.

   The rhythm is the home page's: a rule, a statement, a standfirst,
   and bands that alternate white / grey / dark so eight sections do
   not read as one. Nothing here is bespoke — `SectionHead`, `Rule`,
   `Evidence`, `Prose` and `Button` are the same primitives the home
   page is built from, which is what stops an inner page reading as
   an annexe.

   The dark band is the week-by-week shape, and it is flat colour
   with the CSS bloom rather than a NEAT canvas: the copy sits
   directly on it, and a travelling gradient cannot promise what is
   behind a line of 0.97rem text at an arbitrary scroll offset.
   ────────────────────────────────────────────────────────────── */

const BAND = 'mt-20 md:mt-28 py-20 md:py-28';

/** A hairline-dashed list item — the same marker the legal notice uses. */
function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-5 text-text-muted leading-[1.65] before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-hairline">
      {children}
    </li>
  );
}

export function ServicePage({ copy, path }: { copy: ServiceCopy; path: string }) {
  const vars = serviceVars();
  /* The other three engagements, named exactly as the home page names
     them so the reader recognises where they have landed. */
  const others = t.engagements.items
    .map((item, i) => ({ item, href: SERVICE_PATHS[i] }))
    .filter((entry) => entry.href !== path);

  return (
    <PageLayout>
      <PageHead title={copy.title} intro={copy.intro} meta={copy.meta} titleClass="max-w-[19ch]" />

      <div className={`${CONTAINER} mt-12 md:mt-16`}>
        <Prose paragraphs={copy.lead} vars={vars} className="reveal d2 text-[1.05rem]" />
      </div>

      {/* ── Fit ─────────────────────────────────────────────────
          The second column is the one that makes the first one
          believable. A page that only lists who it is for is a
          brochure. */}
      <section className={`${CONTAINER} mt-20 md:mt-28`}>
        <SectionHead
          title={copy.fit.title}
          intro={copy.fit.intro}
          titleClass="max-w-[15ch]"
          className="mb-12 md:mb-14"
        />
        <div className="grid grid-cols-1 min-[820px]:grid-cols-2 gap-x-14 gap-y-12">
          {[
            { title: copy.fit.forTitle, items: copy.fit.for },
            { title: copy.fit.notTitle, items: copy.fit.not },
          ].map((col) => (
            <div key={col.title} className="reveal">
              <h3 className="text-[1.08rem] font-600 text-text-main">{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-3.5 max-w-[46ch]">
                {col.items.map((item) => (
                  <Bullet key={item}>{inline(item, vars)}</Bullet>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── The problem shapes ──────────────────────────────────
          Written as situations a reader can recognise on sight,
          because that is how somebody arrives at a page like this:
          not looking for "workflow automation" but for the thing
          that happens to them every Monday. */}
      <section className={`${BAND} bg-bg-alt`}>
        <div className={CONTAINER}>
          <SectionHead
            title={copy.problems.title}
            intro={copy.problems.intro}
            titleClass="max-w-[16ch]"
            className="mb-12 md:mb-14"
          />
          <div className="grid grid-cols-1 min-[760px]:grid-cols-2 gap-x-14 gap-y-9 stagger">
            {copy.problems.items.map((item) => (
              <div key={item.title} className="border-t border-hairline pt-5">
                <h3 className="text-[1.08rem] font-600 text-text-main max-w-[30ch]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.97rem] leading-[1.62] text-text-muted max-w-[46ch]">
                  {inline(item.body, vars)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ────────────────────────────────────────
          Set as a spec: label left, value right, on hairlines. A
          reader checking whether they get the repo is scanning. */}
      <section className={`${CONTAINER} mt-20 md:mt-28`}>
        <SectionHead
          title={copy.deliverables.title}
          intro={copy.deliverables.intro}
          titleClass="max-w-[14ch]"
          className="mb-10 md:mb-12"
        />
        <div className="stagger">
          {copy.deliverables.items.map((item) => (
            <div
              key={item.title}
              className="grid grid-cols-1 min-[820px]:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] gap-x-12 gap-y-2 border-t border-hairline-soft py-5">
              <h3 className="text-[1.02rem] font-600 text-text-main">{item.title}</h3>
              <p className="text-text-muted leading-[1.65] max-w-[54ch]">
                {inline(item.body, vars)}
              </p>
            </div>
          ))}
          <div className="border-t border-hairline-soft" />
        </div>
      </section>

      {/* ── How it runs ─────────────────────────────────────────
          The one place on the page where order matters, so it gets
          the treatment the home page's process section gets: each
          step hangs off its own rule and the rules draw in left to
          right. */}
      <section className={`relative ${BAND} text-white bg-bg-dark isolate overflow-hidden`}>
        <DarkGlow />
        <div className={`relative z-10 ${CONTAINER}`}>
          <SectionHead
            dark
            title={copy.running.title}
            intro={copy.running.intro}
            titleClass="max-w-[14ch]"
            className="mb-14 md:mb-16"
          />
          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 min-[1000px]:grid-cols-4 gap-x-10 gap-y-12 stagger">
            {copy.running.steps.map((step, i) => (
              <div key={step.title} className="relative pt-7">
                <span
                  aria-hidden="true"
                  className="rule absolute inset-x-0 top-0 h-px bg-white/30"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                />
                <span className="label text-accent-light">{step.label}</span>
                <h3 className="mt-3 text-white font-600">{step.title}</h3>
                <p className="mt-2.5 text-white/60 text-[0.97rem] leading-[1.62]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof ───────────────────────────────────────────────
          Every figure carries the link you check it at. That is the
          whole argument of the site, so it is the component rather
          than a footnote. */}
      <section className={`${CONTAINER} mt-20 md:mt-28`}>
        <SectionHead
          title={copy.proof.title}
          intro={copy.proof.intro}
          titleClass="max-w-[16ch]"
          className="mb-10 md:mb-12"
        />
        <div className="stagger">
          {copy.proof.evidence.map((e) => (
            <Evidence key={e.label} value={e.value} label={e.label} source={e.source} href={e.href} />
          ))}
          <div className="border-t border-hairline-soft" />
        </div>
        <Prose paragraphs={copy.proof.body} vars={vars} className="mt-10 reveal" />
      </section>

      {/* ── Questions ───────────────────────────────────────────
          Plain text on purpose. FAQ rich results were withdrawn for
          everything but government and health sites, so marking this
          up would add schema nobody renders. */}
      <section className={`${BAND} bg-bg-alt`}>
        <div className={CONTAINER}>
          <SectionHead
            title={copy.faq.title}
            intro={copy.faq.intro}
            titleClass="max-w-[14ch]"
            className="mb-10 md:mb-12"
          />
          <div className="stagger">
            {copy.faq.items.map((item) => (
              <div
                key={item.q}
                className="grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-x-12 gap-y-2 border-t border-hairline py-6">
                <h3 className="text-[1.02rem] font-600 text-text-main max-w-[32ch]">{item.q}</h3>
                <p className="text-text-muted leading-[1.65] max-w-[56ch]">
                  {inline(item.a, vars)}
                </p>
              </div>
            ))}
            <div className="border-t border-hairline" />
          </div>
        </div>
      </section>

      {/* ── The other three ─────────────────────────────────────── */}
      <section className={`${CONTAINER} mt-20 md:mt-28`}>
        <SectionHead
          title={copy.related.title}
          intro={copy.related.intro}
          titleClass="max-w-[15ch]"
          className="mb-8 md:mb-10"
        />
        <div className="grid grid-cols-1 min-[760px]:grid-cols-3 gap-x-10 gap-y-1 stagger">
          {others.map(({ item, href }) => (
            <a
              key={href}
              href={servicePath(href)}
              className="group flex flex-col border-t border-hairline pt-5 pb-6 transition-colors duration-300 hover:border-text-main">
              <h3 className="text-[1.02rem] font-600 text-text-main max-w-[26ch] transition-colors duration-300 group-hover:text-accent">
                {item.title}
              </h3>
              {/* Pushed to the bottom of the row so three cards with
                  one-, two- and three-line titles still line their
                  metadata up with each other. */}
              <div className="mt-auto pt-3">
                <p className="text-[0.94rem] leading-[1.6] text-text-muted">{item.scope}</p>
                <span className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-text-light transition-colors duration-300 group-hover:text-accent">
                  {t.engagements.readMore}
                  <ArrowUpRight
                    size={11}
                    className="shrink-0 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── The close ───────────────────────────────────────────
          The same ask the home page makes, in the same words, so a
          reader who arrived here from a search lands on the promise
          rather than a second, weaker version of it. */}
      <section className={`${CONTAINER} mt-20 md:mt-28 pb-28 md:pb-36`}>
        <SectionHead title={t.contact.title} intro={copy.cta.body} titleClass="max-w-[12ch]" />
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 reveal d1">
          <Button href={contactHref}>
            {t.engagements.unsureCta}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover/btn:translate-x-0.5" />
          </Button>
          <p className="font-mono text-[0.76rem] tracking-[0.01em] text-text-light">
            {t.contact.reply}
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
