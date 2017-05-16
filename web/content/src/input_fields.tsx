import * as React from 'react';
const Prime = require('primereact');
const Slider = Prime.Slider;

interface RightColumnState{
    slider: number;
};

export default class RightColumn extends React.Component< null, RightColumnState> {

    onChangeSlider(e : any){
        this.setState({ slider: e.value });
    }

    constructor(){
        super();
        this.state = { slider: 1 };
        this.onChangeSlider = this.onChangeSlider.bind(this);
    }

    render(){
        return(
            <div>
                {this.state.slider}
                <Slider style={{ width: '200px' }} onChange={this.onChangeSlider} step={1} min={0} max={6} />
            </div>
        )
    }


}