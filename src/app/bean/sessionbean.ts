import { TopicPager } from '../model/topicpager';


/**
 * All session variables over shared service
 */
export class SessionBean {

    topicsType: String;
    topicsTypeDescription: String;
    topicsCurrentPage: TopicPager = new TopicPager();
    errorMessage: String;

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
