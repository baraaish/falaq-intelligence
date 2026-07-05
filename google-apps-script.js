// Google Apps Script Web App endpoint for the website form.
// 1. Create a Google Sheet.
// 2. Extensions > Apps Script.
// 3. Paste this file, set SHEET_NAME if needed, deploy as Web App.
// 4. Put the deployment URL in assets/config.js as sheetsEndpoint.

const SHEET_NAME = "Website Leads";

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || "{}");
  const sheet = getSheet_();
  sheet.appendRow([
    new Date(),
    payload.name || "",
    payload.company || "",
    payload.email || "",
    payload.phone || "",
    payload.country || "",
    payload.interest || "",
    payload.method || "",
    payload.message || "",
    payload.source || "",
    payload.createdAt || ""
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
      "Received At", "Name", "Company", "Email", "Phone", "Country",
      "Interest", "Preferred Method", "Message", "Source", "Created At"
    ]);
  }
  return sheet;
}
