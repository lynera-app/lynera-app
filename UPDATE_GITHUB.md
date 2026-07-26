# Updating Lynera on GitHub

## Before copying the patch
1. Open GitHub Desktop and select the existing `lynera-app` repository.
2. Click **Fetch origin**.
3. If **Pull origin** appears, click it and wait for the local `main` branch to finish syncing.
4. Close Lynera on the iPhone while updating.

## Apply the patch
1. Download and unzip `lynera-home-update-patch.zip`.
2. Open the extracted patch folder and the existing local project folder side by side.
3. Copy everything inside the patch folder into the project root.
4. Choose **Replace files in the destination** when Windows asks.
5. Preserve the folder structure. For example, `src/screens/Home.tsx` must replace that exact file—not create a second nested project folder.

The patch changes:
- `src/App.tsx`
- `src/screens/Home.tsx`
- `src/components/Icons.tsx`
- `src/styles.css`
- `public/sw.js`
- `UPDATE_GITHUB.md`

## Commit and push
1. Return to GitHub Desktop.
2. Review the changed files.
3. Use the summary: `Polish Lynera home screen`.
4. Click **Commit to main**.
5. Click **Push origin**.

## Verify GitHub Actions
1. Open the repository on GitHub.
2. Open **Actions**.
3. Select the newest **Deploy Lynera to GitHub Pages** run.
4. Confirm the `build` job passes `npm test` and `npm run build`.
5. Confirm the `deploy` job also finishes with a green check.
6. If a step fails, open that step and copy its final error lines before changing files again.

## Refresh the installed iPhone web app
The service-worker cache was changed to `lynera-v2` so the new version can replace the old one.

1. Keep the iPhone online.
2. Open the GitHub Pages URL in Safari and refresh once.
3. Leave it open for about 10 seconds.
4. Close Safari.
5. Fully close Lynera from the iPhone app switcher.
6. Reopen Lynera from the Home Screen.
7. If the previous design remains, repeat the Safari refresh and reopen Lynera once more.

Do not change the GitHub Pages URL. Keeping the same URL preserves the IndexedDB storage location used by existing logs.
