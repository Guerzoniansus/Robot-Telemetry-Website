import React, {Component} from 'react';

class DataBox extends Component {
    render() {
        const title = this.props.title;
        const data = this.formatData(this.props.data);


        return (
            <div class="box box-data">
                <h2>{title}</h2>
                {
                    Object.keys(data).map(key => {
                        return <p class="telemetry-text" key={key}>{key}: {data[key]}</p>
                    })
                }
            </div>
        );
    }

    formatData(data) {
        const newData = {};

        Object.keys(data).forEach(key => {
            const formattedKey = this.captializeFirstLetter(key);
            newData[formattedKey] = data[key];
        });

        return newData
    }

    captializeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export default DataBox;