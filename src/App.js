import './App.css';

import React, {Component} from 'react';
import Console from "./components/Console";
import DataBox from "./components/DataBox";
import Camera from "./components/Camera";

const IP_RASPBERRY = "ws://192.168.68.104:8080";

// String to be displayed when data is unknown
const UNKNOWN = "-";

const ATTEMPT_CONNECTION_MESSAGE = "Trying to connect with " + IP_RASPBERRY + "....";
const CONNECT_MESSAGE = "Connected with " + IP_RASPBERRY + ".";
const CLOSE_MESSAGE = "Could not connect with " + IP_RASPBERRY + " , connection closed.";

class App extends Component {

    constructor() {
        super();
        this.setupSocket();
    }

    // The state of all data coming from the raspberry pi
    state = {
        debugMessages: ["This is where debug messages will be displayed."],

        camera: "",

        telemetry: {
            general: {
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
                leds: UNKNOWN,
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


    /**
     * Function to be run when the connection is closed with the raspberry PI
     */
    onConnectionClosed() {
        this.sendDebugMessage(CLOSE_MESSAGE);
        this.setupSocket();
    }

    /**
     * Function that gets executed when data gets received from the Raspberry PI
     * @param data - The received data
     */
    onDataReceived(data) {
        const jsonData = JSON.parse(data);

        const telemetry = jsonData.telemetry;
        this.state.telemetry = telemetry;

        const debugMessages = jsonData.debug;
        debugMessages.forEach(message => this.sendDebugMessage(message));

        const cameraFeed = jsonData.camera;
        this.state.camera = cameraFeed;

        // Update the state, re-render the page
        this.setState(this.state);
    }

    /**
     * Sets up the web socket
     */
    async setupSocket() {
        this.sendDebugMessage(ATTEMPT_CONNECTION_MESSAGE);

        this.socket = new WebSocket(IP_RASPBERRY);
        this.socket.addEventListener("open", () => this.sendDebugMessage(CONNECT_MESSAGE));
        this.socket.addEventListener("close", () => this.onConnectionClosed());
        this.socket.addEventListener("error", () => this.onConnectionClosed());
        this.socket.addEventListener("message", (event) => this.onDataReceived(event.data))
    }

    /**
     * Send a debug message in the chat box
     * @param message - The message to send
     */
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
                  <Camera camera={this.state.camera}></Camera>
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
