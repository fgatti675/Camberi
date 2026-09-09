/* English copy for /privacy/.

   An article 13 notice for this website and nothing else. It describes what
   actually happens on camberi.com — a static site on Firebase Hosting, one
   analytics tag that does not load until somebody says yes, an email address
   and a link to a calendar — rather than reciting the clauses a template
   would supply for a product this site does not have.

   Facts come from `src/site.ts` as `__TOKEN__`; links are `[label](href)`.
   Everything asserted about Google is taken from Google's own documentation
   and linked from the sentence that asserts it, so a reader can check it and
   so the next person to edit this page can see when it went stale.
   ────────────────────────────────────────────────────────────── */

interface PrivacyBlock {
  /** Stable handle — the page hangs the cookie-settings control off `cookies`. */
  id: string;
  title: string;
  body: string[];
  list?: string[];
}

const blocks: PrivacyBlock[] = [
  {
    id: 'controller',
    title: 'Who is responsible',
    body: [
      '__LEGAL_NAME__, trading as Camberi, __ADDRESS__, tax number __TAX_ID__, is the controller for the personal data described here. The full company details are in the [legal notice](/legal/).',
      'For anything on this page, write to [__EMAIL__](mailto:__EMAIL__). There is no data protection officer: article 37 of the GDPR requires one for large-scale monitoring or large-scale processing of special categories of data, and a three-person studio running a brochure site does neither.',
    ],
  },
  {
    id: 'summary',
    title: 'What happens here',
    body: [
      'This is a static website. It has no accounts, no login, no forms and no shop. Three things touch personal data, and this page is the three of them in order: the server keeps request logs, an analytics tag runs if — and only if — you accept it, and the email address above reaches a real mailbox.',
    ],
  },
  {
    id: 'logs',
    title: 'Server logs',
    body: [
      'The site is served by Firebase Hosting, a Google Cloud service. Google acts as our processor; for customers established in the European Economic Area the contracting entity is __HOST_ENTITY__, __HOST_ADDRESS__.',
      'Firebase Hosting records the IP address of each request. In Google’s words, it “uses IP addresses of incoming requests to detect abuse and provide customers with detailed analysis of usage data”, and “Hosting retains IP data for a few months”. That is Google’s own retention wording and their [privacy page](https://firebase.google.com/support/privacy) is the current statement of it. We do not read those logs individually and have no tool here that resolves an address to a person.',
      'The legal basis is our legitimate interest under article 6(1)(f) in keeping the site available and defending it against abuse. Nothing about these logs is optional — a server that answers a request has already received the address it must answer to.',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics, only after you accept',
    body: [
      'We use Google Analytics 4 (property __GA4__) to count visits. It is not loaded when the page loads. Until you press Accept, no request is made to any Google measurement domain, no cookie is set and no consent signal is sent — the tag is injected by the browser only once you have agreed, which is why the choice appears before anything else does.',
      'The legal basis for storing anything on your device is your consent: article 6(1)(a) of the GDPR with article 22.2 of Spanish Law 34/2002, and § 25(1) TDDDG for visitors in Germany. Google Analytics is not covered by the narrow audience-measurement exemption in the AEPD’s cookie guide, which is why it sits behind a choice rather than being on by default.',
      'If you accept, Google Analytics sets two cookies on this domain, and they are the only cookies this site ever writes.',
      'The data controller for Google Analytics in the EEA is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, with Google LLC processing in the United States. Google states that it [does not log or store individual IP addresses from EU, Swiss or UK visitors](https://support.google.com/analytics/answer/12017362), collecting that traffic through EU-based domains and servers and discarding the address once a coarse location has been derived from it. Transfers to the United States rely on the EU-US Data Privacy Framework, to which Google LLC is certified, with the standard contractual clauses behind it.',
      'What we see is aggregate: how many people read a page, which country and which kind of device they came from, and which link brought them. We do not connect it to a name and we never upload one. No advertising signal is ever granted — ad storage, ad user data and ad personalisation are set to denied under Consent Mode and stay there. Google retains the underlying event data for the period set on the property, which on the standard tier cannot exceed 14 months.',
      'You can change your answer at any time, below.',
    ],
    list: [
      '__GA_COOKIE__ — distinguishes one browser from another. Expires after 2 years.',
      '__GA_SESSION_COOKIE__ — keeps the state of the current session. Expires after 2 years.',
    ],
  },
  {
    id: 'cookies',
    title: 'What is stored in your browser',
    body: [
      'Apart from the two analytics cookies above, this site sets no cookies at all: no advertising, no tag manager, no social plugins, no embedded video, no fonts fetched from someone else’s CDN — the typefaces are files on this domain.',
      'Two small values are kept in your browser’s local storage. They are not cookies, they are never sent to us or to anyone else, and they exist so the site stops asking you things you have already answered: __LANG_KEY__ remembers whether you read this in English or in Spanish, and __CONSENT_KEY__ remembers your answer to the analytics question and the date you gave it. That answer stands for twelve months, after which the question comes back.',
      'Clearing your browser’s storage for this site removes both. So does the button below.',
    ],
  },
  {
    id: 'email',
    title: 'If you email us',
    body: [
      'Writing to [__EMAIL__](mailto:__EMAIL__) means we hold your address, your name if you sign it, and whatever you chose to put in the message. We use it to answer you and to keep the thread, because a conversation about a piece of work has to be readable six months later.',
      'The legal basis is article 6(1)(b) where you are asking about work we might do together, and otherwise our legitimate interest under article 6(1)(f) in replying to people who write to us. The mailbox is hosted by our email provider, which processes the messages on our behalf and does nothing else with them.',
      'An enquiry that does not become work is deleted two years after the last message. One that does becomes part of the client file, which article 30 of the Spanish Commercial Code requires us to keep for six years.',
    ],
  },
  {
    id: 'booking',
    title: 'If you book a call',
    body: [
      'The “book a call” links go to a [Google Calendar appointment page](__BOOKING_URL__). That page is not part of this site: following the link takes you to Google, and what you type there — your name, your email address, whatever you write in the description — is collected by Google and reaches us as the organiser of the booking. [Google’s privacy policy](https://policies.google.com/privacy) governs that page.',
      'We use the booking to hold the call and to prepare for it, and it is deleted on the same schedule as the correspondence it belongs to.',
    ],
  },
  {
    id: 'links',
    title: 'Links out',
    body: [
      'This site links out to our repositories on [GitHub](__GITHUB__) and our packages on [npm](__NPM__), to [LinkedIn](__LINKEDIN__) and [X](__X__), and to the products we have built. Nothing from those sites is embedded here — no buttons that phone home, no tracking pixels — so none of them learns anything about you until you follow a link, at which point that site’s own policy applies and this one stops.',
    ],
  },
  {
    id: 'never',
    title: 'What we do not do',
    body: [
      'There is no profiling and no automated decision-making of any kind on this site, so article 22 of the GDPR does not come into it. We do not sell, rent or share personal data with advertisers or data brokers, we run no advertising and no remarketing, and we do not build audiences. There is no newsletter, so nothing tracks whether you opened one.',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: [
      'Write to [__EMAIL__](mailto:__EMAIL__) and say what you want. We answer within one month, as article 12(3) requires, and we may ask for something that shows the data is yours before we act — only ever the minimum needed to be sure.',
    ],
    list: [
      'Access — a copy of what we hold about you.',
      'Rectification — correcting anything wrong.',
      'Erasure — deleting it, where we are not required to keep it.',
      'Restriction — freezing it while something is disputed.',
      'Portability — receiving it in a machine-readable form.',
      'Objection — telling us to stop processing based on legitimate interest.',
      'Withdrawal — taking back your consent to analytics, at any time and as easily as you gave it, using the button above. Withdrawing does not undo what was measured before.',
    ],
  },
  {
    id: 'complaints',
    title: 'Complaints',
    body: [
      'If you think we have got this wrong, tell us first — it is usually quicker. You do not have to: article 77 of the GDPR lets you complain to a supervisory authority directly, and you can choose the one where you live.',
      'In Spain that is the [Agencia Española de Protección de Datos](https://www.aepd.es), C/ Jorge Juan 6, 28001 Madrid. In Germany it is the authority for the federal state you live in; for Bavaria, where one of us works, that is the [Bayerisches Landesamt für Datenschutzaufsicht](https://www.lda.bayern.de).',
    ],
  },
  {
    id: 'changes',
    title: 'Changes',
    body: [
      'This policy is dated. If what the site does with data changes, the page changes with it and the date moves; if the change affects what you consented to, the question is asked again rather than assumed.',
    ],
  },
];

export const privacyEn = {
  title: 'Privacy policy',
  intro:
    'What this website does with personal data, which is less than most sites do — and nothing at all until you have said yes to it.',
  updated: 'Last updated 9 September 2026',
  blocks,
};

export type PrivacyCopy = typeof privacyEn;
