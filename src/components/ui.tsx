import type { ReactNode } from 'react';

/* ──────────────────────────────────────────────────────────────
   Shared design primitives. Every section composes these so the
   whole page shares one rhythm: spacing, headings, cards, buttons.
   ────────────────────────────────────────────────────────────── */

export const CONTAINER = 'max-w-[72rem] mx-auto px-6 lg:px-8 w-full';
/* For the work section, where the screenshots want more room. */
export const CONTAINER_WIDE = 'max-w-[78rem] mx-auto px-6 lg:px-8 w-full';

/* Vertical rhythm. The full-bleed gradient bands own the transitions
   between sections now, so every section gets the same generous
   padding and none needs asymmetric compensation for a divider. */
export const SECTION = 'py-24 md:py-32';
export const SECTION_LG = 'py-28 md:py-40';

/* One card treatment, everywhere. Grey fill on the white page,
   subtle hairline, gentle lift on hover. */
export const CARD =
  'rounded-[1.25rem] bg-bg-alt border border-hairline-soft transition-all duration-300 ease-apple';
export const CARD_HOVER =
  'hover:-translate-y-1 hover:bg-bg-main hover:border-hairline hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.28)]';

/* Dark-band equivalent. */
export const CARD_DARK =
  'rounded-[1.25rem] bg-white/[0.04] border border-white/[0.07] transition-all duration-300 ease-apple';
export const CARD_DARK_HOVER =
  'hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/[0.14] hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)]';

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
  eyebrow?: string;
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
    <div className={`${centered ? 'max-w-[44rem] mx-auto text-center' : 'max-w-[38rem]'} ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
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

/* A hard number with its caption. The numeral is the loud part. */
export function Stat({
  value,
  label,
  dark = false,
}: {
  value: ReactNode;
  label: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span
        className={`text-[2.35rem] md:text-[2.9rem] font-600 leading-[1] tracking-[-0.045em] tabular-nums ${
          dark ? 'text-white' : 'text-text-main'
        }`}>
        {value}
      </span>
      <span
        className={`mt-3 text-[0.92rem] leading-[1.45] max-w-[13rem] ${
          dark ? 'text-white/50' : 'text-text-muted'
        }`}>
        {label}
      </span>
    </div>
  );
}

/* Small capsule used for stacks and engagement metadata. */
export function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[0.76rem] font-500 tracking-[-0.005em] ${
        dark
          ? 'text-white/60 border border-white/12 bg-white/[0.04]'
          : 'text-text-muted border border-hairline bg-bg-main'
      }`}>
      {children}
    </span>
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

export function ArrowUpRight({ className = '', size = 16 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
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
