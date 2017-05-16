import * as React from 'react';
import {Router, Switch, Route} from 'react-router';
import createHistory from 'history/createBrowserHistory'
import * as ReactDOM from 'react-dom';
import Index from './index_full';

const browserHistory = createHistory();

class Pager extends React.Component <null, null> {

    render(){
        return(
              <Router history={browserHistory} >
                  <Route path="*" component={Index}/>
              </Router>
        );
    }
}

ReactDOM.render(React.createElement(Pager), document.getElementById('root'));








