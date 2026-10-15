# La Ficha — Draft Apple App Privacy Questionnaire

**STATUS: INTERNAL WORKSHEET / NOT FINALIZED**
Prepared October 15, 2026 for SELL PRIX LLC. Use with App Store Connect only after reviewing the **actual final iOS binary** and Google's disclosures for its installed SDK version.

## Confirmed product scope

- Publisher: SELL PRIX LLC.
- First iOS version is planned to include **live Google AdMob banner advertising**.
- **Google UMP** is planned to manage advertising privacy messages.
- **No separate Firebase Analytics, crash-reporting, ad-network mediation, or other third-party analytics SDKs are planned**. Google Mobile Ads itself may still collect diagnostic and interaction data.
- The examined earlier La Ficha iPhone HTML processes domino photos through on-device canvas-based recognition, with game scores / history / names / language saved to `localStorage`. This has **not** been confirmed in the signed native iOS app.

## Apple App Privacy: tentative answers

**Q: Do you or your third-party partners collect data from this app?**
- **Working answer: YES**, assuming the live Google Mobile Ads SDK collects the data listed in Google's iOS SDK data disclosure guide. Confirm exact collection in the signed iOS archive and current Google documentation.
- Do **not** select `No, we do not collect data` merely because photos and scores stay on the phone.

**Q: Which types of data?**

| Apple data type | Review for inclusion | Source / caveat |
|---|---|---|
| **Location → Coarse Location** | POSSIBLE | SDK receives IP address which may be used to infer general location. Check applicable label rules and actual use. |
| **Identifiers → Device ID** | POSSIBLE | Device advertising identifier or app-/developer-bounded identifiers. ATT denial does not prove all identifiers absent. |
| **Usage Data → Advertising Data** | POSSIBLE | Ads shown, clicks and interactions sent to Google. |
| **Usage Data → Product Interaction** | POSSIBLE | App launches / user interactions collected by SDK. |
| **Diagnostics → Crash Data** | POSSIBLE | SDK's own non-user crash logs. Not installing a separate crash service does not eliminate this. |
| **Diagnostics → Performance Data** | POSSIBLE | SDK startup/hang/energy and related performance signals. |
| **Diagnostics → Other Diagnostic Data** | POSSIBLE | Additional SDK diagnostics as applicable. |
| **User Content → Photos or Videos** | NOT INDICATED by reviewed web code | Only mark as collected if final app or an embedded SDK transmits/stores photos off-device in Apple's definition. Taking a photo is not itself collection. |
| **User Content → Gameplay Content** | NOT INDICATED by reviewed web code | Score/state retained locally; reassess any off-device sync, backup or reporting. |

**For each confirmed data type** answer (i) use purpose, (ii) linked to user/identity, (iii) tracking, and (iv) any applicable optionality questions. These are **not automatically the same answers** for every data type. Do not select all types speculatively.

## Distinguish collection, linking, and tracking

- **Collection:** data transmitted off the device and retained in a readable form beyond servicing a request, per Apple's detailed definitions. Pure local photo and score processing generally does not qualify.
- **Linked to User:** determine according to Apple whether collected information is linked to identity or a device identifier. Do not assume anonymous.
- **Tracking:** linking app user/device data with other companies' app/site data for targeted advertising/measurement, or sharing with data brokers, per Apple. If applicable, ATT authorization is required prior to tracking or accessing the advertising identifier (IDFA).
- Personalized vs non-personalized advertising does **not** by itself settle the collection, linking, or tracking classification.

## Expected purposes to evaluate

- **Third-Party Advertising** for data used by Google AdMob to show and measure ads.
- **Analytics** for SDK advertising-performance or product-interaction analytics, even if there is **no separate Firebase Analytics SDK**.
- **App Functionality** for technical/fraud prevention or diagnostics when documented.
- Other purposes only if present in SDK privacy report or actual flows.

## Questions requiring signed iOS build evidence

- [ ] Confirm final bundle identifier, Google Mobile Ads and UMP SDK versions, and bundled privacy manifests.
- [ ] Verify the production configuration and what data Google's SDK collects in that configuration.
- [ ] Verify no extra analytics, crash-reporting, attribution, mediation SDKs or remote endpoints.
- [ ] Verify no domino photos, scores, team names or histories are uploaded.
- [ ] Verify ATT decision and any IDFA processing, with an appropriate prompt only when necessary.
- [ ] Inspect Xcode Privacy Report and debug/production network requests.
- [ ] Test UMP with EEA and applicable US-regulation messages, decline/revisit-consent cases and the Settings privacy-options entry point.
- [ ] Reconcile published privacy policy sections 2–8 to observed code and data flows.
- [ ] After publishing privacy policy on the public site, supply its exact URL in App Store Connect and complete the answer-by-answer form.
- [ ] Save, review the product-page preview and **Publish** only when all responses are verified.

## App Store Connect navigation

1. Go to https://appstoreconnect.apple.com/ > Apps > La Ficha > **App Privacy**.
2. Set **Privacy Policy URL** to `https://sellprixllc.com/la-ficha-privacy.html` **only after it has been publicly deployed** (current policy is an unpublished draft).
3. Choose **Get Started** and answer the top-level data collection question.
4. For each applicable category, select purpose(s), linked-to-user status and tracking status using final build and SDK evidence.
5. Review **Product Page Preview** and publish the disclosure when accurate.

The **User Privacy Choices URL** is optional in App Store Connect. If AdMob/UMP requires an in-app privacy options entry point, the optional website URL does not replace that in-app mechanism.

## Official references

- Apple: https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy
- Apple data categories and definitions: https://developer.apple.com/app-store/app-privacy-details/
- Apple ATT: https://developer.apple.com/app-store/user-privacy-and-data-use/
- Google Mobile Ads iOS disclosures: https://developers.google.com/admob/ios/privacy/data-disclosure
- Google UMP: https://developers.google.com/admob/ios/privacy

**Do not merge the privacy policy or use this worksheet as finalized App Store Connect answers without confirming the final iOS release configuration.**
