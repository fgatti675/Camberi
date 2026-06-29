import type { ReactNode } from 'react';

/* ──────────────────────────────────────────────────────────────
   Shared design primitives. Every section composes these so the
   whole page shares one rhythm: spacing, headings, cards, buttons.
   ────────────────────────────────────────────────────────────── */

export const CONTAINER = 'max-w-[72rem] mx-auto px-6 lg:px-8 w-full';

/* Vertical rhythm. Use SECTION for normal bands, SECTION_AFTER_DIVIDER
   for dark bands that a gradient divider overlaps into from above. */
export const SECTION = 'py-24 md:py-32';
/* A transparent gradient divider overlaps upward into the section before
   it, so that section needs extra room at the bottom; the dark band after
   it needs extra room at the top. */
export const SECTION_BEFORE_DIVIDER = 'pt-24 md:pt-32 pb-44 md:pb-56';
export const SECTION_AFTER_DIVIDER = 'pt-32 md:pt-44 pb-24 md:pb-32';

/* One card treatment, everywhere. Grey fill on the white page,
   subtle hairline, gentle lift on hover. */
export const CARD =
  'rounded-[1.25rem] bg-bg-alt border border-hairline-soft transition-all duration-300 ease-apple';
export const CARD_HOVER =
  'hover:-translate-y-1 hover:bg-bg-main hover:border-hairline hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.28)]';

/* Dark-band equivalent (Services / Process / Contact). */
export const CARD_DARK =
  'rounded-[1.25rem] bg-white/[0.04] border border-white/[0.07] transition-all duration-300 ease-apple';
export const CARD_DARK_HOVER =
  'hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)]';

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`block text-[0.78rem] font-600 tracking-[0.09em] uppercase mb-4 ${
        dark ? 'text-accent-light' : 'text-accent'
      }`}>
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'max-w-[42rem] mx-auto text-center' : 'max-w-[36rem]'} ${className}`}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={dark ? 'text-white' : 'text-text-main'}>{title}</h2>
      {intro && (
        <p
          className={`mt-[1.1rem] text-[1.2rem] md:text-[1.35rem] leading-[1.45] font-400 tracking-[-0.016em] ${
            dark ? 'text-white/60' : 'text-text-muted'
          }`}>
          {intro}
        </p>
      )}
    </div>
  );
}

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'md' | 'sm';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** The surface the button sits on — flips the colour scheme. */
  surface?: 'light' | 'dark';
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

const BTN_BASE =
  'inline-flex items-center gap-1.5 rounded-full font-500 tracking-[-0.01em] cursor-pointer whitespace-nowrap border transition-all duration-250 ease-apple active:scale-[0.97]';

const BTN_SIZES: Record<ButtonSize, string> = {
  md: 'px-[1.7rem] py-[0.85rem] text-[1.0625rem]',
  sm: 'px-5 py-2.5 text-[0.9rem]',
};

const BTN_STYLES: Record<string, string> = {
  'light-primary': 'bg-text-main text-white border-transparent hover:bg-black shadow-sm',
  'light-secondary': 'bg-transparent text-text-main border-hairline hover:border-text-main hover:bg-black/[0.03]',
  'dark-primary': 'bg-white text-text-main border-transparent hover:bg-white/90 shadow-sm',
  'dark-secondary': 'bg-white/10 text-white border-white/25 backdrop-blur-md hover:bg-white/18',
};

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  surface = 'light',
  external = false,
  className = '',
  onClick,
}: ButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${BTN_BASE} ${BTN_SIZES[size]} ${BTN_STYLES[`${surface}-${variant}`]} ${className}`}>
      {children}
    </a>
  );
}

export function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/* A faint brand-blue bloom that ties the dark bands back to the hero. */
export function DarkGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[34rem] opacity-[0.22]"
      style={{
        background:
          'radial-gradient(60% 100% at 50% 0%, var(--color-accent) 0%, transparent 70%)',
      }}
    />
  );
}
