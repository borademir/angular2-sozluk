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

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
