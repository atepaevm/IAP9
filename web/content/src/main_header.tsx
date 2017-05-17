import * as React from 'react';

import RightColumn from './input_fields';
import CanvasGraph from './canvas';

export default class MainHeader extends React.Component<any, any> {

    render() {
        return (
            <div className="menu" style={{minHeight: "60%"}}>
                <div className="container">
                    <div id="canvasContainer" className="left-block">
                        <CanvasGraph id="graph" className="brd" widthModifier={0.3} heightModifier={0.9 * 0.6} />
                    </div>
                    <RightColumn/>
                </div>
            </div>);
    }
}