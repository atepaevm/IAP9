import * as React from 'react';

import RightColumn from './input_fields';
import CanvasGraph from './canvas';
import Socket from './websocket';
import PointsTable from './point_table';

export default class MainHeader extends React.Component<any, any> {

    constructor(){
        super();
        let socket= new Socket("ws://localhost:10780/lab9/echo");
    }

    render() {
        return (
            <div className="menu" style={{minHeight: "60%"}}>
                <div className="container">
                    <div id="canvasContainer" className="left-block">
                        <CanvasGraph id="graph" className="brd" widthModifier={0.3} heightModifier={0.9 * 0.6} />
                    </div>
                    <PointsTable/>
                    <RightColumn/>
                </div>
            </div>);
    }
}