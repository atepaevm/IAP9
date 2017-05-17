import * as React from 'react';
import SingletonStorage from './storage';
const DataList = require('primereact').DataList;

let storage = new SingletonStorage().globalStore;

interface PointsTableState {
    points : any;
    count: number;
}

export default class PointsTable extends React.Component<any, PointsTableState> {

    constructor(){
        super();
        let state = storage.getState();
        this.state = { points: state.points, count: state.points.length };
        this.updatePoints = this.updatePoints.bind(this);
        storage.subscribe(this.updatePoints);
    }

    updatePoints(){
        let state = storage.getState();
        let count = state.points.length;
        if(this.state.count != count ){
            this.setState({ points: storage.getState().points, count: count });
        }
    }

    pointTemplate(point: {x: number, y: number, r: number, isInside: boolean}) {
        return(
            <div style={{ display: 'inline-flex'}} >
                X: <span className="tableValue" >   {point.x} </span>
                Y: <span className="tableValue" >   {point.y} </span>
                R: <span className="tableValue" >   {point.r} </span>
                In: <span className="tableValue" >  {point.isInside.toString()} </span>
            </div>
        );
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

