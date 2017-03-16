import {EksiBaseModel} from '../model/eksibase';

export class Channel extends EksiBaseModel {
    
    href            : string  = '';
    creationDate    : number  = 0 ;
    name            : string  = '';
    title           : string  = '';
    topicsUrl       : string  = '';   
    complete        : boolean = false;

    constructor(values: Object = {}){
        super();
        Object.assign(this,values)
    }
}
