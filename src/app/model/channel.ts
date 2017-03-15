
export class Channel {
    
    href            : string  = '';
    creationDate    : number  = 0 ;
    name            : string  = '';
    title           : string  = '';
    topicsUrl       : string  = '';   
    complete        : boolean = false;

    constructor(values: Object = {}){
        Object.assign(this,values)
    }
}
