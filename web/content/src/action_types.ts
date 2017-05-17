/**
 * Created by oshnix on 17.05.17.
 */

export enum Actions {
    SET_RADIUS,
    ADD_POINT,
    SET_DATABASE_POINTS,
    UPDATE_POINTS,
    DELETE_ALL
}

export abstract class LocalDispatcher {
    data : any;
    constructor(public type : Actions){}

    toPlainObject(){
        return {
            type: this.type,
            data: this.data
        }
    }
}

export class RadiusDispatcher extends LocalDispatcher {

    data : { radius: number };

    constructor(rad : number){
        super(Actions.SET_RADIUS);
        this.data = { radius: rad };
    }
}

export class AddPointDispathcer extends LocalDispatcher {

    data: { x : number, y: number, r: number, isInside: boolean };

    constructor( x : number, y: number, r: number, isInside: boolean){
        super(Actions.ADD_POINT);
        this.data = { x: x, y: y, r: r, isInside: isInside};
    }
}

export class SetDatabasePointsDispatcher extends LocalDispatcher {

    constructor(public data : {points: {x : number, y: number, r: number, isInside: boolean}[]}){
        super(Actions.SET_DATABASE_POINTS);
    }

}

export class UpdatePointsDispatcher extends LocalDispatcher {
    constructor(public data : { points: {x : number, y: number, isInside: boolean}[] }){
        super(Actions.UPDATE_POINTS);
    }
}

export class DeleteAllPoints extends LocalDispatcher {
    constructor(){
        super(Actions.DELETE_ALL);
    }
}



