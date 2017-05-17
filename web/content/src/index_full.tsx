import * as React from 'react';
import IndexHeader from './index_header';
//import IndexBody from './index_body';
import IndexBody from './index_body';

export default class Index extends React.Component <any, any> {
    render(){
        return(
            <div>
                <IndexHeader labnum={9} owners="Слобода Даниил и Атепаев Михаил" variant="индивидуальный"/>
                <IndexBody/>
                <footer/>
            </div>
        )
    }
}