LIVING THE REPORT - self-hosted survey (3 steps)

1. SAVE RESPONSES TO A GOOGLE SHEET
   a. Create a new Google Sheet. Open Extensions > Apps Script.
   b. Delete the sample code, paste in google_apps_script.gs, click Save.
   c. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone. Deploy and approve the permissions.
   d. Copy the Web app URL (ends in /exec).
   e. Open config.js and paste the URL between the quotes.

2. PUT THE SURVEY ONLINE
   a. Create a GitHub repository (for example "living-the-report").
   b. Upload everything in this folder (index.html, survey.json, config.js, the img folder).
   c. Settings > Pages > Source: main branch, root. Save.
   d. Your survey link will be https://<your-username>.github.io/<repository>/

3. TEST IT
   Open the link, complete one run on each path (signed in / anonymous), then check the "responses" sheet.
   To get one column per question, open the script editor and run buildFlatSheet (creates a "flat" sheet).

Before real participants: add consent, replace the demo helpline in the debrief page with real Qatar and UK services, and get ethics approval.
