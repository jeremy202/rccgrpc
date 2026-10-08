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

## How it's set up (done)

| Piece | Where |
|---|---|
| Code + content | GitHub: `jeremy202/rccgrpc` (branch `main`). This is now the source of truth. Run `git pull` before making code changes, because editors commit here too. |
| Auto-deploy | `.github/workflows/deploy.yml`, which uploads to cPanel over FTPS as `deploy@rccgrpc.ca` into `/home/rccgrpcc/public_html` |
| Deploy secrets | GitHub → repo → Settings → Secrets → Actions: `FTP_SERVER`, `FTP_SERVER_DIR`, `FTP_USERNAME`, `FTP_PASSWORD` |
| Editor login app | GitHub OAuth App “RPC Website Editor”: https://github.com/settings/applications/3912919 (callback `https://rccgrpc.ca/admin/auth.php`) |
| Login keys | cPanel: `/home/rccgrpcc/decap-oauth-config.php` (outside public_html; open via File Manager → Home) |

### Adding an editor
1. Each editor needs a free GitHub account.
2. Add them in GitHub → `jeremy202/rccgrpc` → **Settings → Collaborators** with **Write** access.
3. They then go to **rccgrpc.ca/admin → Login with GitHub**.

### If a deploy fails
Open the repo's **Actions** tab. A red ✗ is usually a wrong FTP secret. Fix it, then click **Re-run jobs**.

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
