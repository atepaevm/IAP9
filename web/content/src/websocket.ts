import Storage from './storage';
import * as ActionTypes from './action_types';

export default class SingletonWebSocket {

    private static instance : SingletonWebSocket;
    private Socket : WebSocket;
    private storage = new Storage().globalStore;

    constructor(){
        if(SingletonWebSocket.instance){
            return SingletonWebSocket.instance;
        }
        let self = this;
        this.Socket = new WebSocket("ws://localhost:10780/echo");
        this.Socket.onopen = function () {
            this.send(JSON.stringify({
                type: "G",
                data: {}
            }));
            this.send(JSON.stringify({
                type: "C",
                data: {
                    r: self.storage.getState().radius
                }
            }));
        };
        this.Socket.onmessage = function (event : any) {
            let message;
            try{
                message = JSON.parse(event.data);
            } catch (e){
                message = { type : 'F', data : {} };
            }
            let data = message.data;
            switch (message.type){
                case 'G':
                    self.storage.dispatch(new ActionTypes.SetDatabasePointsDispatcher(data.points).toPlainObject());
                    break;
                case 'A':
                    self.storage.dispatch(new ActionTypes.AddPointDispathcer(data.x, data.y, data.r, data.isInside).toPlainObject());
                    break;
                case 'D':
                    self.storage.dispatch(new ActionTypes.DeleteAllPoints().toPlainObject());
                    break;
                case 'C':
                    self.storage.dispatch(new ActionTypes.UpdatePointsDispatcher(data.points).toPlainObject());
                    break;
                case 'F':
                    console.log(event.data);
                    break;
                default:
                    console.log(message);
                    break;
            }
        };
        SingletonWebSocket.instance = this;
    }

    send(data : { type: string, data: any }){
        this.Socket.send(JSON.stringify(data));
    }

}



