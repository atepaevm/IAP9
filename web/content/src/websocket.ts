import Storage from './storage';
import * as ActionTypes from './action_types';


export default class SingletonWebSocket {

    private static instance : SingletonWebSocket;
    Socket : WebSocket;
    private storage = new Storage().globalStore;

    constructor(path: string){
        if(SingletonWebSocket.instance){
            return SingletonWebSocket.instance
        }
        let self = this;
        this.Socket = new WebSocket(path);
        this.Socket.onopen = function () {
            this.send(JSON.stringify({
                type: "G",
                rval: 1
            }));
        };
        this.Socket.onmessage = function (event : any) {
            let data = JSON.parse(event.data);
            switch (data.type){
                case 'G':
                    console.log(data);
                    self.storage.dispatch(new ActionTypes.AddPointsDispathcer(data.xvals, data.yvals, data.points).toPlainObject());
                    break;


            }
        }
    }
}



