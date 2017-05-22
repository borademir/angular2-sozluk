import {Topic} from '../model/topic';


export class TopicPager {

    href            : string  = '';
    nextPageHre     : string  = '';
    creationDate    : number  = 0 ;
    currentPage     : number  = 0 ;
    contentList     : Topic[] = null;
    description     : String  = null;

    constructor(values: Object = {}){
        Object.assign(this,values)
    }
}