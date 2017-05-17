import * as React from 'react';
import * as StoreType from 'redux';
import Storage from './storage';
import Socket from './websocket';


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

    protected globalStorage : StoreType.Store<any>;
    protected unmount: any;
    protected radius : number;

    constructor(props: CanvasProps){
        super();
        this.state = { width: window.innerWidth * props.widthModifier, height: window.innerHeight * props.heightModifier };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.canvasLogic = this.canvasLogic.bind(this);
        this.storageAdapter = this.storageAdapter.bind(this);
        this.globalStorage = new Storage().globalStore;
    }

    updateDimensions(){
        this.setState({ width: window.innerWidth * this.props.widthModifier, height: window.innerHeight * this.props.heightModifier });
    }

    componentDidMount() {
        window.addEventListener("resize", this.canvasLogic);
        this.radius = this.globalStorage.getState().radius;
        this.unmount = this.globalStorage.subscribe(this.storageAdapter);
        this.canvasLogic();
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.canvasLogic);
        this.unmount();
    }

    canvasLogic(){
        this.updateDimensions();
        this.canvasFill();
    }
    canvasFill(){

    }
    storageAdapter(){

    }
}

export class CanvasGraph extends Canvas {

    constructor(props: CanvasProps){
        super(props);
        this.radius = this.globalStorage.getState().radius;
        this.canvasFill = this.canvasFill.bind(this);
    }

    canvasFill(){
        let canvas : any = document.getElementById(this.props.id);
        let context = canvas.getContext("2d");
        let canvasWidth = this.state.width;
        let canvasHeight = this.state.height;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        let x_center = Math.floor(canvasWidth / 2);
        let y_center = Math.floor(canvasHeight / 2);
        let x_transform = Math.floor(this.radius * (canvasWidth - 32) / 8);
        let y_transform = Math.floor(this.radius * (canvasHeight - 32) / 8);

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

    storageAdapter(){
        let rad = this.globalStorage.getState().radius;
        if(this.radius != rad){
            this.radius = rad;
            this.canvasFill();
        }
    }

    render(){
        return(
            <canvas width={this.state.width} height={this.state.height} className={this.props.className} id={this.props.id} style={{ background: "white" }}></canvas>
        );
    }
}

export class CanvasPoints extends Canvas {

    pointCount: number;
    private socket : Socket;
    private center: {x: number, y: number};
    private transform: {x: number, y: number};
    clickable: boolean;

    constructor(props: CanvasProps){
        super(props);
        let store = this.globalStorage.getState();
        this.pointCount = store.points.length;
        this.radius = store.radius;
        this.socket = new Socket();
        this.canvasFill = this.canvasFill.bind(this);
        this.printPoint = this.printPoint.bind(this);
        this.setNewPoint = this.setNewPoint.bind(this);
    }

    canvasFill(){
        let points = this.globalStorage.getState().points;
        let canvas : any = document.getElementById(this.props.id);
        canvas.width = this.state.width;
        canvas.height = this.state.height;
        let context = canvas.getContext("2d");
        let r = this.globalStorage.getState().radius;
        this.center = { x: Math.floor(canvas.width / 2), y: Math.floor(canvas.height / 2)};
        this.transform = { x: Math.floor(r * (canvas.width - 32) / 8), y : Math.floor(r * (canvas.height - 32) / 8)};
        if(!this.clickable){
            document.getElementById(this.props.id).addEventListener('click', this.setNewPoint);
            this.clickable = true;
        }
        for(let i in points){
            this.printPoint(context, points[i], r);
        }
    }

    printPoint(context: any, point: any, r: number){
        let x = point.x / r * this.transform.x + this.center.x;
        let y = point.y / -r * this.transform.y + this.center.y;
        context.beginPath();
        if(point.isInside){
            context.fillStyle = "Green";
        } else {
            context.fillStyle = "Red";
        }
        context.arc(x, y, 3, 0*Math.PI, 2*Math.PI);
        context.fill();
        context.closePath();
    }

    setNewPoint(event: any){
        let canvas : any = document.getElementById(this.props.id);
        let rect = canvas.getBoundingClientRect();
        let offset = (rect.width - canvas.width)/2 + 1;
        let x = event.clientX - rect.left - offset;
        let y = event.clientY - rect.top - offset;
        let r = this.globalStorage.getState().radius;
        x =  r * (x - this.center.x) / this.transform.x;
        y = -r * (y - this.center.y) / this.transform.y;
        this.socket.send({ type: "A", data: { r: this.globalStorage.getState().radius, x: x, y: y} })
    }

    storageAdapter(){
        let state = this.globalStorage.getState();
        if(state.radius != this.radius){
            this.socket.send({ type: 'C', data: {r : state.radius} });
            this.radius = state.radius;
            this.pointCount = 0;
        } else {
            let count = state.points.length;
            if(this.pointCount != count){
                this.pointCount = count;
                this.canvasLogic();
            }
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.canvasLogic);
        this.unmount = this.globalStorage.subscribe(this.storageAdapter);
        this.storageAdapter();
    }

    componentWillUnmount() {
        this.clickable = false;
    }

    render(){
        return(
            <canvas width={this.state.width} height={this.state.height} className={this.props.className} id={this.props.id} ></canvas>
        );
    }
}