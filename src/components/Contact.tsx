import { CONTAINER, Eyebrow, Button, ArrowRight, GithubIcon } from './ui';
import { AmbientGradient } from './AmbientGradient';
import { AMBIENT_CONTACT } from './neatConfigs';
import { t } from '../i18n';

/* Google Calendar appointment schedule. Kept as a plain outbound link rather
   than an embed — the widget is a fixed light-themed block that fights the
   dark band, and it puts a booking form in front of people the section is
   asking to write an email instead. */
const BOOKING_URL =
  'https://calendar.google.com/appointments/schedules/AcZssZ2FlONeeWMb2BEJcZijwyms1MI1k_G2dSulanQ6cQvVZ7S79V9vLM14mgB6q2X6jDjItlQB0c78';

const EMAIL_URL = `mailto:hello@camberi.com?subject=${encodeURIComponent(t.contact.emailSubject)}`;

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/firecmsco',
    icon: <GithubIcon size={20} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/camberi',
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    label: 'X',
    href: 'https://x.com/firecmsco',
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 text-white bg-bg-dark isolate overflow-hidden">
      <AmbientGradient config={AMBIENT_CONTACT} className="h-[40rem]" />
      <div className={`relative z-10 ${CONTAINER}`}>
        <div className="text-center max-w-[44rem] mx-auto reveal">
          <Eyebrow dark>{t.contact.eyebrow}</Eyebrow>
          <h2 className="mt-2 text-white text-balance">{t.contact.title}</h2>
          <p className="mt-6 mx-auto max-w-[36rem] text-white/60 text-[1.15rem] leading-[1.55]">
            {t.contact.body}
          </p>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button
              href={EMAIL_URL}
              surface="dark"
              variant="primary">
              hello@camberi.com
              <ArrowRight />
            </Button>
            <Button href={BOOKING_URL} external surface="dark" variant="secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              {t.contact.book}
            </Button>
          </div>

          <p className="mt-8 text-white/35 text-[0.9rem]">{t.contact.location}</p>

          <div className="mt-10 flex gap-2.5 justify-center">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 bg-white/6 border border-white/10 transition-all duration-200 ease-apple hover:bg-white/12 hover:text-white hover:-translate-y-0.5">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
