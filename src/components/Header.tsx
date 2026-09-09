import { useEffect, useState } from 'react';
import { t, locale, localeHome, otherLocale, switchLocale } from '../i18n';

const navLinks = [
  { label: t.nav.work, href: '#work' },
  { label: t.nav.services, href: '#services' },
  { label: t.nav.openSource, href: '#open-source' },
  { label: t.nav.team, href: '#team' },
];

const otherLabel = otherLocale.toUpperCase();

/* ── Two states, one component ────────────────────────────────
   Over the hero the header is transparent and its type is white,
   because there is a saturated gradient behind it. Everywhere else
   there is no hero to sit on, so it starts in the light pill it
   would otherwise only reach after 24px of scrolling — and its
   section links have to leave the page, since the sections are on
   the home page and this is not.

   The transparent state is also the only one the server can render
   for the home page: `scrolled` starts false on both sides, and the
   effect below corrects it after hydration if the visitor arrived
   part-way down. */
type HeaderVariant = 'hero' | 'solid';

export function Header({ variant = 'hero' }: { variant?: HeaderVariant }) {
  const solid = variant === 'solid';
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(solid);

  /* An inner page's header never changes, so it needs no listener. */
  const base = solid ? localeHome[locale] : '';

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [solid]);

  return (
    <header
      className="fixed left-1/2 -translate-x-1/2 z-50 h-14 flex items-center w-full transition-all duration-300 ease-apple"
      style={{
        maxWidth: 'min(64rem, calc(100% - 1rem))',
        top: scrolled ? '0.375rem' : '0',
        borderRadius: scrolled ? '9999px' : '0',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.68)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(1.8) blur(40px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(1.8) blur(40px)' : 'none',
        border: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        boxShadow: scrolled
          ? '0 2px 16px -4px rgba(0,0,0,0.1), 0 0 0 0.5px rgba(0,0,0,0.03)'
          : 'none',
      }}>
      <nav className="flex items-center justify-between gap-4 w-full max-w-[72rem] mx-auto px-6 lg:px-8">
        <a href={`${base}#top`} className={`text-[1.2rem] font-600 tracking-[-0.03em] transition-colors duration-400 ease-apple ${scrolled ? 'text-text-main' : 'text-white'}`}>
          camberi
        </a>

        <ul className="hidden md:flex gap-0.5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={`${base}${link.href}`} className={`px-3 py-1.5 rounded-[0.6rem] text-[0.9rem] font-500 tracking-[-0.01em] transition-colors duration-200 ${scrolled ? 'text-text-muted hover:text-text-main hover:bg-black/5' : 'text-white/85 hover:text-white hover:bg-white/12'}`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => switchLocale()}
            aria-label={t.nav.switchLanguage}
            className={`inline-flex items-center justify-center rounded-full px-2.5 py-1.5 font-mono text-[0.74rem] font-500 tracking-[0.06em] cursor-pointer border transition-colors duration-200 ${scrolled ? 'text-text-muted border-hairline hover:text-text-main hover:border-text-main' : 'text-white/80 border-white/30 hover:text-white hover:border-white/60'}`}>
            {otherLabel}
          </button>

          <a href={`${base}#contact`} className={`hidden md:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[0.9rem] font-500 tracking-[-0.01em] cursor-pointer whitespace-nowrap transition-all duration-250 ease-apple active:scale-[0.97] border ${scrolled ? 'bg-text-main text-white hover:bg-black border-transparent' : 'bg-white/16 text-white border-white/40 hover:bg-white/28'}`}>
            {t.nav.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </a>

          <button type="button" className={`flex md:hidden w-9.5 h-9.5 items-center justify-center bg-transparent border-none cursor-pointer rounded-[0.6rem] ${scrolled ? 'text-text-main' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)} aria-label={t.nav.toggleMenu} aria-expanded={isOpen}>
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-x-0 top-18 bottom-0 flex flex-col items-center justify-center gap-6 z-[99] p-8 bg-white/96 backdrop-blur-[24px] rounded-b-[1.5rem] md:hidden">
          {navLinks.map((link) => (
            <a key={link.href} href={`${base}${link.href}`} className="text-2xl font-500 text-text-main hover:opacity-80 transition-opacity" onClick={() => setIsOpen(false)}>{link.label}</a>
          ))}
          <a href={`${base}#contact`} className="inline-flex items-center gap-1.5 rounded-full px-[1.7rem] py-[0.85rem] text-[1.0625rem] font-500 tracking-[-0.01em] cursor-pointer border border-transparent whitespace-nowrap transition-all duration-250 ease-apple active:scale-[0.97] bg-text-main text-white hover:bg-black" onClick={() => setIsOpen(false)}>{t.nav.cta}</a>
        </div>
      )}
    </header>
  );
}
