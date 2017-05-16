import * as React from 'react';
import * as RouterDom from 'react-router-dom';
import * as Router from 'react-router';
import Time from "./time";

interface IndexBodyProps{};

interface IndexBodyState{};

export default class IndexBody extends React.Component<IndexBodyProps, IndexBodyState>{
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}