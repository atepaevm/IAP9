import * as React from 'react';
import {Router, Switch, Route} from 'react-router';
import createHistory from 'history/createBrowserHistory'
import * as ReactDOM from 'react-dom';
import Index from './index_full';
import Main from './main_full';

import {Provider} from 'react-redux';


const browserHistory = createHistory();


class Pager extends React.Component <any, any> {
    render(){
        return(
          <Router history={browserHistory} >
              <Switch>
                  <Route path="/web/content/main" component={Main}/>
                  <Route path="/web/content" component={Index}/>
              </Switch>
          </Router>
        );
    }
}

ReactDOM.render(React.createElement(Pager), document.getElementById('root'));