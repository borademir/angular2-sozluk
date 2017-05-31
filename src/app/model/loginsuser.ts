import {Conversation} from '../model/conversation';
import {Suser}         from '../model/suser';

export class LoginSuser  {
    
    sozlukToken         : string  = null;
    suserInfo           : Suser   = new Suser() ;
    conversationList    : Conversation[] = null;
    
    constructor(values: Object = {}){
        Object.assign(this,values);
    }


}
