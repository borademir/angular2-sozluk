import { Entry    } from './entry'
import { PageInfo } from './page'

export class Topic {

    href                : string     = '';
    creationDate        : number     = 0 ;
    topicText           : string     = '';
    relatedEntryCount   : number     = 0 ;
    type                : string     = '';
    entryList           : Entry[]    = null;
    nextPageHref        : string     = '';
    pageList            : PageInfo[] = null;
    currentEntryPage    : number     = 0;
    suggestedTopicList  : Topic[]    = null;
    errorText           : string     = null;
    niceAllHref         : string     = null;
    niceTodayHref       : string     = null;

    constructor(values: Object = {}){
        Object.assign(this,values)
    }
}