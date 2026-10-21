import { CONTAINER, SECTION_LG, SectionHead, Button, ArrowRight } from './ui';
import { t } from '../i18n';
import { SERVICE_PATHS, servicePath } from '../pages/services/service';

/* ──────────────────────────────────────────────────────────────
   Agents.

   The section that turns the table above it into an argument. The
   automations table shows that we hand work to software; this one
   says why we are the people to hand it to an *agent* — because the
   hard part was never the model. It is permissions, review, measurement
   and the fallback, and those are exactly the things the studio has
   been building for a decade: row-level security in Rebase, back
   offices in FireCMS, products kept alive for years.

   It sits on the night tone, a blue-black of its own, and it is the
   one place the page colour blends rather than cuts: the story turns
   from "what we build" to "why it holds up". No ribbon here — the
   shift in the background is the event.

   Kept deliberately short: a statement, one line under it, and four
   properties of one line each. Not steps, so no numbers — each hangs
   off its own rule and the rules draw in one after the other, the same
   device the process section uses for its timeline.
   ────────────────────────────────────────────────────────────── */
export function Agents() {
  return (
    /* At least a screen tall, so the page colour can finish blending into
       the night tone before the next section starts blending out of it. */
    <section
      id="agents"
      data-tone="night"
      className={`relative ${SECTION_LG} min-h-[100svh] flex flex-col justify-center text-white bg-bg-night`}>
      <div className={CONTAINER}>
        <SectionHead
          dark
          title={t.agents.title}
          intro={t.agents.intro}
          titleClass="max-w-[15ch]"
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 min-[560px]:grid-cols-2 min-[960px]:grid-cols-4 gap-x-10 gap-y-12 stagger">
          {t.agents.items.map((item, i) => (
            <div key={item.title} className="relative pt-7">
              <span
                aria-hidden="true"
                className="rule absolute inset-x-0 top-0 h-px bg-white/25"
                style={{ transitionDelay: `${i * 0.12}s` }}
              />
              <h3 className="text-white font-600">{item.title}</h3>
              <p className="mt-2.5 text-white/55 text-[0.97rem] leading-[1.62]">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 reveal">
          <Button href={servicePath(SERVICE_PATHS[0])} surface="dark">
            {t.agents.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
