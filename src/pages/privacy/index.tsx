import { PageLayout, PageHead, Prose, inline } from '../../components/PageLayout';
import { CONTAINER, Rule } from '../../components/ui';
import { CookieSettings } from '../../components/ConsentBar';
import { SITE, CONSENT, known } from '../../site';
import { locale, STORAGE_KEY } from '../../i18n';
import { privacyEn, type PrivacyCopy } from './copy.en';
import { privacyEs } from './copy.es';

/* ──────────────────────────────────────────────────────────────
   The privacy policy.

   An article 13 notice for this website, written for the site that
   exists rather than for the SaaS product a template assumes. It
   sits beside the legal notice and is built the same way — one
   column of section headings, one of prose, every fact read from
   `src/site.ts` — because the two are read by the same person on
   the same afternoon and should not look like different documents.

   The cookie names and storage keys are derived from the constants
   the code actually uses, not typed out. A policy that names a
   cookie the site does not set is worse than one that names none:
   it is checkable, and wrong.
   ────────────────────────────────────────────────────────────── */

const copy: PrivacyCopy = locale === 'es' ? privacyEs : privacyEn;

/** `G-Z5J6BDF0QT` → `_ga_Z5J6BDF0QT`, which is the cookie GA actually writes. */
const GA_SESSION_COOKIE = `_ga_${SITE.ga4.replace(/^G-/, '')}`;

function addressLine(): string {
  return [
    SITE.address.street,
    [SITE.address.postalCode, SITE.address.locality].filter(known).join(' '),
    SITE.address.countryName[locale],
  ]
    .filter(known)
    .join(', ');
}

const VARS: Record<string, string> = {
  LEGAL_NAME: SITE.legalName,
  ADDRESS: addressLine(),
  TAX_ID: SITE.taxId ?? '',
  EMAIL: SITE.email,
  GA4: SITE.ga4,
  GA_COOKIE: '_ga',
  GA_SESSION_COOKIE,
  LANG_KEY: STORAGE_KEY,
  CONSENT_KEY: CONSENT.storageKey,
  HOST_ENTITY: SITE.host.entity,
  HOST_ADDRESS: SITE.host.address,
  BOOKING_URL: SITE.bookingUrl,
  GITHUB: SITE.social.github,
  NPM: SITE.social.npm,
  LINKEDIN: SITE.social.linkedin,
  X: SITE.social.x,
};

export default function Privacy() {
  return (
    <PageLayout>
      <PageHead title={copy.title} intro={copy.intro} meta={copy.updated} titleClass="max-w-[12ch]" />

      <div className={`${CONTAINER} pb-28 md:pb-36`}>
        {copy.blocks.map((block) => (
          <section key={block.id} className="mt-14 md:mt-18">
            <Rule />
            <div className="pt-8 grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-x-10 gap-y-5">
              <h2 className="reveal font-sans text-[1.15rem] font-600 leading-[1.3] tracking-[-0.018em] text-text-main">
                {block.title}
              </h2>
              <div className="reveal d1">
                <Prose paragraphs={block.body} vars={VARS} />

                {block.list && (
                  <ul className="mt-5 flex flex-col gap-3 max-w-[62ch]">
                    {block.list.map((item) => (
                      <li
                        key={item}
                        className="relative pl-5 text-text-muted leading-[1.65] before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-hairline">
                        {inline(item, VARS)}
                      </li>
                    ))}
                  </ul>
                )}

                {/* The withdrawal control has to live in the document, next to
                    the sentence that promises it — a policy that says consent
                    can be withdrawn and then sends the reader to look for a
                    floating icon has not really promised anything. */}
                {block.id === 'cookies' && <CookieSettings />}
              </div>
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
