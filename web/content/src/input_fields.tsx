import * as React from 'react';
import SliderStep from './slider_step';
import Socket from './websocket';

import Storage from './storage';
import * as ActionTypes from './action_types';

let store = new Storage().globalStore;

interface RightColumnState{
    slider: number;
};

export default class RightColumn extends React.Component< null, RightColumnState> {

    private socket: Socket;

    constructor(){
        super();
        this.socket = new Socket();
        this.sendPoint = this.sendPoint.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    sendPoint(){
        let elements : any = document.forms[0].elements;
        let y = +elements.yValue.value;
        if(!Number(y)){
            alert("Установите правильный y");
            return false;
        } else if(y < -4 || y > 4){
            alert("Неверный диапазон Y");
            return false;
        }
        let x = undefined;
        elements = elements['xValue'];
        for(let i in elements){
            if(elements[i].checked ){
                x = elements[i].value;
            }
        }
        if(x === undefined ){
            alert('Установите X');
            return false;
        }
        x = Number(x);
        elements = document.getElementById('rVal');
        let r : number = +elements.innerHTML;
        this.socket.send({ type: 'A', data: { x: x, y: y, r: r }})
    }

    deleteAll() {
        this.socket.send({type: 'D', data: {}});
    }

    render(){
        return(
            <div className="right-block">
                <form>
                    <div className="content">
                        X:<br/>
                        -4<input type="radio" name="xValue" value={-4}/>
                        -3<input type="radio" name="xValue" value={-3}/>
                        -2<input type="radio" name="xValue" value={-2}/>
                        -1<input type="radio" name="xValue" value={-1}/>
                        0<input type="radio" name="xValue" value={0}/>
                        1<input type="radio" name="xValue" value={1}/>
                        2<input type="radio" name="xValue" value={2}/>
                        3<input type="radio" name="xValue" value={3}/>
                        4<input type="radio" name="xValue" value={4}/>
                    </div>
                    <div className="content">
                        Y:
                        <input type="text" required={true} placeholder="fill me" id="yValue"
                               style={{marginLeft: 15}}/>
                    </div>
                    <SliderStep/>
                </form>
                <div onClick={this.sendPoint}>
                    Отправить точку
                </div>
                <div onClick={this.deleteAll}>
                    Удалить все точки
                </div>
            </div>
        )
    }
}