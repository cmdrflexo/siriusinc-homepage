/*
 * Server
 */

const https = require("https");
const fs = require("fs");
const express = require("express");
const socket = require("socket.io");

const PORT = 3100;
const LOG_LEVEL = 0;

// SOCKET MESSAGES
const msg = {
    EDDB_REQ_STAR_SYSTEM: "EDDB_REQ_STAR_SYSTEM",
    EDDB_REQ_FACTION:     "EDDB_REQ_FACTION",
    EDDB_RES_STAR_SYSTEM: "EDDB_RES_STAR_SYSTEM",
    EDDB_RES_FACTION:     "EDDB_RES_FACTION"
}

var app, server, io;
var serverLog = "";

appStart();
socketStart();

// EDDB
var eddbSystemsPopulatedFile = fs.createWriteStream(Date.now() + "systems_populated.jsonl");
var eddbSystemsPopulatedLatest;
try {
    var request = https.get(
        "https://eddb.io/archive/v5/systems_populated.jsonl", 
        (response) => {
            response.pipe(file);
            createEDDBStarSystems();
            console.log(eddbSystemsPopulatedLatest.length)
        }
    );
} catch(e) {
    console.log(e);
}

function appStart() {
    app = express();
    server = app.listen(PORT, () => {
        ServerLogMessage("Server listening on " + PORT);
    });
    app.get("/", (req, res) => {
        res.send(serverLog);
    });
    app.use(express.static("app"));
}

function socketStart() {
    io = socket(server);
    io.on("connection", (socket) => {
        ServerLogMessage("Socket connection " + socket.id);
        socket.on("disconnect", () => { 
            ServerLogMessage(socket.id + " disconnected");
        });
        // EDDB
        // socket.on(msgs.EDDB_REQ_STAR_SYSTEM, (name) => {
        //     socket.emit(getEDDBStarSystem(name));
        // });
    });
}

function createEDDBStarSystems() {
    eddbSystemsPopulatedLatest = JSON.parse(eddbSystemsPopulatedFile);
}

// function validDatabase(path, size) {
//     return fs.existsSync(path) && fs.statSync(file).size > size;        
// }

function ServerLogMessage(message, level = 0) {
    var timestamp = formateDate(new Date());
    serverLog += "<br>" + timestamp + " \"" + message + "\"";
    if(LOG_LEVEL <= level) console.log(timestamp, message);
}

function formateDate(date) {
    var YYYY = date.getFullYear();
    var MM   = ("0" + (date.getMonth() + 1)).slice(-2);
    var DD   = ("0" +  date.getDate()      ).slice(-2);
    var hh   = ("0" +  date.getHours()     ).slice(-2);
    var mm   = ("0" +  date.getMinutes()   ).slice(-2);
    var ss   = ("0" +  date.getSeconds()   ).slice(-2);
    return YYYY + "-" + MM + "-" + DD + "_" + hh + "-" + mm + "-" + ss;
}
