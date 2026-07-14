# Falaq Bot Google Sheet setup

1. Create a new Google Sheet in the Google account that should own the leads.
2. Open `Extensions > Apps Script`.
3. Replace the editor content with `google-apps-script.js` from this repository.
4. Select `Deploy > New deployment > Web app`.
5. Set `Execute as` to `Me` and access to `Anyone`.
6. Authorize the script and copy the Web App URL.
7. Put that URL in `.env` as `GOOGLE_SHEETS_URL` and restart the backend.

The backend always keeps a local development copy in `backend/data/leads.jsonl`. Once the URL is configured, each completed proposal is also appended to the `Falaq Bot Leads` sheet.
