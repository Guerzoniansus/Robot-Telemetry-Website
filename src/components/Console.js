import React, {Component} from 'react';

class Console extends Component {
    render() {

        const messages = this.props.messages;

        return (
            <div class="box box-console">
                {
                    // Reverse because of how css styling works
                    messages.reverse().map((message, index) => {
                        return <p class="debug-message" key={index}>{message}</p>
                    })
                }

            </div>
        );
    }
}

export default Console;