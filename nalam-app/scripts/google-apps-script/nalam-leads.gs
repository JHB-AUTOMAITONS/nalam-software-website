/**
 * Nalam Software — lead collection Apps Script.
 * Receives POST requests from the website's /api/contact route and appends
 * one row per submission to the "Leads" sheet in this bound spreadsheet.
 *
 * Setup:
 * 1. Open (or create) the destination Google Sheet.
 * 2. Extensions -> Apps Script.
 * 3. Replace the default Code.gs contents with this file.
 * 4. Update SHEET_NAME below if you want a different tab name (a tab with
 *    this name will be created automatically if it doesn't exist).
 * 5. Deploy -> New deployment -> select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web app URL and give it to the website's GOOGLE_SHEETS_WEBHOOK_URL
 *    environment variable.
 */

const SHEET_NAME = "Leads";

const HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Organization",
  "Organization Type",
  "Interested In",
  "Requirements",
  "Source",
];

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse_({ success: false, message: "Missing request body." });
    }

    const data = JSON.parse(e.postData.contents);

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const phone = String(data.phone || "").trim();
    const organization = String(data.organization || "").trim();
    const organizationType = String(data.organizationType || "").trim();
    const interestedIn = String(data.interestedIn || "").trim();
    const requirements = String(data.requirements || "").trim();
    const source = String(data.source || "").trim();

    if (!name || !email || !phone || !organization || !organizationType || !interestedIn) {
      return jsonResponse_({
        success: false,
        message: "Missing required fields.",
      });
    }

    const sheet = getSheet_();
    const timestamp = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd HH:mm:ss"
    );

    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      organization,
      organizationType,
      interestedIn,
      requirements,
      source,
    ]);

    return jsonResponse_({ success: true });
  } catch (error) {
    return jsonResponse_({
      success: false,
      message: "Server error: " + (error && error.message ? error.message : String(error)),
    });
  }
}

function doGet() {
  return jsonResponse_({
    success: false,
    message: "This endpoint only accepts POST requests.",
  });
}
