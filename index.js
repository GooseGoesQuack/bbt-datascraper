
function extract(object) {
    var requestTime = (new Date()).getTime();
    var busID = object["vehicleId"];
    var eta = object["timeToStation"];
    var mapsTraffic = 0;
    return [requestTime, busID, eta, mapsTraffic];
}
 
async function getTFL(url) {
    var arr = [];
    const response = await fetch(url);
    var data = await response.json();
    
    for (let i in data) {
        arr.push(extract(data[i]));
    }
    return new Promise(function(resolve, reject) {
        resolve(arr);
    });
}


// ************

getTFL('https://api.tfl.gov.uk/Line/154/Arrivals/490012554E?modesFilter=tube&oysterOnly=false').then(function(arr) {
    let usefulData = arr;
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
            values: usefulData,
        },
    });
 
    res.send(getRows.data);
});
 
 
app.listen(1337, (req, res) => console.log("running on 1337"));
});



