import React, {Component} from 'react';

class Camera extends Component {
    render() {
        const imageBase64 = this.props.camera

        return (
            <div id="camera-div">
                <img id="camera-feed" src={"data:image/png;base64," + imageBase64}></img>
            </div>
        );
    }
}

export default Camera;