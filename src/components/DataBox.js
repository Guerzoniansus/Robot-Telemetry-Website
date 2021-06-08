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

    /**
     * Transforms data into a nice, presentable manner.
     * Right now it just capitalizes the first letter of every key.
     * @param data The data to format
     * @returns {{}} - The same data, but cleaner
     */
    formatData(data) {
        const newData = {};

        Object.keys(data).forEach(key => {
            const formattedKey = this.capitalizeFirstLetter(key);
            newData[formattedKey] = data[key];
        });

        return newData
    }

    /**
     * Capitalized the first letter of a string
     * @param string The string to change
     * @returns {string} - The given string but with the first letter capitalized
     */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export default DataBox;