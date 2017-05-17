import * as React from 'react';
import MainHeader from './main_header';
import {connect, Provider} from 'react-redux';
import SingletonStorage from './storage';
import MainBody from "./main_body";

function stateToProps(state : {radius: number, points: any}) {
    return{
        radius: state.radius,
        points: state.points
    }
}

type propState = {
    radius: number;
    points: string;
}

const storage = new SingletonStorage();

class MainComponent extends React.Component<any, any> {
    render(){
        return(
            <div>
                <MainHeader/>
                <MainBody/>
                <footer/>
            </div>
        );
    }
}



export default class Main extends React.Component<any, any> {
    render(){
        return(
          <Provider store={storage.globalStore}>
              <MainComponent/>
          </Provider>
        );
    }
}
connect<{}, {}, propState>(stateToProps)(Main);



