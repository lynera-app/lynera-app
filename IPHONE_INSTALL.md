# Deploy Lynera to GitHub Pages and install it on iPhone

This project includes a GitHub Actions workflow that tests, builds, and publishes Lynera automatically.

## Before you start

You need:

- a free GitHub account;
- the unzipped `lynera-app` project folder;
- a computer for uploading the project;
- Safari on the iPhone where you want to install Lynera.

GitHub Pages is available with GitHub Free for public repositories. The repository and app source will be public, but this project contains no personal symptom entries. Entries created in Lynera stay in the browser database on your device.

## Option A — GitHub Desktop (recommended)

### 1. Create an empty repository on GitHub

1. Sign in to GitHub.
2. Select the **+** menu in the upper-right corner.
3. Select **New repository**.
4. Enter the repository name `lynera-app`.
5. Select **Public**.
6. Do not initialize it with a README, `.gitignore`, or licence.
7. Select **Create repository**.

### 2. Upload the project with GitHub Desktop

1. Install and open GitHub Desktop.
2. Sign in with the same GitHub account.
3. Choose **File → Add local repository**.
4. Select the extracted `lynera-app` folder.
5. If GitHub Desktop says it is not yet a repository, choose **Create a repository** for that folder.
6. Use `main` as the default branch.
7. Enter the commit message `Initial Lynera app`.
8. Select **Commit to main**.
9. Select **Publish repository**.
10. Choose the existing `lynera-app` repository if prompted and ensure **Keep this code private** is not enabled.

### 3. Enable GitHub Pages

1. Open the `lynera-app` repository on github.com.
2. Select **Settings**.
3. Select **Pages** in the left sidebar.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.

### 4. Run the deployment

The included workflow runs automatically after the project is pushed to `main`.

1. Open the repository's **Actions** tab.
2. Select **Deploy Lynera to GitHub Pages**.
3. Wait until both the `build` and `deploy` jobs show green check marks.
4. If the workflow did not start, open it and select **Run workflow → Run workflow**.

### 5. Find the live HTTPS address

1. Return to **Settings → Pages**.
2. GitHub will show a URL similar to:

   `https://YOUR-USERNAME.github.io/lynera-app/`

3. Open that address on your computer and test the calendar, retroactive range entry, editing, export, and navigation.
4. Under Pages settings, keep **Enforce HTTPS** enabled if that option is shown.

## Option B — Upload using Git commands

Run these commands from inside the extracted `lynera-app` folder. Replace `YOUR-USERNAME` with your GitHub username.

```bash
git init
git branch -M main
git add .
git commit -m "Initial Lynera app"
git remote add origin https://github.com/YOUR-USERNAME/lynera-app.git
git push -u origin main
```

Then complete **Enable GitHub Pages** above.

## Option C — Upload through the GitHub website

This can work, but uploading nested and hidden folders is less reliable than GitHub Desktop.

1. Open the empty repository.
2. Choose **Add file → Upload files**.
3. Drag every item inside the extracted project folder into the upload area, including `.github`, `public`, and `src`.
4. On macOS, press **Command + Shift + .** to show `.github` if it is hidden.
5. On Windows, enable **View → Show → Hidden items**.
6. Commit the upload to `main`.
7. Confirm that `.github/workflows/deploy-pages.yml` appears in the repository.
8. Enable Pages using **GitHub Actions**.

## Install Lynera on iPhone

1. On the iPhone, open **Safari**—not an in-app browser.
2. Visit the GitHub Pages HTTPS URL.
3. Wait for Lynera to load completely.
4. Tap Safari's **Share** button (square with an upward arrow).
5. Scroll down and select **Add to Home Screen**.
6. Turn on **Open as Web App** if shown.
7. Confirm the name `Lynera`.
8. Tap **Add**.
9. Launch Lynera from its new Home Screen icon.

## Check offline support

1. Open the installed app once while online.
2. Close it completely.
3. Turn on Airplane Mode.
4. Open Lynera from the Home Screen.
5. Confirm that the interface loads and a test entry remains after closing and reopening it.

## Updating the app later

1. Replace or edit files in the same repository.
2. Commit and push the changes to `main`.
3. The GitHub Actions workflow redeploys automatically.
4. Open Lynera once while online, close it, and open it again to allow the service worker to activate the update.
5. For major cached-asset changes, increment `const CACHE = 'lynera-v1'` in `public/sw.js` to `lynera-v2`, `lynera-v3`, and so on.

## Protecting your data

- Keep the GitHub Pages URL unchanged; browser data is associated with the exact website address.
- Use an iPhone passcode and Face ID.
- Export a JSON backup periodically and store it somewhere private.
- Clearing Safari website data, changing the deployment URL, replacing the phone, or browser storage pressure can remove local entries.
- Publishing the source does not publish entries recorded in the app. Those entries are not committed to GitHub or sent to the deployment workflow.
