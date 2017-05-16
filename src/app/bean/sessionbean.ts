import { TopicPager } from '../model/topicpager';
import { Topic } from '../model/topic';
import { Channel }                 from '../model/channel';

/**
 * All session variables over shared service
 */
export class SessionBean {

    channels: Channel[] = new Array<Channel>();
    topicsType: String;
    topicsTypeDescription: String;
    topicsCurrentPage: TopicPager = new TopicPager();
    currentTopic: Topic = new Topic();
    errorMessage: String;

    clientWidth: number = 0;
    renderTopicList: boolean = true;
    showLoadingDiv: boolean = false;
    asyncJobWorking: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }

    changeAsyncJobStatus(pStatus: boolean){
        this.showLoadingDiv = pStatus;
        this.asyncJobWorking = pStatus;
        console.log('changeAsyncJobStatus:' + pStatus);
    }

    changeLoadingStatusFromNavigationLifeCycle(pStatus: boolean){
        if(!this.asyncJobWorking){
            console.log('changeLoadingStatusFromNavigationLifeCycle:' + pStatus);
            this.showLoadingDiv = pStatus;
        }
    }

    get loading(){
        return this.showLoadingDiv;
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
