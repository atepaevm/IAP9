import * as React from 'react';
import SingletonStorage from './storage';
const DataList = require('primereact').DataList;

let storage = new SingletonStorage().globalStore;

interface PointsTableState {
    points : any;
    count: number;
}

export default class PointsTable extends React.Component<any, PointsTableState> {

    unsubscribe : any;

    constructor(){
        super();
        let state = storage.getState();
        this.state = { points: state.databasePoints, count: state.databasePoints.length };
        this.updatePoints = this.updatePoints.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

    }

    updatePoints(){
        let state = storage.getState();
        let count = state.databasePoints.length;
        if(this.state.count != count ){
            this.setState({ points: state.databasePoints, count: count });
        }
    }

    pointTemplate(point: {x: number, y: number, r: number, isInside: boolean}) {
        let x = Math.round(point.x * 100) / 100;
        let y = Math.round(point.y * 100) / 100;
        return(
            <div style={{ display: 'inline-flex'}} >
                X: <span className="tableValue" >   {x} </span>
                Y: <span className="tableValue" >   {y} </span>
                R: <span className="tableValue" >   {point.r} </span>
                In: <span className="tableValue" >  {point.isInside.toString()} </span>
            </div>
        );
    }

    componentDidMount() {
        this.unsubscribe = storage.subscribe(this.updatePoints);
    }
    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        return(
            <div className="middle-block">
                    <span> Список точек </span>
                    <DataList value={ this.state.points } itemTemplate={this.pointTemplate} paginator={true} rows={12} />
            </div>
        );
    }

}

