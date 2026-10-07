# Website editor (Decap CMS) — setup

Church staff edit the site at **https://rccgrpc.ca/admin**. When they click **Publish**:

1. Decap saves the change as a commit in the GitHub repo.
2. The GitHub Action (`.github/workflows/deploy.yml`) runs `nuxi generate`.
3. The Action uploads `.output/public` to cPanel over FTP. The site updates in about 2–3 minutes.

## What editors can change

| In the editor | Where it shows |
|---|---|
| **Events** (add / edit / hide / delete, flyer, date, times, weekly repeat) | Events page, event pages |
| **Theme of the year & contact details** (theme, address, phone, email, social links) | Home banner, footer, newcomers page |
| **Home page** (“Upcoming” box, highlights strip, service times, welcome message) | Home page |
| **Pastors & leadership** (parish pastors' photo, names, roles, Message from the Pastor, leadership list with photos) | Home + About Us |
| **Church history timeline** | About Us |
| **Photo galleries** (Church Anniversary, Life at RPC, Marriage Seminar, Church Picnic) | About Us, Programs |

The content lives in `/content/*.json` and `/content/events/*.json`. Uploaded images go to `public/images/uploads`, `public/images/events` and `public/images/gallery`.

---

## One-time setup (about 20 minutes)

### 1. Put the site on GitHub
1. Create a repo on GitHub (it can be private), e.g. `rccgrpc/website`.
2. Move the workflow into place. This is needed because the file was created outside the `.github` folder:
   ```bash
   (already done)
   ```
3. In `public/admin/config.yml`, set `repo:` to your repo, e.g. `repo: rccgrpc/website`.
4. Push. You can keep the chigisoft remote as well:
   ```bash
   git remote add github https://github.com/rccgrpc/website.git
   git add -A && git commit -m "Add website editor" && git push github main
   ```
   From now on, **GitHub is the source of truth**, because editors commit there. Run `git pull github main` before you make code changes.

### 2. Create the GitHub login app
GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
- Application name: `RPC Website Editor`
- Homepage URL: `https://rccgrpc.ca`
- Authorization callback URL: `https://rccgrpc.ca/admin/auth.php`

Click **Register**, copy the **Client ID**, then click **Generate a new client secret** and copy that too.

### 3. Store the secret on cPanel (not in the code)
In cPanel **File Manager**, go to your home folder, which is the folder that *contains* `public_html` (not inside it). Create a file named `decap-oauth-config.php` there:
```php
<?php
return [
  'client_id'     => 'PASTE_CLIENT_ID',
  'client_secret' => 'PASTE_CLIENT_SECRET',
];
```

### 4. Give GitHub access to cPanel FTP
1. In cPanel, go to **FTP Accounts** and create an account (e.g. `deploy@rccgrpc.ca`) whose directory is `public_html`.
2. In GitHub, go to the repo → **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret | Value |
|---|---|
| `FTP_SERVER` | `ftp.rccgrpc.ca` (or the server name shown in cPanel) |
| `FTP_USERNAME` | `deploy@rccgrpc.ca` |
| `FTP_PASSWORD` | the FTP account password |
| `FTP_SERVER_DIR` | `./` (the FTP account already opens in public_html). Leave this out if you use the main cPanel login; it then defaults to `public_html/` |
| `FTP_PROTOCOL` | optional, leave out for `ftps`; set `ftp` only if FTPS fails |

3. Go to the repo's **Actions** tab and confirm “Build & deploy to cPanel” goes green. The first run uploads every image, so it takes a few minutes. Later runs only upload changed files.

### 5. Add the editors
1. Each editor needs a free GitHub account.
2. Add them in GitHub → repo → **Settings → Collaborators** with **Write** access.
3. They then go to **rccgrpc.ca/admin → Login with GitHub**.

---

## Tips for editors
- **Paragraphs:** leave an empty line between paragraphs in long text boxes.
- **Weekly events:** pick the *first* date and set “Repeats” to *Every week*.
- **Hiding an event:** tick **Hide from website** to take it down without deleting it.
- **Photos:** please resize phone photos before uploading (about 1600px wide, under 1 MB) so the site stays fast.
- **Progress:** each Publish shows up under the repo's **Actions** tab. A red ✗ means the upload failed, so check the FTP secrets.

## Editing locally (developers)
```bash
npx decap-server      # terminal 1, local editor backend on :8081
npm run dev           # terminal 2, then open http://localhost:3000/admin
```
Local edits write straight to the files in `/content`. Nothing is published until you commit and push.

## Not managed by the editor
- **Newcomer's form email:** the form still sends to `rccgrpc@gmail.com`. To change it, edit `public/newcomer.php`.
- **Page layouts and the Ministries page text:** these stay in the code.
