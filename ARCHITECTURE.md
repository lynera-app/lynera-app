# Lynera architecture

- **React + TypeScript + Vite**: responsive application shell and screens.
- **IndexedDB (`idb`)**: local daily logs and onboarding setting.
- **Pure prediction engine**: no network or browser dependencies, fully unit-testable.
- **Local date utilities**: local-noon construction prevents UTC off-by-one errors.
- **PWA assets**: manifest, approved Lynera icon set, service worker, iPhone metadata.
- **GitHub Actions**: tests and production build before GitHub Pages deployment.
- **Privacy boundary**: restrictive CSP, same-origin assets only, no analytics or external health-data requests.
