import * as React from 'react';
import SingletonStorage from './storage';

const Slider = require('primereact').Slider;

const globalStore = new SingletonStorage().globalStore;

export default class SliderStep extends React.Component<any, any> {

    constructor(){
        super();
        this.state = { value: 1 };
        globalStore.dispatch({ type: "SET_RADIUS", data: { radius: 1 } });
        this.onChangeSlider = this.onChangeSlider.bind(this);
        this.onRadiusChange = this.onRadiusChange.bind(this);
    }

    onChangeSlider(e : any) {
        var curVal = 1 + (e.value / 2);
        globalStore.dispatch({ type: "SET_RADIUS", data: { radius: curVal } });
    }
    onRadiusChange(){
        this.setState({
            value: globalStore.getState().radius
        });
    }

    componentDidMount(){
        this.setState({ unmount: globalStore.subscribe(this.onRadiusChange) });
    }
    componentWillUnmount(){
        this.state.unmount();
    }

    render(){
        return(
            <div className="content">
                <span>R: </span>
                <span id="rVal">{ this.state.value }</span>
                <Slider style={{ width: '200px' }} onChange={this.onChangeSlider} step={1} min={0} max={6} />
            </div>)
    }
}




