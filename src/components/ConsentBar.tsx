import { useCallback, useEffect, useState } from 'react';
import { CONSENT, SITE } from '../site';
import { locale } from '../i18n';
import { localePath } from '../routes/paths';
import { consentEn, type ConsentCopy } from './ConsentBar.copy.en';
import { consentEs } from './ConsentBar.copy.es';

/* ──────────────────────────────────────────────────────────────
   Consent, and the only thing on this site that talks to Google.

   The rule the whole file exists to hold: until a visitor has
   accepted, no request is made to any Google domain, no cookie is
   written and no consent-mode ping is sent. Not a "denied" beacon,
   not a preconnect — nothing. Google Analytics is not covered by
   the narrow audience-measurement exemption in the AEPD's cookie
   guide, and § 25 TDDDG requires consent for any storage a German
   visitor's requested service does not need. So the tag cannot sit
   in the prerendered head, where it would fire before React exists;
   it is injected from here, once, on accept.

   Rejecting is not a no-op. The refusal is stored exactly as an
   acceptance is, so the question is not asked again for a year, and
   any `_ga` cookies left over from an earlier acceptance are
   expired on the way out.

   The two buttons are deliberately identical. That is not a style
   preference: consent is only freely given if refusing costs no
   more than agreeing, which is why the AEPD asks for both actions
   at the same level and in the same format.
   ────────────────────────────────────────────────────────────── */

const copy: ConsentCopy = locale === 'es' ? consentEs : consentEn;

type Choice = 'granted' | 'denied';

interface Stored {
  choice: Choice;
  /** Epoch milliseconds. A choice is not consent forever. */
  at: number;
}

const MAX_AGE_MS = CONSENT.maxAgeDays * 24 * 60 * 60 * 1000;

/** One button treatment, used for both answers and for the reset control. */
const BUTTON =
  'inline-flex items-center justify-center rounded-full border border-hairline bg-bg-main px-5 py-1.5 min-[640px]:py-2 text-[0.86rem] min-[640px]:text-[0.9rem] font-500 tracking-[-0.01em] text-text-main cursor-pointer transition-colors duration-200 ease-apple hover:border-text-main hover:bg-black/[0.03]';

/* ── Storage ──────────────────────────────────────────────────
   Every access is wrapped. Safari in private mode, a locked-down
   corporate profile and a browser set to block site data all throw
   on `localStorage` rather than returning null. A visitor whose
   browser refuses to remember is simply asked again next time,
   which is the correct failure — the alternative is measuring
   somebody who never agreed. */
function readChoice(): Choice | null {
  try {
    const raw = localStorage.getItem(CONSENT.storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    if (parsed.choice !== 'granted' && parsed.choice !== 'denied') return null;
    if (typeof parsed.at !== 'number' || Date.now() - parsed.at > MAX_AGE_MS) return null;
    return parsed.choice;
  } catch {
    return null;
  }
}

function writeChoice(choice: Choice) {
  try {
    const record: Stored = { choice, at: Date.now() };
    localStorage.setItem(CONSENT.storageKey, JSON.stringify(record));
  } catch {
    /* Nothing to do but honour the choice for this page view. */
  }
}

function clearChoice() {
  try {
    localStorage.removeItem(CONSENT.storageKey);
  } catch {
    /* Already effectively cleared. */
  }
}

/* ── The tag ──────────────────────────────────────────────────
   Loaded at most once per page, and only from `accept`. The
   Consent Mode v2 defaults are pushed *before* the script is
   injected, so the tag has at no moment been running without them.
   `analytics_storage` is the only signal ever granted: this site
   runs no advertising, and the three ads signals stay denied. */
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/* This has to be the real `arguments` object, and `prefer-rest-params` is
   overruled rather than obeyed here. gtag.js distinguishes a gtag command
   from a Tag Manager event by the pushed value's type: an Arguments object is
   a command, an Array is not. Pushing `[...args]` therefore fails silently —
   no error, no beacon — which is the worst possible way for analytics to be
   broken. Google's own snippet is this exact function, and so is this. */
const gtag: (...args: unknown[]) => void = function () {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments);
};

let tagLoaded = false;

function loadAnalytics() {
  if (tagLoaded) return;
  tagLoaded = true;

  window.dataLayer = window.dataLayer || [];

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  gtag('consent', 'update', { analytics_storage: 'granted' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  /* `config` sends the page_view itself. Firing a second one here would
     double every session's landing page, so it is deliberately absent. */
  gtag('config', SITE.ga4);
}

/** Stop measuring in this page view. The script cannot be unloaded; consent can. */
function revokeAnalytics() {
  if (!tagLoaded) return;
  gtag('consent', 'update', { analytics_storage: 'denied' });
}

/* GA writes `_ga` on the registrable domain and `_ga_<id>` beside it. A
   refusal that leaves a two-year client id in the jar is not a refusal, so
   both are expired against the host and against its dot-prefixed parent —
   whichever the tag used, one of them matches. */
function dropAnalyticsCookies() {
  try {
    const host = location.hostname;
    const parent = host.split('.').slice(-2).join('.');
    const scopes = ['', `; domain=${host}`, `; domain=.${parent}`];
    for (const pair of document.cookie.split(';')) {
      const name = pair.split('=')[0].trim();
      if (!name.startsWith('_ga')) continue;
      for (const scope of scopes) document.cookie = `${name}=; path=/; max-age=0${scope}`;
    }
  } catch {
    /* document.cookie throws where cookies are blocked outright. */
  }
}

/* ── The bar ──────────────────────────────────────────────────
   Renders nothing on the server and nothing on the client's first
   render, so the prerendered HTML and the hydrated tree agree. It
   appears only once an effect has confirmed there is no valid
   stored choice. `fixed` throughout: the document below it never
   moves, so there is no layout shift to measure. On a phone it is
   a full-width strip at the bottom of the viewport, which on the
   home page sits clear of the hero's buttons; from 640px up it is
   a small panel in the bottom-left corner.

   Escape is not handled, on purpose. This is a `region`, not a
   dialog — dismissing it with a keystroke would record silence as
   an answer, and silence is the one thing consent cannot be.

   Before the entrance it is `invisible`, not merely transparent, so
   there is never a moment when two buttons nobody can see are
   sitting in the tab order. */
export function ConsentBar() {
  const [asking, setAsking] = useState(false);
  /* Split from `asking` so the panel can transition in rather than appear. */
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    /* Reading storage is the one thing that decides whether this component
       exists at all, and it can only happen in the browser. It also has to
       happen again whenever the privacy page clears the record, so the same
       function is both the first read and the subscription. */
    const decide = () => {
      const stored = readChoice();
      if (stored === 'granted') loadAnalytics();
      if (stored === null) {
        setEntered(false);
        setAsking(true);
      } else {
        setAsking(false);
      }
    };

    decide();
    window.addEventListener(CONSENT.resetEvent, decide);
    return () => window.removeEventListener(CONSENT.resetEvent, decide);
  }, []);

  /* A beat between mounting the panel and giving it its final position, so it
     slides up instead of appearing.

     This is a timer and not `requestAnimationFrame` for a specific reason:
     rAF does not run in a background tab, and a page opened in one — a
     middle-click, a restored session — would mount the bar and never enter
     it. A timeout fires either way (a background tab only clamps it), so the
     bar is never left in its pre-entrance state. Reduced motion is handled in
     the class list rather than here, because the bar must still arrive. */
  useEffect(() => {
    if (!asking) return;
    const timer = setTimeout(() => setEntered(true), 0);
    return () => clearTimeout(timer);
  }, [asking]);

  const answer = useCallback((choice: Choice) => {
    writeChoice(choice);
    if (choice === 'granted') {
      loadAnalytics();
    } else {
      revokeAnalytics();
      dropAnalyticsCookies();
    }
    setAsking(false);
  }, []);

  if (!asking) return null;

  return (
    <div
      role="region"
      aria-label={copy.regionLabel}
      className={`fixed z-[60] bottom-0 inset-x-0 min-[640px]:bottom-6 min-[640px]:left-6 min-[640px]:right-auto min-[640px]:max-w-[25rem] transition-all duration-500 ease-expo motion-reduce:transition-none ${
        entered ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-3'
      }`}>
      <div className="bg-bg-main border-t border-hairline min-[640px]:border min-[640px]:rounded-[1.25rem] shadow-[0_18px_44px_-24px_rgba(0,0,0,0.35)] px-5 py-3 min-[640px]:px-6 min-[640px]:py-5">
        {/* Tighter on a phone than on a laptop, because on a phone this thing
            is standing in front of the hero. Every row it saves is a row of
            the page the reader can still see while answering. */}
        <p className="text-[0.8rem] leading-[1.4] min-[640px]:text-[0.86rem] min-[640px]:leading-[1.5] text-text-muted max-w-[40ch]">
          {copy.body}{' '}
          <a
            href={localePath(locale, '/privacy/')}
            className="text-text-main underline decoration-hairline underline-offset-[0.2em] transition-colors duration-200 hover:text-accent hover:decoration-accent">
            {copy.policy}
          </a>
        </p>

        {/* Same element, same classes, same width. The only difference between
            the two is the word on them and what they store. */}
        <div className="mt-2.5 min-[640px]:mt-3.5 flex gap-2.5">
          <button
            type="button"
            onClick={() => answer('granted')}
            className={`${BUTTON} flex-1 min-[640px]:flex-none min-[640px]:min-w-[7rem]`}>
            {copy.accept}
          </button>
          <button
            type="button"
            onClick={() => answer('denied')}
            className={`${BUTTON} flex-1 min-[640px]:flex-none min-[640px]:min-w-[7rem]`}>
            {copy.reject}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Changing your mind ───────────────────────────────────────
   Consent that cannot be withdrawn is not consent, so the privacy
   page carries this control. It clears the record and tells any
   mounted bar to ask again; if the tag is already running in this
   page view, measurement stops immediately and the cookies go with
   it.

   Exported as a component rather than as a plain function so the
   copy, the storage key and the event name stay in one file, and so
   the page never has to know how the choice is stored. The status
   line reads storage, so it is empty until an effect has run — its
   height is reserved rather than left to jump. */
export function CookieSettings() {
  const [stored, setStored] = useState<Choice | 'none' | 'unread'>('unread');

  useEffect(() => {
    const sync = () => setStored(readChoice() ?? 'none');
    sync();
    window.addEventListener(CONSENT.resetEvent, sync);
    return () => window.removeEventListener(CONSENT.resetEvent, sync);
  }, []);

  const reset = () => {
    clearChoice();
    revokeAnalytics();
    dropAnalyticsCookies();
    window.dispatchEvent(new Event(CONSENT.resetEvent));
  };

  const status: string =
    stored === 'granted'
      ? copy.statusGranted
      : stored === 'denied'
        ? copy.statusDenied
        : stored === 'none'
          ? copy.statusNone
          : '';

  return (
    <div className="mt-7">
      <button type="button" onClick={reset} className={BUTTON}>
        {copy.settingsAction}
      </button>
      <p className="mt-3 min-h-[1.4em] font-mono text-[0.74rem] tracking-[-0.01em] text-text-light">
        {status}
      </p>
    </div>
  );
}
