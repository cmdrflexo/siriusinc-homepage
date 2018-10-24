/*
 * Server
 */

const http = require("http");
const express = require("express");
const socket = require("socket.io");
const rs2 = require("../../../index.js");

var pc = new rs2.PointCloud();
var colorizer = new rs2.Colorizer();
var pipeline = new rs2.Pipeline();
pipeline.start();

const PORT = 8989;
const LOG_LEVEL = 0;

// SOCKET MESSAGES
const PC_REQ = "pointCloudRequest";
const PC_RES = "pointCloudResponse";
const START_CAM = "startCamera";
const STOP_CAM = "stopCamera";

var app, server, io;
var serverLog = "";

appStart();
socketStart();
// setInterval(() => {update()}, 100);

function appStart() {
    app = express();
    server = app.listen(PORT, "192.168.0.196", () => {
        ServerLogMessage("Server listening on " + PORT);
    });
    app.get("/", (req, res) => {
        res.send(serverLog);
    });
    app.use(express.static("../"));
}

function socketStart() {
    io = socket(server);
    io.on("connection", (socket) => {
        ServerLogMessage("Socket connection " + socket.id);
        socket.on("disconnect", () => { 
            ServerLogMessage(socket.id + " disconnected");
        });
        socket.on(PC_REQ, () => {
            let data = getFrameData();
            if(data) socket.emit(PC_RES, data);
        });
        socket.on(STOP_CAM, () => {stopCam();});
    });
}

function getFrameData() {
    // let frameSet = pipeline.waitForFrames();
    // const pointsFrame = pc.calculate(frameSet.depthFrame);
    // if(pointsFrame.vertices) return Object.values(pointsFrame.vertices);
    // else return null;
    let frameSet = pipeline.waitForFrames();
    // let frame = frameSet.getFrame(0);
    // let depthFrame = frame;
    let depthFrame = frameSet.depthFrame;
    let colorFrame = Object.values(frameSet.colorFrame.getData());
    // console.log(depthFrame.width + ", " + depthFrame.height);
    if(depthFrame && colorFrame) {
        
        let depth = [];
        for(let y = 0; y < 720; y++) {
            for(let x = 0; x < 1280; x++) {
                if(x % 4 == 0 && y % 4 == 0)
                    depth.push(depthFrame.getDistance(x, y));
            }
        }
        return [depth, colorFrame];
    } else {
        return null;
    }
}

function stopCam() {
    pc.destroy();
    pipeline.stop();
    pipeline.destroy();
    rs2.cleanup();
}

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

// const xUsers = require("./server_modules/users/users-tool-server");

// const PORT = 3000;
// const LOG_LEVEL = 0;

// // SOCKET MESSAGES
// const LOGIN_RES    = "loginRes";
// const USERS_RES    = "usersRes";
// const SERVER_MSG   = "serverMessage";
// const MSG_ERROR    = "msgError";
// const PURGE_USERS  = "purgeUsers";
// const CLIENT_MSG   = "message";
// const CLIENT_UPDATES = {
//     serverLogMessage: "serverLogMessage",
//     trackedPointsUpdate: "trackedPointsUpdate"
// };

// // var users = {};
// var app, server, io;
// var serverLog = "";

// class User {
//     constructor() {
//         this.name;
//         this.socket;
//         this.position;
//     }
// };

// moduleSetup();
// appStart();
// socketStart();

// function moduleSetup() {
//     // Messaging
//     xUsers.setMessaging(ServerLogMessage);
// }

// function appStart() {
//     app = express();
//     server = app.listen(PORT, () => {
//         ServerLogMessage("User-Space Server. Listening on port " + PORT);
//     });
//     app.get("/", (req, res) => {
//         res.send("User-Space Server Log:" + serverLog);
//     });
// 	// Static App
//     app.use(express.static("app"));
// }

// function socketStart() {
//     io = socket(server);
    
//     io.on("connection", (socket) => {
//         ServerLogMessage("Socket connection " + socket.id);
    
//         socket.on("disconnect", () => { 
//             ServerLogMessage(socket.id + " disconnected");
//             delete xUsers.users[socket.uniqueID];
//         });

//         socket.on(PURGE_USERS, () => {
//             ServerLogMessage("Users purged");
//             io.emit(SERVER_MSG, "Users purged");
//             xUsers.users = {};
//         });

//         socket.on(CLIENT_MSG, (message) => {
//             var data = {};
//             try {data = JSON.parse(message);} 
//             catch(e) {socket.emit(MSG_ERROR, "Invalid data: " + e); return;}
//             switch(data.type) {
//                 case "login":
//                     ServerLogMessage("User login: " + data.uniqueID);
//                     if(xUsers.users[data.uniqueID]) {
//                         ServerLogMessage("Login failure, uniqueID not available");
//                         socket.emit(LOGIN_RES, false);
//                     } else {
//                         ServerLogMessage("Login success, user added");
//                         // xUsers.users[data.uniqueID] = new User(
//                         //     data.uniqueID, data.displayName, socket.id
//                         // );
//                         xUsers.users[data.uniqueID] = new User();
//                         xUsers.users[data.uniqueID].uniqueID = data.uniqueID;
//                         xUsers.users[data.uniqueID].displayName = data.displayName;
//                         xUsers.users[data.uniqueID].socketID = socket.id;
//                         ServerLogMessage(JSON.stringify(xUsers.users[data.uniqueID]));
//                         socket.uniqueID = data.uniqueID;
//                         socket.emit(LOGIN_RES, true);
//                     }
//                     // ServerLogMessage(JSON.stringify(xUsers.users));
//                     break;
//                 case "usersReq":
//                     socket.emit(USERS_RES, JSON.stringify(xUsers.users));
//                     break;
//                 case CLIENT_UPDATES.trackedPointsUpdate:
//                     xUsers.updateTrackedPoints(xUsers.users, data);
//                     break;
//                 case CLIENT_UPDATES.serverLogMessage:
//                     ServerLogMessage(data.message);
//                     break;
//                 default:
//                     ServerLogMessage("Invalid command received");
//                     socket.emit(MSG_ERROR, "Command not found: " + data.type);
//                     break;
//             }
//         });
//     });
// }
