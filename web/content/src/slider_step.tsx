import * as React from 'react';
import SingletonStorage from './storage';
import * as ActionTypes from './action_types';

const Slider = require('primereact').Slider;

const globalStore = new SingletonStorage().globalStore;

export default class SliderStep extends React.Component<any, any> {

    constructor(){
        super();
        this.state = { value: 1 };
        globalStore.dispatch(new ActionTypes.RadiusDispatcher(1).toPlainObject());
        this.onChangeSlider = this.onChangeSlider.bind(this);
        this.onRadiusChange = this.onRadiusChange.bind(this);
    }

    onChangeSlider(e : any) {
        globalStore.dispatch(new ActionTypes.RadiusDispatcher(1 + (+e.value / 2)).toPlainObject());
    }
    onRadiusChange(){
        let storageRadius = globalStore.getState().radius;
        if(storageRadius != this.state.value) {
            this.setState({
                value: storageRadius
            });
        }
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




