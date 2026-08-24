import type { ReactNode } from 'react';

/* ──────────────────────────────────────────────────────────────
   Shared design primitives.

   The page is built as a document, not as a deck of cards: a
   measure, a set of rules, three type voices and one entrance.
   Every section composes these, so the rhythm holds across nine
   very different arguments.
   ────────────────────────────────────────────────────────────── */

export const CONTAINER = 'max-w-[72rem] mx-auto px-6 lg:px-8 w-full';
/* For the work section, where the screenshots want more room. */
export const CONTAINER_WIDE = 'max-w-[78rem] mx-auto px-6 lg:px-8 w-full';

export const SECTION = 'py-24 md:py-32';
export const SECTION_LG = 'py-28 md:py-40';

/* One card treatment, everywhere. Used sparingly now — cards are
   for things that really are discrete objects (a repository, a
   person), never as the structure of a whole section. */
export const CARD =
  'rounded-[1.25rem] bg-bg-alt border border-hairline-soft transition-all duration-300 ease-apple';
export const CARD_HOVER =
  'hover:-translate-y-1 hover:bg-bg-main hover:border-hairline hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.28)]';

export const CARD_DARK =
  'rounded-[1.25rem] bg-white/[0.04] border border-white/[0.07] transition-all duration-300 ease-apple';
export const CARD_DARK_HOVER =
  'hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/[0.14] hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)]';

/* ── Brand marks ──────────────────────────────────────────────
   Firebase serves images with `max-age=604800`, and these live at stable
   filenames — so replacing one keeps the old file on every returning
   visitor's machine for a week. That is exactly what happened when
   Rebase's mark changed: the origin was correct and browsers went on
   drawing the previous logo. Bump this whenever a file under /brand
   changes content without changing its name. */
const BRAND_VERSION = 2;

export const brand = (file: string) => `/brand/${file}?v=${BRAND_VERSION}`;

/* ── Rules ────────────────────────────────────────────────────
   The page's main structural device. A rule draws itself in from
   the left when its section arrives, which is why sections can
   open on a bare statement and still feel framed. */
export function Rule({
  dark = false,
  className = '',
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`rule h-px w-full ${dark ? 'bg-white/15' : 'bg-hairline'} ${className}`}
    />
  );
}

/* ── Section opening ──────────────────────────────────────────
   A rule, then the statement, then an optional standfirst set at
   reading width. There is deliberately no label above the title —
   the section markers live in the scroll spine on the left, the
   way running heads live in the margin of a book.

   The statement's column is sized to the statement rather than to a
   fixed fraction, so the standfirst sits directly beside it instead
   of being pushed out to the container's far edge. Their first
   baselines are aligned, which is what makes the pair read as one
   masthead rather than as two blocks that happen to share a row. */
interface SectionHeadProps {
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  /** Constrain the statement so it breaks where we want it to. */
  titleClass?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHead({
  title,
  intro,
  dark = false,
  titleClass = 'max-w-[19ch]',
  className = '',
  children,
}: SectionHeadProps) {
  return (
    <div className={className}>
      <Rule dark={dark} />
      <div className="pt-10 md:pt-14 grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,auto)_minmax(0,1fr)] gap-x-14 gap-y-5 items-baseline">
        <h2 className={`${dark ? 'text-white' : 'text-text-main'} ${titleClass} reveal`}>
          {title}
        </h2>
        {intro && (
          <p
            className={`text-[1.08rem] md:text-[1.15rem] leading-[1.6] max-w-[38ch] reveal d1 ${
              dark ? 'text-white/60' : 'text-text-muted'
            }`}>
            {intro}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

/* ── Evidence ─────────────────────────────────────────────────
   A figure, what it means, and where to go and check it. The
   whole argument of this site is that the numbers are verifiable,
   so the source is part of the component, not a footnote. */
export function Evidence({
  value,
  label,
  source,
  href,
  dark = false,
}: {
  value: string;
  label: ReactNode;
  source: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group grid grid-cols-[minmax(5.5rem,auto)_1fr] min-[720px]:grid-cols-[9rem_1fr_auto] items-baseline gap-x-6 gap-y-1.5 py-6 border-t transition-colors duration-300 ${
        dark
          ? 'border-white/10 hover:border-white/30'
          : 'border-hairline-soft hover:border-text-main'
      }`}>
      <span
        className={`figure text-[2.1rem] min-[720px]:text-[2.6rem] leading-none ${
          dark ? 'text-white' : 'text-text-main'
        }`}>
        {value}
      </span>
      <span
        className={`text-[1rem] min-[720px]:text-[1.08rem] leading-[1.5] ${
          dark ? 'text-white/70' : 'text-text-muted'
        }`}>
        {label}
      </span>
      <span
        className={`col-span-2 min-[720px]:col-span-1 font-mono text-[0.72rem] tracking-[-0.01em] inline-flex items-center gap-1.5 transition-colors duration-300 ${
          dark
            ? 'text-white/50 group-hover:text-white/70'
            : 'text-text-light group-hover:text-accent'
        }`}>
        {source}
        <ArrowUpRight
          size={11}
          className="shrink-0 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </a>
  );
}

/* Small capsule used for stacks and engagement metadata. */
export function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[0.72rem] font-500 tracking-[-0.01em] ${
        dark
          ? 'text-white/55 border border-white/12 bg-white/[0.04]'
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
  'group/btn inline-flex items-center gap-2 rounded-full font-500 tracking-[-0.01em] cursor-pointer whitespace-nowrap border transition-all duration-300 ease-expo active:scale-[0.97]';

const BTN_SIZES: Record<ButtonSize, string> = {
  md: 'px-[1.6rem] py-[0.8rem] text-[1.02rem]',
  sm: 'px-5 py-2.5 text-[0.9rem]',
};

const BTN_STYLES: Record<string, string> = {
  'light-primary':
    'bg-text-main text-white border-transparent hover:bg-black shadow-[0_10px_26px_-14px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_34px_-14px_rgba(0,0,0,0.7)]',
  'light-secondary':
    'bg-transparent text-text-main border-hairline hover:border-text-main hover:bg-black/[0.03]',
  'dark-primary':
    'bg-white text-text-main border-transparent hover:bg-white/90 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.9)]',
  'dark-secondary':
    'bg-white/10 text-white border-white/25 backdrop-blur-md hover:bg-white/18 hover:border-white/40',
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
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ArrowUpRight({ className = '', size = 16 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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

export function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
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
