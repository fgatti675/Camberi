/* English copy for the consent bar and for the reset control on the privacy
   page.

   It lives here rather than in `src/i18n/en.ts` because that file is for the
   chrome every page shares, and this is one component's words. Two sentences
   is the whole of the bar: what would load, and that nothing has. A cookie
   notice that needs a third sentence is usually describing something it
   should not be doing. */

export const consentEn = {
  /** The region's accessible name. Screen readers announce this, not "banner". */
  regionLabel: 'Analytics consent',
  body: 'We use Google Analytics to count visits. Nothing loads until you choose.',
  policy: 'Privacy policy',
  accept: 'Accept',
  reject: 'Reject',

  /* The privacy page's control. Clearing the stored answer is what brings the
     question back, so the button says what it does rather than opening a
     preferences dialogue that would be a second copy of the bar. */
  settingsAction: 'Change my choice',
  statusGranted: 'Analytics is on in this browser.',
  statusDenied: 'Analytics is off in this browser.',
  statusNone: 'No choice stored — the bar will ask again.',
};

export type ConsentCopy = typeof consentEn;
