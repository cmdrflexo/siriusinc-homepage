/* 
 * Server Connection
 */

const ServerConnection = {
    ServerConnection: class {
        constructor(pcChannel) {
            this.socket = io.connect("/");
            this.messages = {
                PC_REQ: "pointCloudRequest",
                PC_RES: "pointCloudResponse",
                START_CAM: "startCamera",
                STOP_CAM: "stopCamera"
            }
            this.pcChannel = pcChannel;
            this.setupSockets();
        }

        setupSockets() {
            this.socket.on(this.messages.PC_RES, (pc) => {
                if(pc) this.pcChannel(pc);
            });
        }

        stopCam() {
            this.socket.emit(this.messages.STOP_CAM);
        }

        requestPointCloud() {
            this.socket.emit(this.messages.PC_REQ);
        }

        // serverMessage(message, echo) {
        //     var css = "background: black; color: cyan";
        //     this.socket.emit(this.messages.CLIENT_MSG, JSON.stringify({
        //         type: this.messages.CLIENT_UPDATES.serverLogMessage, 
        //         message: message
        //     }));
        //     if(echo) console.log("%c" + message, css);
        // }
    }
}
