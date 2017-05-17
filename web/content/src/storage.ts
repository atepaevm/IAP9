import {createStore} from 'redux';
import * as ActionTypes from './action_types';

export default class SingletonStorage {

    private static instance : SingletonStorage;
    public globalStore: any;

    static initialState = {
        radius: 1,
        points: [{x: 1, y: 1}],
        redraw: 0
    };

    simpleReducer(state = SingletonStorage.initialState, action : ActionTypes.LocalDispatcher ) {
        switch(action.type) {
            case ActionTypes.Actions.SET_RADIUS:
                return Object.assign({}, state, {radius: action.data.radius});
            case ActionTypes.Actions.ADD_POINTS:
                let xValues = action.data.x;
                let yValues = action.data.y;
                let array = [];
                for(let i in xValues){
                    array.push({x: xValues[i], y: yValues[i]});
                }
                return Object.assign({}, state, {points: state.points.concat(array)});
            default:
                return SingletonStorage.initialState;
        }
    }

    private configureStore(){
        return createStore(this.simpleReducer,  { radius: 1, points: [{x: 1, y: 1}], redraw: 0 });
    }

    constructor(){
        if(SingletonStorage.instance){
            return SingletonStorage.instance;
        }
        this.globalStore = this.configureStore();
        SingletonStorage.instance = this;
    }
}



