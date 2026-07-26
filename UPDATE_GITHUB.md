# Update the existing Lynera GitHub app

This package changes only the visual interface and build configuration. It does not alter or delete locally stored PMS-like symptom entries.

## Files changed

Replace these files in the existing GitHub repository:

- `src/App.tsx`
- `src/screens/Home.tsx`
- `src/styles.css`
- `src/components/Icons.tsx`
- `src/vite-env.d.ts` (new if it is not already present)
- `tsconfig.node.json`

The existing Lynera icon files stay unchanged.

## Recommended method: GitHub Desktop

1. Download and unzip the update package.
2. Open the local `lynera-app` repository folder on your computer.
3. Copy the files from the update package into the matching locations in that folder.
4. Choose **Replace** when prompted.
5. Open GitHub Desktop.
6. Confirm the changed files listed above appear under **Changes**.
7. Enter the summary: `Refresh Lynera home design`.
8. Select **Commit to main**.
9. Select **Push origin**.
10. Open the repository on GitHub and select **Actions**.
11. Wait for **Deploy Lynera to GitHub Pages** to finish with a green check mark.

## Browser-only method

For each changed file:

1. Open the file in the GitHub repository.
2. Select the pencil icon.
3. Replace its complete contents with the matching file from this package.
4. Select **Commit changes**.

For the new `src/vite-env.d.ts` file, use **Add file → Create new file** and enter:

```ts
/// <reference types="vite/client" />
```

Multiple commits will each start a deployment. It is easier to upload all changed files at once or use GitHub Desktop.

## Refresh the installed iPhone app

After the GitHub Action succeeds:

1. Open Lynera from the Home Screen while connected to the internet.
2. Leave it open for about 10 seconds.
3. Close it fully from the app switcher.
4. Open it again.

If the old design remains, open the GitHub Pages URL in Safari, refresh it once, then close and reopen the Home Screen app. Your locally stored entries should remain intact as long as the URL has not changed and Safari website data has not been cleared.
