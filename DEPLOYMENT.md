# Portfolio Deployment Guide

This portfolio is a Next.js 14 application designed to deploy to Vercel. The website can run without optional integrations, but Spotify, contact delivery, and remote desktop presence each require additional environment variables.

## 1. Prerequisites

- Node.js 20 or newer
- npm
- A GitHub repository containing this project
- A Vercel account
- A production domain, optional but recommended

Before deploying locally, install dependencies and verify the production build:

```powershell
npm install
npm run build
```

Do not commit `.env.local`. It is already ignored by `.gitignore`.

## 2. Deploy to Vercel

### Dashboard method

1. Open [Vercel](https://vercel.com/new).
2. Import the GitHub repository.
3. Keep the detected framework as **Next.js**.
4. Keep the default build command: `npm run build`.
5. Add the environment variables from the next section.
6. Click **Deploy**.

### CLI method

Authenticate with Vercel, link the project, add the production variables, and deploy:

```powershell
npx vercel login
npx vercel link
npx vercel --prod
```

Use the Vercel dashboard for secret values whenever possible. Never place production secrets in committed files.

## 3. Production environment variables

Add these in **Vercel → Project → Settings → Environment Variables**. Apply secret values to **Production**; use Preview/Development values when needed.

| Variable                 | Required                          | Purpose                                                      |
| ------------------------ | --------------------------------- | ------------------------------------------------------------ |
| `SPOTIFY_CLIENT_ID`      | Only for Spotify                  | Spotify application client ID                                |
| `SPOTIFY_CLIENT_SECRET`  | Only for Spotify                  | Spotify application secret                                   |
| `SPOTIFY_REFRESH_TOKEN`  | Only for Spotify                  | Server-side token used to read playback                      |
| `SPOTIFY_ADMIN_TOKEN`    | Only for Spotify setup            | Protects `/admin/spotify`                                    |
| `RESEND_API_KEY`         | Only for contact delivery         | Sends contact form emails                                    |
| `CONTACT_TO_EMAIL`       | Recommended                       | Destination inbox                                            |
| `CONTACT_FROM_EMAIL`     | Recommended                       | Verified sender, for example `Portfolio <hello@example.com>` |
| `PRESENCE_PUBLISH_TOKEN` | Only for desktop presence         | Authenticates the companion publisher                        |
| `KV_REST_API_URL`        | Recommended for deployed presence | Upstash Redis REST URL                                       |
| `KV_REST_API_TOKEN`      | Recommended for deployed presence | Upstash Redis REST token                                     |

Generate a strong token for `SPOTIFY_ADMIN_TOKEN` and `PRESENCE_PUBLISH_TOKEN`; do not reuse your Spotify client secret.

Example PowerShell token generation:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

After changing environment variables, redeploy. Existing deployments do not automatically receive newly added variables.

## 4. Spotify setup

1. Open the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Open your application settings.
3. Add this exact redirect URI:

```text
https://YOUR-DOMAIN.com/api/spotify/admin/callback
```

4. Set `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in Vercel.
5. Set `SPOTIFY_REFRESH_TOKEN` in Vercel.
6. Deploy again.

The private setup page is:

```text
https://YOUR-DOMAIN.com/admin/spotify
```

The Spotify callback exchanges credentials server-side and never displays the refresh token in the browser. Vercel uses a read-only filesystem, so do not rely on the callback writing `.env.local` in production. Configure `SPOTIFY_REFRESH_TOKEN` directly in Vercel instead.

If Spotify is not configured, the site continues to work and displays a fallback listening state.

## 5. Contact form setup

The contact form uses Resend through `/api/contact`.

1. Create a [Resend](https://resend.com) account.
2. Create an API key.
3. Verify the sending domain if you want to send from your own address.
4. Configure:

```text
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=your-inbox@example.com
CONTACT_FROM_EMAIL=Portfolio <hello@example.com>
```

`CONTACT_FROM_EMAIL` must use a domain verified in Resend. Do not use a visitor or personal Gmail/Yahoo/Outlook address as the sender. For this portfolio, verify `yashwadhvani.tech` in Resend and use an address such as `Portfolio <hello@yashwadhvani.tech>`. The visitor's address is used as `reply_to`.

For initial testing, Resend may restrict the recipient/sender until your domain and account are verified. If these variables are missing, the form returns a clear configuration error instead of pretending the message was delivered.

## 6. Live desktop presence

The desktop companion runs on your Windows computer, not on Vercel. It detects the foreground application and publishes a short-lived activity snapshot.

For a deployed site, configure these in the companion environment or `.env.local`:

```text
PRESENCE_URL=https://YOUR-DOMAIN.com/api/presence/publish
PRESENCE_PUBLISH_TOKEN=the-same-secret-configured-in-vercel
PRESENCE_INTERVAL_MS=15000
```

Start the website locally only when testing locally, or use the deployed URL directly. From the project directory, run:

```powershell
npm run presence:companion
```

Keep that terminal/process running. When it stops publishing for two minutes, the portfolio changes the desktop status to **Away**. Spotify continues to update independently through the server-side cached Spotify route.

Tracked and ignored applications are configured in:

```text
scripts/presence-apps.json
```

For deployed/serverless presence, create an Upstash Redis database and add its REST URL/token as `KV_REST_API_URL` and `KV_REST_API_TOKEN`. Without Upstash, presence is only reliable while requests reach the same running server instance.

### Presence companion returns 401

`401 Unauthorized` means `PRESENCE_PUBLISH_TOKEN` does not match between the companion and the deployed API, or the variable is missing from Vercel.

1. Copy the exact value of `PRESENCE_PUBLISH_TOKEN` from the machine running the companion.
2. In Vercel, open **Project → Settings → Environment Variables**.
3. Set that exact value for the **Production** environment.
4. Remove accidental quotes or trailing spaces from the value.
5. Redeploy the production project; environment changes do not affect an existing deployment.
6. Confirm `PRESENCE_URL` points to the same production domain.

The deprecation warning from `active-win` is unrelated to authentication and does not cause the 401.

## 7. Post-deployment checks

After deployment, verify:

- `/` loads on a fresh browser tab.
- `/about`, `/projects`, and `/contact` load directly.
- `/api/presence` returns JSON.
- `/api/presence/publish` rejects requests without the publish token.
- The contact form reports a real delivery result.
- `/robots.txt` contains the sitemap URL.
- `/sitemap.xml` includes project detail pages.
- Spotify artwork updates when a track is playing.
- The desktop card changes to **Away** after the companion is stopped.

Run the local checks before pushing changes:

```powershell
npm run build
npm run test:a11y
```

The Playwright browser may need to be installed once on a new machine:

```powershell
npx playwright install chromium
```

## 8. Security notes

- Never commit `.env.local`, Spotify secrets, Resend keys, or presence tokens.
- Rotate any secret that has been exposed in logs, screenshots, commits, or chat.
- Keep `PRESENCE_PUBLISH_TOKEN` private; it is the write credential for the activity endpoint.
- Do not expose `SPOTIFY_REFRESH_TOKEN` to client components or API responses.
- Use HTTPS for the deployed site and companion endpoint.
