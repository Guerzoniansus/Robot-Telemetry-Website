import React, {Component} from 'react';

class Camera extends Component {
    render() {
        const imageBase64 = this.props.camera

        // Javascript can automatically convert the base64 string to image source
        return (
            <div id="camera-div">
                <img id="camera-feed" src={"data:image/png;base64," + imageBase64}></img>
            </div>
        );
    }
}

export default Camera;