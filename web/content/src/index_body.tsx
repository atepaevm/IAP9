import * as React from 'react';
/*import * as RouterDom from 'react-router-dom';
import * as Router from 'react-router';*/
const Prime = require('primereact');
const Slider = Prime.Slider;

import Time from "./time";

interface IndexBodyProps{};

interface IndexBodyState{
    slider: number;
};

export default class IndexBody extends React.Component<IndexBodyProps, IndexBodyState>{


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
            <div className="workspace">
                <h1>Стартовая страница</h1>
                <div className ="content">
                    <div className="content--main">
                        <div className="content--main--header">
                            Дата и время
                        </div>
                        <div className="content--main--body" id="datetime">
                            <Time/>
                        </div>
                        <div className="changeLocation">
                            {this.state.slider}
                        </div>
                        <Slider style={{ width: '200px' }} onChange={this.onChangeSlider} step={1} min={0} max={6} />
                    </div>
                </div>
            </div>
        )
    }
}