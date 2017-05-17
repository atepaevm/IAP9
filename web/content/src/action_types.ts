/**
 * Created by oshnix on 17.05.17.
 */

export enum Actions {
    SET_RADIUS,
    ADD_POINTS,
    UPDATE_POINTS,
    DELETE_ALL
}


export abstract class LocalDispatcher {
    type : Actions;
    data : any;
    constructor(type : Actions){
        this.type = type;
    }

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

export class AddPointsDispathcer extends LocalDispatcher {

    data: { x : number[], y: number[] };

    constructor( x : number[], y: number[] ){
        super(Actions.ADD_POINTS);
        this.data = { x: x, y: y };
    }

}

export class UpdatePointsDispatcher extends LocalDispatcher {
    data: { isInside : boolean[] };

    constructor(isInside : boolean[]){
        super(Actions.UPDATE_POINTS);
        this.data = { isInside: isInside };
    }
}

export class DeleteAllPoints extends LocalDispatcher {

    constructor(){
        super(Actions.DELETE_ALL);
    }

}


