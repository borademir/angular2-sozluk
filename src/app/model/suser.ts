import { Entry } from '../model/entry';

export class Suser {
    nick                   : String = null;
    suserId                : String = null;
    href                   : String = null;
    topicHref              : String = null;
    errorMessage           : String = null;
    profileIntroEntry      : Entry = null;
    totalEntryCount        : String = null;
    lastMonthEntryCount    : String = null;
    lastWeekEntryCount     : String = null;
    todayEntryCount        : String = null;
    lastEntryTime          : String = null;

    constructor(values: Object = {}){
        Object.assign(this,values)
    }
}
