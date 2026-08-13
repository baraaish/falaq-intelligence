# Falaq cPanel deployment

The production site does not depend on GitHub, GitHub Pages, Render, or Docker.
Deployment uses two upload bundles built locally with:

```text
npm run build:cpanel
```

## Server layout

- Frontend ZIP: extract directly into `/home/falaqai/public_html`.
- API ZIP: extract into `/home/falaqai/falaq-api`, outside `public_html`.
- Create the `api.falaqai.com` subdomain, then register a Production Node.js
  app with application root `falaq-api`, application URL
  `https://api.falaqai.com/`, and startup file `app.js`.
- Use Node.js 20 or 22 when available. Node.js 18 is the minimum.
- Run the cPanel dependency action (or `npm ci --omit=dev`) inside the API app.

## Environment variables

Add secrets in **cPanel -> Setup Node.js App -> falaq-api -> Environment
Variables**. Do not upload a real `.env`, do not put keys in `public_html`, and
do not paste keys into HTML or JavaScript.

Required for AI mode (at least one provider key):

```text
CEREBRAS_API_KEY=
GROQ_API_KEY=
GEMINI_API_KEY=
OPENROUTER_API_KEY=
```

Recommended production settings:

```text
NODE_ENV=production
PUBLIC_SITE_URL=https://falaqai.com
PDF_RENDERER=lite
CEREBRAS_MODEL=gpt-oss-120b
GROQ_MODEL=llama-3.3-70b-versatile
GEMINI_MODEL=gemini-3.6-flash
OPENROUTER_MODEL=openai/gpt-oss-20b:free
```

Optional integrations:

```text
GOOGLE_SHEETS_URL=
RESEND_API_KEY=
EMAIL_FROM=Falaq Bot <bot@mail.falaqai.com>
EMAIL_REPLY_TO=hello@falaqai.com
LEAD_NOTIFICATION_EMAIL=hello@falaqai.com
```

Do not add `PORT`; Passenger provides it. `CORS_ORIGINS` should stay empty in
production unless a separate trusted frontend is deliberately added.

## Safe cutover order

1. Upload both ZIPs and register the Node.js app.
2. Test `GET /api/agent/status` on the new host before DNS cutover.
3. In DNS, change the apex A record and the `api` record to the cPanel server;
   point `www` to the apex. Remove the GitHub Pages records only after the new
   frontend works, and remove the Render CNAME only after the API works.
4. Run AutoSSL after the records resolve to cPanel, then verify HTTPS for the
   apex, `www`, and `api`.
5. Test an Arabic and English conversation, provider probe, proposal PDF,
   email, and Google Sheets sync.
6. Only after all acceptance checks pass, delete the Render service and archive
   or delete the GitHub repository if desired.
