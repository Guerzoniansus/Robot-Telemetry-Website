import './App.css';

import React, {Component} from 'react';
import Console from "./components/Console";
import DataBox from "./components/DataBox";

const UNKNOWN = "-";
const IP_RASPBERRY = "ws://192.168.68.104:8080";

const ATTEMPT_CONNECTION_MESSAGE = "Trying to connect with " + IP_RASPBERRY + "....";
const CONNECT_MESSAGE = "Connected with " + IP_RASPBERRY + ".";
const CLOSE_MESSAGE = "Could not connect with " + IP_RASPBERRY + " , connection closed.";

class App extends Component {

    constructor() {
        super();
        this.setupSocket();
    }

    state = {
        debugMessages: ["This is where debug messages will be displayed."],

        telemetry: {
            general: {
                connection: "no connection",
                battery: UNKNOWN,
                state: UNKNOWN
            },

            sensors: {
                distanceSensor: UNKNOWN,
                weightSensor: UNKNOWN
            },

            actuators: {
                leftMotor: UNKNOWN,
                rightMotor: UNKNOWN,
                arm: UNKNOWN,
                gripper: UNKNOWN,
                display: UNKNOWN
            },

            remoteController: {
                lastPressed: UNKNOWN,
                leftJoystick: UNKNOWN,
                rightJoystick: UNKNOWN
            },

            bingo: {
                state: UNKNOWN,
                numbers: UNKNOWN
            }
        }
    };

    onConnectionClosed() {
        this.sendDebugMessage(CLOSE_MESSAGE);
        this.setupSocket();
    }

    onDataReceived(data) {
        const jsonData = JSON.parse(data);

        const telemetry = jsonData.telemetry;
        this.state.telemetry = telemetry;

        const debugMessages = jsonData.debug;

        debugMessages.forEach(message => this.sendDebugMessage(message));

        this.setState(this.state);
    }

    async setupSocket() {
        this.sendDebugMessage(ATTEMPT_CONNECTION_MESSAGE);
        this.socket = new WebSocket(IP_RASPBERRY);
        this.socket.addEventListener("open", () => this.sendDebugMessage(CONNECT_MESSAGE));

        this.socket.addEventListener("close", () => this.onConnectionClosed());
        this.socket.addEventListener("error", () => this.onConnectionClosed());
        this.socket.addEventListener("message", (event) => this.onDataReceived(event.data))
    }

    sendDebugMessage(message) {
        this.state.debugMessages.push(message);
        this.setState(this.state);
    }


    render() {
        return (
            <div className="App">
              <div class="row" id="top-row">
                <h1>Bingobot Telemetrie</h1>
              </div>

              <div className="row">
                  <DataBox title="General" data={this.state.telemetry.general}></DataBox>
                  <Console messages={this.state.debugMessages}></Console>
                  <div id="camera"></div>
              </div>

              <div className="row">
                  <DataBox title="Actuators" data={this.state.telemetry.actuators}></DataBox>
                  <DataBox title="Sensors" data={this.state.telemetry.sensors}></DataBox>
                  <DataBox title="Remote Controller" data={this.state.telemetry.remoteController}></DataBox>
                  <DataBox title="Bingo" data={this.state.telemetry.bingo}></DataBox>
              </div>
            </div>
        );
    }

}

export default App;
