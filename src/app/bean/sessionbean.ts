import { TopicPager } from '../model/topicpager';
import { Topic } from '../model/topic';

/**
 * All session variables over shared service
 */
export class SessionBean {

    topicsType: String;
    topicsTypeDescription: String;
    topicsCurrentPage: TopicPager = new TopicPager();
    currentTopic: Topic = new Topic();
    errorMessage: String;

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
