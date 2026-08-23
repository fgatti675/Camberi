import { CONTAINER, SECTION, SectionHead, GithubIcon, LinkedInIcon } from './ui';
import { t } from '../i18n';

interface Member {
  name: string;
  initials: string;
  role: string;
  bio: string;
  links?: { label: string; href: string; icon: 'github' | 'linkedin' }[];
}

const team: Member[] = [
  {
    name: 'Francesco Gatti',
    initials: 'FG',
    ...t.team.francesco,
    links: [
      { label: 'GitHub', href: 'https://github.com/fgatti675', icon: 'github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/camberi', icon: 'linkedin' },
    ],
  },
  {
    name: 'Mattia Lorenzutti',
    initials: 'ML',
    ...t.team.mattia,
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/camberi', icon: 'linkedin' },
    ],
  },
  {
    name: 'Marian Moldovan',
    initials: 'MM',
    ...t.team.marian,
    links: [
      { label: 'GitHub', href: 'https://github.com/marianmoldovan', icon: 'github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/camberi', icon: 'linkedin' },
    ],
  },
];

/* Three people, set as three entries in a masthead rather than three
   cards: a rule, a name at display size, the role in the mono voice, and
   the bio underneath. It reads as a list of authors, which is what it is. */
export function Team() {
  return (
    <section id="team" className={`${SECTION} bg-bg-main`}>
      <div className={CONTAINER}>
        <SectionHead
          title={t.team.title}
          intro={t.team.intro}
          titleClass="max-w-[14ch]"
          className="mb-14 md:mb-16"
        />

        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3 gap-x-12 gap-y-12 stagger">
          {team.map((m) => (
            <div key={m.name} className="flex flex-col border-t border-hairline pt-7">
              <div className="min-w-0">
                <h3 className="display text-[1.7rem] leading-[1.1] text-text-main">{m.name}</h3>
                <div className="mt-2 font-mono text-[0.72rem] tracking-[0.02em] text-text-light">
                  {m.role}
                </div>
              </div>

              <p className="mt-5 text-[0.97rem] leading-[1.62] text-text-muted flex-1 max-w-[42ch]">
                {m.bio}
              </p>

              <div className="mt-6 flex gap-2">
                {m.links?.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on ${l.label}`}
                    className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-text-light transition-all duration-300 ease-expo hover:text-text-main hover:border-text-main hover:-translate-y-0.5">
                    {l.icon === 'github' ? <GithubIcon size={15} /> : <LinkedInIcon />}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* A full-measure note rather than a fourth entry: honest about how
            we scale without pretending the bench is bigger than it is. */}
        <div className="mt-14 pt-7 border-t border-hairline grid grid-cols-1 min-[820px]:grid-cols-[1fr_1.6fr] gap-x-12 gap-y-3 reveal">
          <h3 className="text-[1.05rem] font-600 text-text-main">{t.team.specialists.title}</h3>
          <p className="text-[0.97rem] leading-[1.62] text-text-muted max-w-[58ch]">
            {t.team.specialists.body}
          </p>
        </div>
      </div>
    </section>
  );
}
