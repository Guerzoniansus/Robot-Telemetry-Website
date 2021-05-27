class WebConnection {
    constructor(IP, sendConsoleMessage) {
        this.IP = IP;
        this.sendConsoleMessage = sendConsoleMessage;
        this.socket = new WebSocket(this.IP);
    }


}