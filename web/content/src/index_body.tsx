import * as React from 'react';
import {Link} from 'react-router-dom';
import Time from "./time";


export default class IndexBody extends React.Component<any, any>{
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
                            <Link to="/main">На главную</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
