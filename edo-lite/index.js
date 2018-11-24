
const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");
require("colors");

//#region colors.js
// text colors
//     black
//     red
//     green
//     yellow
//     blue
//     magenta
//     cyan
//     white
//     gray
//     grey
// background colors
//     bgBlack
//     bgRed
//     bgGreen
//     bgYellow
//     bgBlue
//     bgMagenta
//     bgCyan
//     bgWhite
//     styles
//     reset
//     bold
//     dim
//     italic
//     underline
//     inverse
//     hidden
//     strikethrough
// extras
//     rainbow
//     zebra
//     america
//     trap
//     random
//#endregion

// let journalUtility = new JournalUtility();

let journalDir = "C:" + process.env.HOMEPATH + "\\Saved Games\\Frontier Developments\\Elite Dangerous\\";
// let journalDir = "test_journals/";
let journalFiles = [];

function createWindow () {
    win = new BrowserWindow({
        width: 960, height: 540,
        icon: __dirname + "/new-s.png"
    });
    win.loadFile("index.html");
    start();
}
  
app.on("ready", createWindow);

function start() {
    journalFiles = loadJournalFiles();
    for(let journalFile of journalFiles) {
        console.log(journalFile.cyan);
        parseJournalFile(journalDir + journalFile);
    }
}

function loadJournalFiles() {
    return fs.readdirSync(journalDir).filter(
        function( elm ) {return elm.match(/.*\.(log)/ig);}
    );
}

let count = 1;

function parseJournalFile(journalFile) {
    let journalData = [];
    fs.readFile(
        journalFile,
        "utf8",
        (err, journalText) => {
            if(err) throw err;
            journalData = loadJournal(journalText);
            if(journalData[0].timestamp == "2018-11-10T10:21:27Z")
                for(let data of journalData) {
                    let timestamp = ("[" + data.timestamp + "] ").yellow;
                    console.log(timestamp + data.event);
                    // if(data.event == "FSDJump") {
                    //     let starSystem = data.StarSystem.green;
                    //     let timestamp = ("[" + data.timestamp + "]").yellow;
                    //     count++;
                    //     console.log(timestamp + " FSD Jump".cyan + " to " + starSystem + " " + count);
                    // }
                    // if(data.event == "Docked") {
                    //     let stationName = data.StationName.green;
                    //     let timestamp = ("[" + data.timestamp + "]").yellow;
                    //     count++;
                    //     console.log(timestamp + "   Docked".cyan + " at " + stationName + " " + count);
                    // }
                    // if(data.event == "LoadGame") {
                    //     let timestamp = ("[" + data.timestamp + "]").yellow;
                    //     console.log(timestamp + " LOAD GAME ".underline);
                    // }
                    // if(data.event == "Fileheader") {
                    //     let timestamp = ("[" + data.timestamp + "]").yellow;
                    //     console.log(timestamp + " " + data.gameversion);
                    // }
                }
        }
    );
}

function loadJournal(journalText) {
    let journalData = [];
    let lines = journalText.split("\n");
    for(let line of lines)
        if(line.length > 0) 
        try {journalData.push(JSON.parse(line));} catch {}
    return journalData;
}
