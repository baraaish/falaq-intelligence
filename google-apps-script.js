// Google Apps Script Web App endpoint for Falaq Bot leads.
// 1. Create a Google Sheet.
// 2. Extensions > Apps Script.
// 3. Paste this file, set SHEET_NAME if needed, deploy as Web App.
// 4. Put the deployment URL in assets/config.js as sheetsEndpoint.

const SHEET_NAME = "Falaq Bot Leads";

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || "{}");
  const sheet = getSheet_();
  sheet.appendRow([
    new Date(),
    payload.reference || "",
    payload.name || "",
    payload.company || "",
    payload.email || "",
    payload.phone || "",
    payload.language || "",
    payload.categoryLabel || payload.category || "",
    payload.initialRequest || "",
    JSON.stringify(payload.answers || []),
    payload.proposal ? payload.proposal.title || "" : "",
    payload.proposal ? payload.proposal.solution || "" : "",
    payload.proposal ? JSON.stringify(payload.proposal.workflow || []) : "",
    payload.provider || "",
    payload.source || "",
    payload.receivedAt || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Received At", "Reference", "Name", "Company", "Email", "WhatsApp",
      "Language", "Service", "Initial Request", "Answers", "Proposal Title",
      "Proposed Solution", "Workflow", "Provider", "Source", "Created At"
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
