import { PageLayout, PageHead, Prose, inline } from '../../components/PageLayout';
import { CONTAINER, Rule } from '../../components/ui';
import { SITE, known } from '../../site';
import { locale } from '../../i18n';
import type { Route } from '../../routes/types';
import { legalEn, type LegalCopy } from './copy.en';
import { legalEs } from './copy.es';

/* ──────────────────────────────────────────────────────────────
   The legal notice.

   Two jurisdictions, one page. Spanish LSSI article 10 requires a
   provider established in Spain to publish its name, tax number,
   registered address, contact details and commercial registry
   entry, permanently and without registration. Germany's § 5 DDG
   asks for the same plus legal form, authorised representatives,
   VAT identification and a second fast contact channel — and since
   this site says Madrid · Munich and sells to German clients, it
   answers both rather than pretending the second reader is not
   there. Splitting them into two pages would have meant two places
   for the same facts to go stale.

   Every value is read from `src/site.ts`. Nothing here is written
   twice, and nothing is invented: an unknown fact drops its row
   rather than printing a placeholder.
   ────────────────────────────────────────────────────────────── */

const copy: LegalCopy = locale === 'es' ? legalEs : legalEn;

/** Values the copy strings reference as `__TOKEN__`. */
const VARS: Record<string, string> = {
  LEGAL_NAME: SITE.legalName,
  DIRECTOR: SITE.representatives[0],
  VAT_ID: SITE.vatId ?? '',
  HOJA: SITE.registry.hoja ?? '',
  BOOKING_URL: SITE.bookingUrl,
  HOST_ENTITY: SITE.host.entity,
  HOST_ADDRESS: SITE.host.address,
  HOST_URL: SITE.host.url,
};

function addressLine(): string {
  return [
    SITE.address.street,
    [SITE.address.postalCode, SITE.address.locality].filter(known).join(' '),
    SITE.address.countryName[locale],
  ]
    .filter(known)
    .join(', ');
}

function registryLine(): string | null {
  const { tomo, folio, seccion, hoja, inscripcion } = SITE.registry;
  const parts = [
    known(tomo) ? `Tomo ${tomo}` : null,
    known(folio) ? `Folio ${folio}` : null,
    known(seccion) ? `Sección ${seccion}` : null,
    known(hoja) ? `Hoja ${hoja}` : null,
    known(inscripcion) ? `Inscripción ${inscripcion}` : null,
  ].filter(known);
  if (!parts.length) return null;
  return `${SITE.registry.office[locale]} — ${parts.join(', ')}`;
}

interface Row {
  label: string;
  value: string | null;
  /** Registry numbers and tax IDs really are data, so they are set in the mono. */
  data?: boolean;
  href?: string;
}

const rows: Row[] = [
  { label: copy.labels.legalName, value: SITE.legalName },
  { label: copy.labels.tradeName, value: SITE.tradeName },
  { label: copy.labels.legalForm, value: copy.legalFormValue },
  { label: copy.labels.taxId, value: SITE.taxId, data: true },
  { label: copy.labels.vatId, value: SITE.vatId, data: true },
  { label: copy.labels.address, value: addressLine() },
  { label: copy.labels.registry, value: registryLine(), data: true },
  { label: copy.labels.director, value: SITE.representatives[0] },
  { label: copy.labels.founded, value: copy.foundedValue },
  { label: copy.labels.email, value: SITE.email, href: `mailto:${SITE.email}`, data: true },
  {
    label: copy.labels.website,
    value: SITE.origin.replace(/^https?:\/\//, ''),
    href: `${SITE.origin}/`,
    data: true,
  },
];

export function Legal() {
  return (
    <PageLayout>
      <PageHead title={copy.title} intro={copy.intro} meta={copy.updated} titleClass="max-w-[13ch]" />

      <div className={`${CONTAINER} pb-28 md:pb-36`}>
        {/* The identification block. A definition list rather than prose,
            because these are field values and a reader looking for a NIF is
            scanning, not reading. */}
        <dl className="mt-14 md:mt-20 stagger">
          {rows.filter((r) => known(r.value)).map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 min-[640px]:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-x-10 gap-y-1 border-t border-hairline-soft py-4">
              <dt className="font-mono text-[0.72rem] font-500 uppercase tracking-[0.12em] text-text-light min-[640px]:pt-1">
                {row.label}
              </dt>
              <dd
                className={`text-text-main max-w-[52ch] ${
                  row.data ? 'font-mono text-[0.92rem] tracking-[-0.01em]' : ''
                }`}>
                {row.href ? (
                  <a
                    href={row.href}
                    className="underline decoration-hairline underline-offset-[0.2em] transition-colors duration-200 hover:text-accent hover:decoration-accent">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
          <div className="border-t border-hairline-soft" />
        </dl>

        {copy.blocks.map((block) => (
          <section key={block.title} className="mt-16 md:mt-20">
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
              </div>
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}

export const route: Route = {
  path: '/legal/',
  priority: 0.3,
  component: Legal,
  locales: {
    en: {
      title: 'Legal notice — Camberi',
      description:
        'FireCMS S.L., trading as Camberi: registered office, tax and commercial registry details, hosting provider, applicable law, and the German Impressum disclosures.',
    },
    es: {
      title: 'Aviso legal — Camberi',
      description:
        'FireCMS S.L., que opera como Camberi: domicilio social, datos fiscales y registrales, proveedor de alojamiento, legislación aplicable y los datos del Impressum alemán.',
    },
  },
};
