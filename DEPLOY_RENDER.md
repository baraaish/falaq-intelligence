# Deploying Falaq Intelligence

The agent API runs as a Docker web service. The static website is hosted by GitHub Pages at `https://falaqai.com`.

## Render

1. Open `https://dashboard.render.com/blueprints` and create a Blueprint.
2. Connect the private repository `baraaish/falaq-intelligence-private`.
3. Render detects `render.yaml` and asks for two secret values:
   - `GOOGLE_SHEETS_URL`: the deployed Apps Script `/exec` URL.
   - `GITHUB_MODELS_TOKEN`: a GitHub token with access to GitHub Models.
4. Apply the Blueprint and wait for `/api/agent/status` to return HTTP 200.

The service includes Chromium and Arabic fonts for PDF generation.

## Squarespace DNS

Only change DNS after the Render service works on its `onrender.com` URL.

1. Remove the existing Squarespace A records from the root (`@`).
2. Remove the existing `www` CNAME that points to `ext-sq.squarespace.com`.
3. Add GitHub Pages A records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
4. Add `www` as a CNAME to `baraaish.github.io`.
5. Add `api` as the CNAME target shown by Render under `Settings > Custom Domains`.
6. Return to GitHub Pages and Render to verify both domains. Each service provisions HTTPS automatically.
