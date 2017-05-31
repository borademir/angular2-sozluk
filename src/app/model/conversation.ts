import {EksiBaseModel} from '../model/eksibase';
import {Suser}         from '../model/suser';

export class Conversation  {
    
    id           : string  = null;
    title        : string  = null;
    summary      : string  = null;
    time         : string  = null;
    threadId     : string  = null;
    href         : string  = null;

    constructor(values: Object = {}){
        Object.assign(this,values);
    }


    get summarySubs(): String {
        if(this.summary != null){
            if(this.summary.length)
        }
        return "";
    }

}
