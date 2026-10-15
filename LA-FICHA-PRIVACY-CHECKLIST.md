# La Ficha — App Privacy Release Checklist

Status: **NOT READY TO PUBLISH** — October 15, 2026
Owner: SELL PRIX LLC
Draft policy page: `la-ficha-privacy.html` (in this GitHub draft branch only)
Target published URL after approval: https://sellprixllc.com/la-ficha-privacy.html

## A. Verify the actual iOS build (not only the current web/PWA prototype)

- [ ] Identify the final iOS bundle, version, Xcode project, and any WebView/network integrations.
- [ ] Inspect image processing: on-device vs remote API, whether images are uploaded, cached, retained, or sent to third-party providers.
- [ ] Inspect game data and settings: memory, localStorage, IndexedDB, device storage, backups, external servers, or remote sync.
- [ ] Verify if any user account, login, email, analytics, crash reporting, or other third-party SDKs exist.
- [ ] Verify whether native camera/photo-library permission is needed, when requested, and the explanation shown to users.
- [ ] Identify how users erase scores, history and cached photos.
- [ ] Confirm the app's age rating, intended audience and child-directed status.

Note: The La Ficha repository currently exposes an approximately 14 MB `index.html` file and no native iOS/Xcode project. The available GitHub connector could not return this file's content for a full data-flow audit. This checklist deliberately does not certify app behavior.

## B. AdMob decisions — complete before answering Apple's questions

- [ ] Confirm whether the first submitted iOS build includes **live Google AdMob SDK**, test ads only, or no advertising code.
- [ ] Record the exact Google Mobile Ads SDK version, mediation adapters, analytics tools and privacy manifests included in the actual binary.
- [ ] Use Google's iOS data-disclosure documentation to identify applicable data (potentially IP-derived location, identifiers, diagnostics, ad data, usage interactions).
- [ ] Determine whether any data is linked to a user and whether any activity qualifies as tracking under Apple's definition; do not assume "non-personalized" means "no data collected".
- [ ] Determine if App Tracking Transparency (ATT) is required by the app's actual tracking behavior. Include a usage description if requesting tracking authorization.
- [ ] Configure consent messaging through Google UMP / an applicable certified CMP where required. Provide an in-app privacy-options entry point when required.
- [ ] Review geographic requirements (for example EEA/UK and applicable US state privacy controls).
- [ ] Decide whether a user privacy-choices web page is helpful; Apple's Privacy Choices URL is optional, distinct from in-app consent mechanisms.

Resources:
- Apple app privacy: https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Google Mobile Ads SDK disclosures: https://developers.google.com/admob/ios/privacy/data-disclosure
- Google UMP: https://developers.google.com/admob/ios/privacy

## C. Finalize the public text

- [ ] Replace every bracketed [VERIFY ...] item in `la-ficha-privacy.html` with a precise, verified statement.
- [ ] Set actual effective date and remove internal draft / noindex labels.
- [ ] Describe collection, purposes, sharing, permissions, retention, deletion, consent choices, and contact information accurately.
- [ ] Verify links, accessible mobile presentation, and any Spanish localization desired.
- [ ] Link the final page from La Ficha's app menu/settings AND product/support pages.
- [ ] Merge the approved page to `main` and confirm the public URL loads without authentication.

## D. App Store Connect

- [ ] Open App Store Connect > My Apps > La Ficha > App Privacy.
- [ ] Set Privacy Policy URL to https://sellprixllc.com/la-ficha-privacy.html after public deployment.
- [ ] Choose Yes or No to data collection based on the **final submitted app AND all integrated third-party SDKs**, not just the webpage.
- [ ] If Yes, select each applicable data category and answer purposes, linked-to-user and tracking prompts.
- [ ] Check the preview for accuracy and Publish the disclosure.
- [ ] Recheck after SDK upgrades, feature additions or changes in processing.

## E. Unresolved questions for app developer

1. Will live AdMob banners be included in the **first iOS App Store build**?
2. Are domino photos processed completely on-device or passed to any remote API?
3. Are team scores and history stored only on the device, and does the app have any logins/remote sync?
4. Will other SDKs (Firebase, analytics, crash reports) be integrated?
5. What is the app's intended age group / proposed App Store age rating?

Do not represent these five open items as facts or choose "No data collected" until the first-release code is audited.
