
import { Suser } from './suser'

export class Entry {

    href                : string  = '';
    creationDate        : number  = 0 ;
    entryId             : number  = 0 ;
    favoriteCount       : number  = 0 ;
    entryText           : string  = '';
    entryHtml           : string  = '';
    entryDate           : string  = '';
    Suser               : Suser   = null;


    constructor(values: Object = {}){
        Object.assign(this,values)
    }
}