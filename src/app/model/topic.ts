export class Topic {

    href                : string  = '';
    creationDate        : number  = 0 ;
    topicText           : string  = '';
    relatedEntryCount   : number  = 0 ;
    type                : string  = '';

    constructor(values: Object = {}){
        Object.assign(this,values)
    }
}