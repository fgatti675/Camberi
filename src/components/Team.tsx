import { CONTAINER, SECTION, SectionHeading, CARD, GithubIcon } from './ui';
import { t } from '../i18n';

interface Member {
  name: string;
  initials: string;
  role: string;
  location: string;
  bio: string;
  links?: { label: string; href: string; icon: 'github' | 'linkedin' }[];
}

const team: Member[] = [
  {
    name: 'Francesco Gatti',
    initials: 'FG',
    location: 'Madrid',
    ...t.team.francesco,
    links: [
      { label: 'GitHub', href: 'https://github.com/fgatti675', icon: 'github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/camberi', icon: 'linkedin' },
    ],
  },
  {
    name: 'Mattia Lorenzutti',
    initials: 'ML',
    location: t.footer.location.split(' · ')[1],
    ...t.team.mattia,
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/camberi', icon: 'linkedin' },
    ],
  },
  {
    name: 'Marian Moldovan',
    initials: 'MM',
    location: 'Madrid',
    ...t.team.marian,
    links: [
      { label: 'GitHub', href: 'https://github.com/marianmoldovan', icon: 'github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/camberi', icon: 'linkedin' },
    ],
  },
];

function LinkedInIcon() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  );
}

export function Team() {
  return (
    <section id="team" className={`${SECTION} bg-bg-main border-t border-hairline-soft`}>
      <div className={CONTAINER}>
        <SectionHeading
          className="mb-14 reveal"
          eyebrow={t.team.eyebrow}
          title={t.team.title}
          intro={t.team.intro}
        />

        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[900px]:grid-cols-3 gap-5">
          {team.map((m, i) => (
            <div key={m.name} className={`${CARD} p-8 flex flex-col reveal d${i + 1}`}>
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-[1rem] font-600 text-white bg-gradient-to-br from-brand-blue to-purple">
                  {m.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="text-text-main font-600 text-[1.1rem] leading-tight">{m.name}</h3>
                  <div className="text-[0.85rem] text-text-light mt-1">{m.role}</div>
                </div>
              </div>

              <p className="mt-5 text-[0.97rem] leading-[1.58] text-text-muted flex-1">{m.bio}</p>

              <div className="mt-6 pt-4 border-t border-hairline-soft flex items-center justify-between">
                <span className="text-[0.82rem] text-text-light">{m.location}</span>
                <div className="flex gap-2">
                  {m.links?.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on ${l.label}`}
                      className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-text-light transition-colors duration-200 hover:text-text-main hover:border-text-main">
                      {l.icon === 'github' ? <GithubIcon size={15} /> : <LinkedInIcon />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* A full-width note rather than a fourth card: honest about how we
            scale without pretending the bench is bigger than it is. */}
        <div className="mt-5 rounded-[1.25rem] bg-bg-main border-2 border-dashed border-hairline p-7 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5 md:gap-7 reveal">
          <span className="inline-flex w-14 h-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-hairline text-text-light">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </span>
          <div>
            <h3 className="text-text-main font-600 text-[1.1rem]">{t.team.specialists.title}</h3>
            <p className="mt-1.5 text-[0.97rem] leading-[1.58] text-text-muted max-w-[52rem]">
              {t.team.specialists.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
