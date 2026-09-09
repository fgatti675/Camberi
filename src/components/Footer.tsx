import { t, locale } from '../i18n';
import { localePath } from '../routes/paths';

/* The studio column mixes two kinds of destination: anchors into the home
   page, and pages of their own. The anchors need a base — on an inner page
   `#work` would scroll nowhere — while the pages are already absolute and
   carry the language prefix themselves. */
function buildColumns(base: string) {
  const page = (path: string) => localePath(locale, path);

  return [
    {
      title: t.footer.studio,
      links: [
        { label: t.nav.work, href: `${base}#work` },
        { label: t.nav.services, href: page('/services/') },
        { label: t.footer.howWeWork, href: `${base}#process` },
        { label: t.nav.team, href: `${base}#team` },
        { label: t.footer.security, href: page('/security/') },
        { label: t.footer.legal, href: page('/legal/') },
        { label: t.footer.privacy, href: page('/privacy/') },
      ],
    },
    {
      title: t.footer.built,
      links: [
        { label: 'FireCMS', href: 'https://firecms.co' },
        { label: 'Rebase', href: 'https://rebase.pro' },
        { label: 'Neat', href: 'https://neat.firecms.co' },
        { label: 'Dadaki', href: 'https://dadaki.com' },
        { label: 'Unbrand.my', href: 'https://unbrand.my' },
        { label: 'medicalmotion', href: 'https://medicalmotion.com' },
      ],
    },
    {
      title: t.footer.connect,
      links: [
        { label: 'hello@camberi.com', href: 'mailto:hello@camberi.com' },
        { label: 'GitHub', href: 'https://github.com/firecmsco' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/company/camberi' },
        { label: 'X / Twitter', href: 'https://x.com/firecmsco' },
      ],
    },
  ];
}

export function Footer({ linkBase = '' }: { linkBase?: string }) {
  const columns = buildColumns(linkBase);

  return (
    <footer className="bg-bg-dark text-white/60 pt-14 pb-10 border-t border-white/8">
      <div className="max-w-[72rem] mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 min-[820px]:grid-cols-[1.3fr_2fr] gap-12 pb-14">
          <div className="flex flex-col">
            <a
              href={`${linkBase}#top`}
              className="text-[1.3rem] font-600 tracking-[-0.03em] text-white hover:opacity-80 transition-opacity self-start">
              camberi
            </a>
            <p className="mt-4 text-white/60 max-w-[24rem] text-[0.95rem] leading-[1.6]">
              {t.footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-1 min-[520px]:grid-cols-2 min-[820px]:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col">
                <h4 className="font-mono text-[0.7rem] font-500 text-white/55 uppercase tracking-[0.14em] mb-4">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.href.startsWith('http') ? '_blank' : undefined}
                        rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-white/50 text-[0.92rem] transition-colors duration-200 hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-7 border-t border-white/8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[0.72rem] text-white/50">
          <span>© {new Date().getFullYear()} Camberi. {t.footer.rights}</span>
          <span>{t.footer.location}</span>
        </div>
      </div>
    </footer>
  );
}
