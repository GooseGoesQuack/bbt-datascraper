const express = require("express");
const {google} = require("googleapis");

const app = express();

app.get("/", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1oSz2GirT0q9jaIurljRSZQDla6WNESmAIBDbJFC-guc";

    // Read
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A:D",
    });

    // Write
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:D",
        valueInputOption: "RAW",
        resource: {
            values: [
                ["14:46:53", "187293823", "487", "236"],
                ["14:46:54", "187297823", "497", "226"],
            ],
        },
    });

    res.send(getRows.data);
});


app.listen(1337, (req, res) => console.log("running on 1337"));