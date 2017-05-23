import {EksiBaseModel} from '../model/eksibase';
import {Suser}         from '../model/suser';

export class LoginSuser extends EksiBaseModel {
    
    sozlukToken     : string  = null;
    suserInfo       : Suser   = new Suser() ;

    constructor(values: Object = {}){
        super();
        Object.assign(this,values);
    }


}
