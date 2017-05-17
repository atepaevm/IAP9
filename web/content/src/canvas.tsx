import * as React from 'react';
import * as StoreType from 'redux';
import Storage from './storage';

interface CanvasProps {
    className: string;
    widthModifier: number;
    heightModifier: number;
    id: string;
}

interface CanvasState {
    width: number;
    height: number;
}

abstract class Canvas extends React.Component<CanvasProps, CanvasState> {
    constructor(props: CanvasProps){
        super();
        this.state = { width: window.innerWidth * props.widthModifier, height: window.innerHeight * props.heightModifier };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.canvasLogic = this.canvasLogic.bind(this);
    }

    updateDimensions(){
        this.setState({ width: window.innerWidth * this.props.widthModifier, height: window.innerHeight * this.props.heightModifier });
    }

    componentDidMount() {
        window.addEventListener("resize", this.canvasLogic);
        this.updateDimensions();
        this.canvasLogic();
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.canvasLogic);
    }

    canvasLogic(){
        this.updateDimensions();
    }
}


export default class CanvasGraph extends Canvas {

    private unmount : any;
    private globalStorage : StoreType.Store<any>;

    constructor(props: CanvasProps){
        super(props);
        this.canvasLogic = this.canvasLogic.bind(this);
        this.canvasFill = this.canvasFill.bind(this);
        this.globalStorage = new Storage().globalStore;
    }

    canvasFill(){
        let canvas : any = document.getElementById(this.props.id);
        let context = canvas.getContext("2d");
        let r = this.globalStorage.getState().radius;
        let canvasWidth = this.state.width;
        let canvasHeight = this.state.height;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        let x_center = Math.floor(canvasWidth / 2);
        let y_center = Math.floor(canvasHeight / 2);
        let x_transform = Math.floor(r * (canvasWidth - 32) / 8);
        let y_transform = Math.floor(r * (canvasHeight - 32) / 8);

        this.drawFigure(context, x_center, y_center, x_transform, y_transform);
        this.drawCoordinates(context, x_center, y_center, canvasHeight, canvasWidth, x_transform, y_transform);
    }

    drawCoordinates(context : any, x_center: number, y_center: number, canvasHeight: number, canvasWidth: number,  x_transform: number, y_transform: number){
        context.beginPath();
        /*Draw coordianates*/
        context.moveTo(x_center, canvasHeight);
        context.lineTo(x_center, 0);
        context.lineTo(x_center + 5, 5);
        context.moveTo(x_center, 0);
        context.lineTo(x_center - 5, 5);
        context.moveTo(0,y_center);
        context.lineTo(canvasWidth, y_center);
        context.lineTo(canvasWidth - 5, y_center + 5);
        context.moveTo(canvasWidth, y_center);
        context.lineTo(canvasWidth - 5, y_center - 5);

        let x_offset = x_center - x_transform;
        let y_offset = y_center - y_transform;
        /*Draw measures*/
        for(let i = 0; i < 5 ; ++i){
            context.moveTo(x_center - 5, y_offset);
            context.lineTo(x_center + 5, y_offset);
            context.moveTo(x_offset,y_center - 5);
            context.lineTo(x_offset,y_center + 5);
            x_offset += x_transform / 2;
            y_offset += y_transform / 2;
        }
        context.strokeStyle="black";
        context.stroke();
        /*Draw coordinates text*/
        context.font = "16px Georgia";
        context.textBaseline="top";
        context.textAlign="left";
        context.fillStyle="black";
        context.fillText("Y", x_center + 10, 0);
        context.textAlign="right";
        context.textBaseline="bottom";
        context.fillText("X", canvasWidth, y_center - 10);
    }

    drawFigure(context : any, x_center: number, y_center: number, x_transform: number, y_transform: number){
        context.beginPath();
        this.drawEllipse(context, x_center+1, y_center+1, x_transform, y_transform);
        this.drawTriangle(context, x_center - 1, y_center - 1, x_transform, y_transform);
        context.rect(x_center + 1 ,y_center - 1-y_transform, x_transform, y_transform);
        context.closePath();
        context.fillStyle="#5c99ED";
        context.fill();
    }

    drawEllipse(context : any, x : number, y : number, a : number, b : number) {
        context.save();
        context.translate(x, y);
        context.scale(a / b, 1);
        context.arc(0, 0, b, 0, Math.PI * 0.5, false);
        context.lineTo(0, 0);
        context.lineTo(b, 0);
        context.restore();
    }

    drawTriangle(context : any, x : number, y : number, x_transform: number, y_transform: number) {
        context.save();
        context.translate(x, y);
        context.moveTo(0, 0);
        context.lineTo(0, - y_transform);
        context.lineTo(-x_transform/2, 0);
        context.lineTo(0, 0);
        context.restore();
    }


    canvasLogic(){
        this.updateDimensions();
        this.unmount = this.globalStorage.subscribe(this.canvasFill);
        this.canvasFill();
    }

    render(){
        return(
            <canvas width={this.state.width} height={this.state.height} className={this.props.className} id={this.props.id} style={{ background: "white" }}></canvas>
        );
    }
}



