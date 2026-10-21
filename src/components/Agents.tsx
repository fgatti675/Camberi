import { CONTAINER, SECTION_LG, SectionHead, Button, ArrowRight } from './ui';
import { t } from '../i18n';
import { SERVICE_PATHS, servicePath } from '../pages/services/service';

/* ──────────────────────────────────────────────────────────────
   Agents.

   Why we are the people to hand work to an *agent*: the hard part was
   never the model. It is permissions, review, measurement and the
   fallback, and those are exactly the things the studio has been
   building for years. The products and their numbers are told once,
   in the work section that follows, so none of them is named here.

   Kept deliberately short: a statement, one line under it, and four
   properties of one line each. Not steps, so no numbers — each hangs
   off its own rule and the rules draw in one after the other, the same
   device the process section uses for its timeline.
   ────────────────────────────────────────────────────────────── */
export function Agents() {
  return (
    <section id="agents" className={`${SECTION_LG} bg-bg-alt`}>
      <div className={CONTAINER}>
        <SectionHead
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
                className="rule absolute inset-x-0 top-0 h-px bg-hairline"
                style={{ transitionDelay: `${i * 0.12}s` }}
              />
              <h3 className="font-600">{item.title}</h3>
              <p className="mt-2.5 text-text-muted text-[0.97rem] leading-[1.62]">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 reveal">
          <Button href={servicePath(SERVICE_PATHS[0])}>
            {t.agents.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
