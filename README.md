# Lynera

Lynera is a privacy-first, installable web app that predicts possible recurring PMS-like symptom windows from the timing of the user's own daily entries.

It does **not** track periods, bleeding, ovulation, fertility, menstrual phases, contraceptive schedules, or hormones. It is not a medical device and does not diagnose PMS.

## Features

- Empty calendar on first launch—no personal data is embedded in the source.
- One-tap daily logging: PMS-like symptoms or no symptoms.
- Retroactive logging by individual date or historical date range.
- Every entry remains editable or removable.
- Transparent cluster-and-interval prediction with numeric reliability.
- Monthly calendar with working previous/next controls.
- Local IndexedDB storage, JSON/CSV export, and delete-all controls.
- Installable iPhone PWA with offline support.
- No accounts, analytics, ads, trackers, third-party cookies, or health-data uploads.

## Development

```bash
npm install
npm run dev
npm test
npm run build
```

## Prediction methodology

For prediction, each explicit `pms` day becomes 1. Explicit `no_pms` and missing days become 0, while storage and the calendar still distinguish an explicit No from no entry.

Adjacent PMS days are grouped into clusters. Clusters separated by fewer than two complete non-PMS days are merged. Lynera requires at least 90 calendar days and three separate clusters. It then uses a recency-weighted average of cluster-start intervals, median cluster duration, interval variability, duration variability, and recent logging recency. Inconsistent patterns receive a wider window or no prediction.

## Privacy limitations

Data remains in the browser profile for the deployed website's exact URL. Clearing Safari website data, changing the URL, replacing the phone, or browser storage pressure can remove it. Export private backups periodically. Anyone who can unlock the phone may be able to open the app.

See `IPHONE_INSTALL.md` for exact GitHub Pages deployment and installation steps.
