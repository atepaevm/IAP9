import {createStore} from 'redux';
import * as ActionTypes from './action_types';

export default class SingletonStorage {

    private static instance : SingletonStorage;
    public globalStore: any;

    static initialState = {
        radius: 1,
        points: <any>[],
        databasePoints: <any>[]
    };

    simpleReducer(state = SingletonStorage.initialState, action : ActionTypes.LocalDispatcher ) {
        switch(action.type) {
            case ActionTypes.Actions.SET_RADIUS:
                return Object.assign({}, state, {radius: action.data.radius});
            case ActionTypes.Actions.UPDATE_POINTS:
                return Object.assign({}, state, {points: action.data });
            case ActionTypes.Actions.ADD_POINT:
                let x = action.data.x;
                let y = action.data.y;
                let isInside = action.data.isInside;
                let r = action.data.r;
                return Object.assign({}, state, { points: state.points.concat([{ x: x, y : y, r: r, isInside: isInside}]),
                    databasePoints: state.databasePoints.concat([ {x: x, y: y, r: r, isInside: isInside }])});
            case ActionTypes.Actions.DELETE_ALL:
                return Object.assign({}, state, { points: [], databasePoints: [] });
            case ActionTypes.Actions.SET_DATABASE_POINTS :
                return Object.assign({}, state, { databasePoints : action.data });
            default:
                return SingletonStorage.initialState;
        }
    }

    private configureStore(){
        return createStore(this.simpleReducer,  SingletonStorage.initialState );
    }

    constructor(){
        if(SingletonStorage.instance){
            return SingletonStorage.instance;
        }
        this.globalStore = this.configureStore();
        SingletonStorage.instance = this;
    }
}



