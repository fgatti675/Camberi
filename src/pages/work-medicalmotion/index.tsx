import { PageLayout, PageHead, Prose } from '../../components/PageLayout';
import { CONTAINER } from '../../components/ui';
import {
  CaseSection,
  Decisions,
  CaseList,
  CaseOutcome,
  Testimonial,
  CaseFacts,
  CaseFooter,
} from '../../components/CaseStudy';
import { MedicalMotionCards } from '../../components/MedicalMotionCards';
import { locale } from '../../i18n';
import { localePath } from '../../routes/paths';
import { medicalmotionEn, type MedicalmotionCopy } from './copy.en';
import { medicalmotionEs } from './copy.es';

/* ──────────────────────────────────────────────────────────────
   medicalmotion, as a case study.

   The primitives are in `src/components/CaseStudy.tsx` and the
   words in `copy.en.ts` / `copy.es.ts`; this file is only the
   order they appear in, which is the order a buyer reads: who they
   are, what was in the way, the decisions, what shipped, what came
   of it, and who did the work.

   The screens are the feature cards from the work section, reused
   rather than re-photographed — they are real markup and the
   phones are medicalmotion's own transparent renders, so they
   stay crisp here and follow the product when it moves. There is
   no other imagery of this product we are free to publish.
   ────────────────────────────────────────────────────────────── */

const copy: MedicalmotionCopy = locale === 'es' ? medicalmotionEs : medicalmotionEn;
const home = localePath(locale, '/');

export default function MedicalmotionCase() {
  return (
    <PageLayout>
      <PageHead title={copy.title} intro={copy.intro} meta={copy.meta} titleClass="max-w-[17ch]" />

      <div className={`${CONTAINER} pb-24 md:pb-32`}>
        <CaseSection title={copy.situation.title}>
          <Prose paragraphs={copy.situation.body} />
        </CaseSection>

        <CaseSection title={copy.decisionsSection.title}>
          <Prose paragraphs={[copy.decisionsSection.intro]} />
          <div className="mt-10 md:mt-12">
            <Decisions items={copy.decisions} />
          </div>
        </CaseSection>

        <CaseSection title={copy.shipped.title}>
          <Prose paragraphs={copy.shipped.body} />
          <CaseList items={copy.shipped.items} />

          <figure className="mt-10">
            <MedicalMotionCards variant="grid" />
            <figcaption className="mt-3 font-mono text-[0.72rem] leading-[1.5] tracking-[-0.01em] text-text-light">
              {copy.shipped.caption}
            </figcaption>
          </figure>
        </CaseSection>

        <CaseSection title={copy.outcome.title}>
          <Prose paragraphs={copy.outcome.body} />
          <CaseOutcome items={copy.evidence} />
        </CaseSection>

        {/* Nothing renders here until there is a real quote. */}
        <Testimonial quote={copy.quote} />

        <CaseFacts
          title={copy.factsSection.title}
          rows={copy.facts}
          stack={copy.stack}
          stackLabel={copy.factsSection.stackLabel}
          note={copy.factsNote}
        />

        <CaseFooter
          title={copy.cta.title}
          body={copy.cta.body}
          primary={copy.cta.primary}
          primaryHref={`${home}#contact`}
          secondary={copy.cta.secondary}
          secondaryHref={`${home}#work`}
        />
      </div>
    </PageLayout>
  );
}
