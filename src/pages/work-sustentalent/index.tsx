import { PageLayout, PageHead, Prose } from '../../components/PageLayout';
import { CONTAINER } from '../../components/ui';
import {
  CaseSection,
  Decisions,
  CaseList,
  Shot,
  CaseOutcome,
  Testimonial,
  CaseFacts,
  CaseFooter,
} from '../../components/CaseStudy';
import { locale } from '../../i18n';
import { localePath } from '../../routes/paths';
import { sustentalentEn, type SustentalentCopy } from './copy.en';
import { sustentalentEs } from './copy.es';

/* ──────────────────────────────────────────────────────────────
   SustenTalent, as a case study.

   Same anatomy as the medicalmotion page, one section longer: this
   is the engagement where something shipped and had to be deleted
   again, and that belongs on the page. A case study with no
   retrospective is an advertisement.

   The one screenshot is the same shot the work section uses — the
   public board — because it is the only surface of this product a
   stranger can open. The admin panel, where most of the work is,
   holds real employers and real candidates and is not ours to
   publish.
   ────────────────────────────────────────────────────────────── */

const copy: SustentalentCopy = locale === 'es' ? sustentalentEs : sustentalentEn;
const home = localePath(locale, '/');

export default function SustentalentCase() {
  return (
    <PageLayout>
      <PageHead title={copy.title} intro={copy.intro} meta={copy.meta} titleClass="max-w-[18ch]" />

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
          <Shot
            src="/work/sustentalent.webp"
            alt={copy.shipped.alt}
            width={1600}
            height={1000}
            caption={copy.shipped.caption}
            href="https://sustentalent.com"
          />
        </CaseSection>

        <CaseSection title={copy.differently.title}>
          <Prose paragraphs={copy.differently.body} />
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
