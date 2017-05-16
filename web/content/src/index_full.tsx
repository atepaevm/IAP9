import * as React from 'react';
import IndexHeader from './index_header';
import IndexBody from './index_body';
import * as ReactDOM from 'react-dom';

export default class Index extends React.Component <null, null> {
    render(){
        return(
            <div>
                <IndexHeader labnum={9} owners="Слобода Даниил и Атепаев Михаил" variant="индивидуальный"/>
                <IndexBody/>
            </div>
        )
    }
}

ReactDOM.render(React.createElement(Index), document.getElementById('root'));