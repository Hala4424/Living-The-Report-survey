// Paste this into Extensions > Apps Script of a new Google Sheet, then Deploy as a web app.
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName('responses') || ss.insertSheet('responses');
    if (sh.getLastRow() === 0) sh.appendRow(['pid', 'done', 'path', 'started', 'updated', 'json']);
    var n = sh.getLastRow() - 1, idx = -1;
    if (n > 0) idx = sh.getRange(2, 1, n, 1).getValues().map(function (r) { return r[0]; }).indexOf(d.pid);
    var row = [d.pid, d.done ? 1 : 0, d.path || '', new Date(d.started), new Date(d.updated), JSON.stringify({ a: d.a, t: d.t })];
    if (idx >= 0) sh.getRange(idx + 2, 1, 1, 6).setValues([row]); else sh.appendRow(row);
  } finally { lock.releaseLock(); }
  return ContentService.createTextOutput('ok');
}
function doGet() { return ContentService.createTextOutput('Survey endpoint is running.'); }

// Run this from the editor whenever you want one column per question (creates the "flat" sheet).
function buildFlatSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), src = ss.getSheetByName('responses');
  var rows = src.getDataRange().getValues().slice(1), cols = {}, recs = [];
  rows.forEach(function (r) { var j = JSON.parse(r[5]); var a = j.a || {}; Object.keys(a).forEach(function (k) { cols[k] = 1; }); recs.push({ r: r, a: a }); });
  var keys = Object.keys(cols).sort(), head = ['pid', 'done', 'path', 'started', 'updated'].concat(keys);
  var out = [head].concat(recs.map(function (x) { return x.r.slice(0, 5).concat(keys.map(function (k) { var v = x.a[k]; return Array.isArray(v) ? v.join('|') : (v === undefined ? '' : v); })); }));
  var f = ss.getSheetByName('flat') || ss.insertSheet('flat'); f.clear(); f.getRange(1, 1, out.length, head.length).setValues(out);
}
