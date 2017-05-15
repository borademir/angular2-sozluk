import { TopicPager } from '../model/topicpager';
import { Topic } from '../model/topic';
import { Channel }                 from '../model/channel';

/**
 * All session variables over shared service
 */
export class SessionBean {

    channels: Channel[];
    topicsType: String;
    topicsTypeDescription: String;
    topicsCurrentPage: TopicPager = new TopicPager();
    currentTopic: Topic = new Topic();
    errorMessage: String;

    clientWidth: number = 0;
    renderTopicList: boolean = true;
    loading: boolean = true;

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }

    get channelOffset(){
        if(this.mobile){
            return 0;
        }
        return 10;
    }

    get pagingOffset(){
        if(this.mobile){
            return 4;
        }
        return 15;
    }

    get mobile(){
        return this.clientWidth<800;
    }
    
}
