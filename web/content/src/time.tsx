
import * as React from 'react';

interface TimeState {
    time: string;
}

export default class Time extends React.Component <null, TimeState>{
    interval : any;

    constructor(){
        super();
        this.state = { time: new Date().toLocaleString()};
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this.setState({ time : new Date().toLocaleString()});
        }, 7000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <span>{this.state.time}</span>
        )
    }
}