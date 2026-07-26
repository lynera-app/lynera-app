# Lynera v7 update

## Changes
- Softened and raised the iPhone safe-area blur so it fades into the page and remains subtly visible behind the status information.
- Reduced the header's reserved vertical space.
- Removed the duplicate `Today` label above the large date.
- Tightened spacing between the pattern heading, date labels, timeline and arc.
- Moved the daily check-in section upward by removing the hero's forced minimum height.
- Reduced the prediction-confidence percentage weight and matched its font size to the pill label.
- Repositioned and evenly spaced the endpoint dots, with clear gaps from the arc and endpoint markers.
- Aligned the Today marker mathematically to the midpoint of the quadratic arc.
- Matched the large date, daily check-in heading and prediction date-range heading sizes.
- Updated the offline cache to `lynera-v7`.

## Full replacement on Windows
1. Open GitHub Desktop and select Lynera.
2. Click **Fetch origin**, then **Pull origin** if offered.
3. Close GitHub Desktop.
4. Make a backup of your existing local `lynera-app` folder.
5. Open the original folder in File Explorer and enable **View > Show > Hidden items**.
6. Keep the hidden `.git` folder and delete everything else inside the project folder.
7. Extract the full Lynera v7 ZIP.
8. Copy everything from inside the extracted `lynera-app-v7` folder into the original folder beside `.git`.
9. Reopen GitHub Desktop.
10. Commit with `Finalize Lynera home spacing and safe area`.
11. Click **Push origin**.

## Verify deployment
1. Open the repository on GitHub.
2. Open **Actions**.
3. Open the newest **Deploy Lynera to GitHub Pages** run.
4. Confirm both `build` and `deploy` have green checks.

## Refresh the installed iPhone app
1. Open the GitHub Pages URL directly in Safari while online.
2. Refresh once and leave it open for about ten seconds.
3. Close Safari and fully close Lynera from the app switcher.
4. Reopen Lynera from the Home Screen.
5. If the old version remains, repeat once; the cache version is now `lynera-v7`.
