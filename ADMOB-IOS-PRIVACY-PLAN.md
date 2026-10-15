# La Ficha iOS AdMob Privacy Implementation Plan

**Status:** Planning document only — **not a verified iOS implementation** (October 15, 2026)
**Publisher:** SELL PRIX LLC
**Product decision:** Launch the first iOS release with **live Google AdMob banner ads**.
**Privacy-policy draft:** `la-ficha-privacy.html` on this unpublished GitHub branch.

## 1. Recommended launch configuration

- Ads: Google AdMob banner units. Use the native Google Mobile Ads SDK, not only a placeholder ad region in the HTML/PWA.
- Privacy approach: use non-personalized/contextual ads where legally appropriate and technically available as a simple starting strategy. This does **not** mean no data is collected.
- Integrate Google User Messaging Platform (UMP) in the native iOS shell. It is a consent tool, **not** a substitute for Apple's App Tracking Transparency (ATT) permission or App Store privacy declarations.
- Start with Google-only ads if practical; if mediation networks are added later, update privacy disclosures and check every network's SDK behavior and manifests.
- Do not knowingly send domino tile images or game scores to advertising networks. Review SDK behavior for actual data transfer.

## 2. Before Xcode/App Store release

1. Create/confirm the iOS app in AdMob and obtain its **AdMob App ID** and banner **Ad Unit ID** from the account. These are different IDs.
2. Add the Google Mobile Ads SDK and Google User Messaging Platform SDK to the iOS Xcode project. Use supported versions and audit included privacy manifests.
3. Set `GADApplicationIdentifier` in Info.plist to the real AdMob App ID.
4. Add the required `SKAdNetworkItems` identifiers based on Google's current guidance, including mediation partners when applicable.
5. Add camera/photo-library permission strings where the actual app uses the corresponding iOS permissions. Avoid requesting access the app does not need.
6. Decide whether the app **actually engages in tracking** under Apple's rules. If yes, implement App Tracking Transparency and an accurate `NSUserTrackingUsageDescription`; do not access IDFA or conduct tracking without permission.
7. Check whether Google's publisher first-party ID and any optional advanced reporting/measurement features should be disabled for the selected privacy approach; confirm and document actual SDK behavior rather than assuming defaults.
8. Create the appropriate consent/privacy messages in AdMob > Privacy & messaging. Make sure regional disclosures and choices are configured as required.

## 3. Consent and ad-request sequence

- At **every app launch**, call UMP's `requestConsentInfoUpdate`.
- After updating status, load/present the required consent form through UMP's `loadAndPresentIfRequired`.
- Check `canRequestAds` before requesting banner ads. If false, **do not request ads**.
- Implement a single-request guard so checking `canRequestAds` in multiple callbacks cannot load the same banner twice.
- If `privacyOptionsRequirementStatus` is required, show an accessible **Privacy options** item in La Ficha's existing Settings menu and connect it to UMP's privacy options form.
- If tracking is implemented, handle ATT separately and according to Apple's tracking rules; declining tracking must not prevent basic scorekeeping.
- Avoid treating UMP permission as a blanket green light for personalized ad tracking; other applicable permissions/rules still apply.
- Test with AdMob test IDs or test-device registration during development to avoid invalid ad traffic. Do not repeatedly click your own live ads.

Official UMP guide: https://developers.google.com/admob/ios/privacy

## 4. Draft Apple App Privacy data-type mapping (NOT YET VERIFIED)

The following types require review in the **actual release build**, and may apply to Google Mobile Ads SDK:

| Apple group | Potential type | Why investigate |
|---|---|---|
| Location | Coarse Location | Approximate location estimated from IP address, if applicable |
| Identifiers | Device ID | Advertising ID or other app-/developer-bounded identifiers |
| Diagnostics | Crash Data | SDK's non-user crash logs |
| Diagnostics | Performance Data | App launch times, hang rate, other SDK performance information |
| Diagnostics | Other Diagnostic Data | Other applicable SDK diagnostics |
| Usage Data | Advertising Data | Ads displayed and advertising interactions |
| Usage Data | Product Interaction | App launch taps and other user interactions |

For **each actual collected category**, determine:
- Is it linked to the user according to Apple's definitions?
- Is it used for tracking under Apple's definition?
- Which purposes apply (third-party advertising, developer advertising, analytics, app functionality, or others)?
- Is collection optional or unavoidable in the integrated configuration?
- Is any additional data collected by analytics, crash reporting, mediation or photo-processing APIs?

**Do not auto-select this entire table.** It is an investigation checklist, not final App Store Connect answers. When using live AdMob, a blanket claim of "No Data Collected" is unlikely to be defensible without an SDK audit.

Google disclosure guide: https://developers.google.com/admob/ios/privacy/data-disclosure
Apple disclosure setup: https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy

## 5. app-ads.txt — required publisher-specific setup

After retrieving the exact personalized line from the AdMob account:

1. Create the file `app-ads.txt` in the website repository root. Use the **exact publisher identifier and relationship line that AdMob provides**, without modifying or inventing it.
2. Deploy it to `https://sellprixllc.com/app-ads.txt`.
3. In the La Ficha Apple App Store listing, add the developer/marketing website `https://sellprixllc.com/`.
4. Use AdMob's verification workflow to confirm the file is accessible and correctly discovered. Allow for crawl delays.
5. Retest whenever the domain, AdMob publisher account, or ad mediation sellers change.

Guide: https://support.google.com/admob/answer/9363762
Troubleshooting: https://support.google.com/admob/answer/9776740

## 6. Validation matrix before release

| Test | Expected result |
|---|---|
| Fresh iOS install in region requiring consent | Required Google privacy message appears before applicable ad requests |
| Decline/limit consent | App still scores dominoes; SDK respects choices; no unpermitted ad requests |
| Reopen after consent | UMP updates consent status and ads only load when allowed |
| Privacy options required by UMP | Settings exposes a working option to reopen the choices form |
| ATT denied (if ATT is implemented) | No IDFA tracking; app features still work |
| Camera permission denied | Manual scoring still works; permissions are explained appropriately |
| Offline launch | Core scoring works if designed for offline use; no assumption ads load |
| Test ad integration | Test ads render in reserved banner area without blocking scoreboard controls |
| SDK release archive | Confirm all privacy manifests, Info.plist keys, SDK versions and observed network/data flows |
| App Store Connect preview | Every answer matches the audited build and published privacy policy |

## 7. Photo and scoreboard audit update

A preliminary code review of an earlier La Ficha iPhone HTML build (v8.18.5) supports the owner's understanding of **on-device pip recognition**:

- Selected photos are processed using browser `createImageBitmap`, canvas pixel extraction (`getImageData`), and local `analyzeCanvas` functions.
- The browser's `getUserMedia` API captures live camera input; the camera capture workflow makes a local canvas/JPEG blob.
- Scores, round history, team names, and language preference are persisted in browser `localStorage` with key `la-ficha-state-v1851`.
- The indexed reviewed HTML showed no `fetch`, `XMLHttpRequest`, `WebSocket`, or `sendBeacon` references, but the final signed iOS version **has not been audited**.

Under Apple's App Privacy instructions, data processed entirely on device without off-device transmission is not collected for the label. Only actual off-device data collection must be disclosed; AdMob collection remains independent. Re-audit the final Xcode app including any native networking/plugins/SDKS.

**Do not declare domino photos as collected merely because a user takes a photo**, provided the final code genuinely keeps them on device. Also do not promise images are deleted immediately: inspect temporary files, caches and backups.

## 8. Still need confirmation

- Domino photos: on-device only vs uploaded to an API/cloud service?
- Scores/history/preferences: local device only vs remote backup, analytics, or accounts?
- Other SDKs in first release: Firebase, crash analytics, attribution, mediation?
- Intended audience: general/teen/adult; is any child-directed advertising configuration required?
- Obtain real AdMob publisher line for app-ads.txt (not the full account password/secret).
- Verify final iOS/Xcode build; the GitHub repository currently contains a single oversized HTML source and no native Xcode source to audit.

## Official references

- https://developers.google.com/admob/ios/privacy
- https://developers.google.com/admob/ios/privacy/data-disclosure
- https://developers.google.com/admob/ios/quick-start
- https://developers.google.com/admob/ios/privacy/strategies
- https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy
- https://developer.apple.com/app-store/user-privacy-and-data-use/
- https://support.google.com/admob/answer/9363762
