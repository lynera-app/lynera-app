# Lynera v4 update

This version fixes the Home-screen aurora asset and timeline markers.

## Changes
- The aurora background is imported from `src/assets/aurora-home.png`, so Vite resolves it correctly for GitHub Pages project URLs.
- The side extensions use evenly spaced SVG circles colored by the same purple-to-blue gradient as the arc.
- The Today marker is placed exactly on the midpoint of the half-circle.
- The service-worker cache is bumped to `lynera-v4`.

## Full replacement
1. In GitHub Desktop, Fetch origin and Pull origin if offered.
2. Close GitHub Desktop.
3. Back up your local project folder.
4. In the existing project folder, keep only the hidden `.git` folder and delete the other project files.
5. Copy all contents of this replacement project into the existing folder beside `.git`.
6. Reopen GitHub Desktop, commit to `main`, and push.
7. Confirm the newest GitHub Actions build and deploy jobs are green.
