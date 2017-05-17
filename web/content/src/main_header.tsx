import * as React from 'react';

import RightColumn from './input_fields';

export default class MainHeader extends React.Component<any, any> {
    render() {
        return (
            <div className="menu" style={{minHeight: "60%"}}>
                <div className="container">
                    <div id="canvasContainer" className="left-block">

                    </div>
                    <RightColumn/>
                </div>
            </div>);
    }
}