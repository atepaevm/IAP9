import * as React from 'react';
import {Link} from 'react-router-dom';


export default class MainBody extends React.Component<any, any> {
    render(){
        return(
            <div className="workspace" style={{ top: "60%", height: "35%"}}>
                <div className="content">
                    <div className="content--main">
                        <div className="changeLocation">
                            <Link to="/web/content">На начальную страницу</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


