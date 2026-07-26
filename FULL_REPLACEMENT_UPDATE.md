# Replace the current Lynera project with this version

This package is designed for the full-project replacement method. It contains no `.git` folder and does not contain personal symptom data.

## Before replacing files

1. Open GitHub Desktop and select the Lynera repository.
2. Click **Fetch origin**.
3. If **Pull origin** appears, click it and wait for the pull to finish.
4. Close GitHub Desktop.
5. Make a backup copy of your existing local `lynera-app` folder.

## Replace the project contents on Windows

1. In File Explorer, open your existing local `lynera-app` folder.
2. Turn on **View > Show > Hidden items**.
3. Confirm that the hidden `.git` folder is visible.
4. Keep `.git`. Delete every other file and folder inside `lynera-app`.
5. Extract `lynera-app-v3-full.zip`.
6. Open the extracted `lynera-app` folder.
7. Copy everything inside it into your existing local `lynera-app` folder beside `.git`.
8. Do not copy the extracted outer folder itself. The result must be `lynera-app/src`, not `lynera-app/lynera-app/src`.

## Commit and deploy

1. Reopen GitHub Desktop.
2. Confirm that the current branch is `main`.
3. Review the changed files.
4. Use the commit message: `Refine Lynera home screen and aurora timeline`.
5. Click **Commit to main**.
6. Click **Push origin**.
7. Open the repository on GitHub and select **Actions**.
8. Open the latest **Deploy Lynera to GitHub Pages** run.
9. Confirm that both `build` and `deploy` show green check marks.

## Refresh the installed iPhone app

1. Wait for the GitHub deployment to finish.
2. Open the GitHub Pages URL directly in Safari while online.
3. Refresh it once and leave it open for ten seconds.
4. Close Safari.
5. Fully close Lynera from the iPhone app switcher.
6. Reopen Lynera from its Home Screen icon.

The service-worker cache is now `lynera-v3`, which helps iOS replace the previous cached interface. Existing IndexedDB entries remain associated with the same GitHub Pages URL and are not included in the repository.
