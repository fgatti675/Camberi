import { CONTAINER, SectionHead, Button, ArrowUpRight, GithubIcon, LinkedInIcon } from './ui';
import { AmbientGradient } from './AmbientGradient';
import { AMBIENT_CONTACT } from './neatConfigs';
import { t } from '../i18n';

/* Google Calendar appointment schedule. Kept as a plain outbound link rather
   than an embed — the widget is a fixed light-themed block that fights the
   dark band, and it puts a booking form in front of people the section is
   asking to write an email instead. */
const BOOKING_URL =
  'https://calendar.google.com/appointments/schedules/AcZssZ2FlONeeWMb2BEJcZijwyms1MI1k_G2dSulanQ6cQvVZ7S79V9vLM14mgB6q2X6jDjItlQB0c78';

const EMAIL = 'hello@camberi.com';
const EMAIL_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(t.contact.emailSubject)}`;

const socials = [
  { label: 'GitHub', href: 'https://github.com/firecmsco', icon: <GithubIcon size={18} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/camberi', icon: <LinkedInIcon size={18} /> },
  {
    label: 'X',
    href: 'https://x.com/firecmsco',
    icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
];

/* The close. The email address is the loudest thing in the section, because
   writing one is the single action this whole page is asking for — a button
   labelled "get in touch" would be a smaller version of the same idea. */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative pt-[15rem] md:pt-[23rem] pb-20 md:pb-24 text-white bg-bg-dark isolate overflow-hidden">
      {/* Same banner treatment as the work section: the shape hangs above the
          heading and dissolves before the rule, so the address and the copy sit
          on plain dark whatever the scroll position. */}
      <AmbientGradient
        config={AMBIENT_CONTACT}
        className="h-[40rem]"
        strength={0.24}
        mask="[mask-image:linear-gradient(to_bottom,#000_8rem,transparent_14rem)] md:[mask-image:linear-gradient(to_bottom,#000_14rem,transparent_22rem)]"
      />
      <div className={`relative z-10 ${CONTAINER}`}>
        <SectionHead
          dark
          title={t.contact.title}
          intro={t.contact.body}
          titleClass="max-w-[12ch]"
        />

        {/* The address, at statement size. */}
        <a
          href={EMAIL_URL}
          className="group mt-16 md:mt-20 flex items-baseline gap-3 md:gap-5 reveal">
          <span className="display text-[clamp(1.9rem,5.6vw,3.5rem)] leading-[1.05] text-white transition-colors duration-400 ease-expo group-hover:text-accent-light">
            {EMAIL}
            <span
              aria-hidden="true"
              className="block h-px origin-left scale-x-0 bg-accent-light transition-transform duration-500 ease-expo group-hover:scale-x-100"
            />
          </span>
          <ArrowUpRight
            size={26}
            className="shrink-0 text-white/55 transition-all duration-400 ease-expo group-hover:text-accent-light group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 reveal d1">
          <Button href={BOOKING_URL} external surface="dark" variant="secondary">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            {t.contact.book}
          </Button>
          <p className="font-mono text-[0.76rem] tracking-[0.01em] text-white/60">
            {t.contact.reply}
          </p>
        </div>

        {/* The route from that email to a signed scope, in four steps.
            The mask above dissolves the canvas to nothing by 22rem (14rem
            on mobile) and this block starts about 55rem into the section,
            so these lines sit on flat `bg-bg-dark` at every scroll offset
            rather than on whatever facet the ribbon has drifted to.
            Verified at −350 / 0 / +350 on desktop and at 390px. */}
        <div className="mt-16 md:mt-20 reveal">
          <h3 className="text-[1.05rem] font-600 text-white">{t.contact.next.title}</h3>
          <ol className="mt-7 grid grid-cols-1 min-[640px]:grid-cols-2 min-[980px]:grid-cols-4 gap-x-10 gap-y-8 stagger">
            {t.contact.next.steps.map((step, i) => (
              <li key={step} className="border-t border-white/15 pt-5">
                <span className="block font-mono text-[0.72rem] tracking-[0.06em] text-white/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-3 block text-[0.95rem] leading-[1.6] text-white/75 max-w-[30ch]">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 md:mt-20 pt-7 border-t border-white/10 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <p className="font-mono text-[0.74rem] tracking-[0.02em] text-white/55">
            {t.contact.location}
          </p>
          <div className="flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 bg-white/[0.06] border border-white/10 transition-all duration-300 ease-expo hover:bg-white/[0.12] hover:text-white hover:-translate-y-0.5">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
