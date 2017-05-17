import * as React from 'react';

import SliderStep from './slider_step';

export default class MainHeader extends React.Component<any, any> {
    render() {
        return (
            <div className="menu" style={{minHeight: "60%"}}>
                <div className="container">
                    <div id="canvasContainer" className="left-block">

                    </div>
                    <div className="right-block">
                        <form>
                            <div className="content">
                                X:<br/>
                                -4<input type="radio" name="xValue" value={-4}/>
                                -3<input type="radio" name="xValue" value={-3}/>
                                -2<input type="radio" name="xValue" value={-2}/>
                                -1<input type="radio" name="xValue" value={-1}/>
                                0<input type="radio" name="xValue" value={0}/>
                                1<input type="radio" name="xValue" value={1}/>
                                2<input type="radio" name="xValue" value={2}/>
                                3<input type="radio" name="xValue" value={3}/>
                                4<input type="radio" name="xValue" value={4}/>
                            </div>
                            <div className="content">
                                Y:
                                <input type="text" required={true} placeholder="fill me" id="yValue"
                                       style={{marginLeft: 15}}/>
                            </div>
                            <SliderStep/>
                        </form>
                    </div>
                </div>
            </div>);
    }
}