import { Entry }      from '../model/entry';
import { TopicPager } from '../model/topicpager';

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
    currentEntryStats      : TopicPager = null;
    activeTabIndex         : number = 1;

    constructor(values: Object = {}){
        Object.assign(this,values)
    }
}
