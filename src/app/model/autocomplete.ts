import { Topic    } from './topic'
import { Suser } from './suser'

export class AutoComplete {

    query       : string   = null;
    topicList   : Topic[]  = null;
    suserList   : Suser[]  = null;


    constructor(values: Object = {}){
        Object.assign(this,values)
    }
}