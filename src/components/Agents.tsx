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

   It sits on the night tone, a blue-black of its own, so the page
   changes colour as the story turns from "what we build" to "why it
   holds up". No ribbon here: the shift in the background is the
   event, and the copy sits on flat colour at every scroll offset.

   Four properties, not four steps, so no numbers — each hangs off its
   own rule and the rules draw in one after the other, the same device
   the process section uses for its timeline.
   ────────────────────────────────────────────────────────────── */
export function Agents() {
  return (
    <section id="agents" data-tone="night" className={`relative ${SECTION_LG} text-white bg-bg-night`}>
      <div className={CONTAINER}>
        <SectionHead
          dark
          title={t.agents.title}
          intro={t.agents.intro}
          titleClass="max-w-[15ch]"
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 min-[720px]:grid-cols-2 gap-x-14 gap-y-12 stagger">
          {t.agents.items.map((item, i) => (
            <div key={item.title} className="relative pt-7">
              <span
                aria-hidden="true"
                className="rule absolute inset-x-0 top-0 h-px bg-white/25"
                style={{ transitionDelay: `${i * 0.12}s` }}
              />
              <h3 className="text-white text-[1.3rem] font-600">{item.title}</h3>
              <p className="mt-3 text-white/60 text-[1rem] leading-[1.65] max-w-[44ch]">{item.body}</p>
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
