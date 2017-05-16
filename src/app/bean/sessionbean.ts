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

    lastTopicTypeUrl: String = '';

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
        let offset = this.mobile ? 4 : 15;
        /*console.log('offset:' + offset);
        let overflow = 0;
        if(this.currentTopic != null && this.currentTopic.currentEntryPage > 0){
            let current = this.currentTopic.currentEntryPage;
            let total = this.currentTopic.totalEntryPage;
            console.log('total:' + total);
            console.log('current:' + current);
            if(total-current > offset){
                overflow = total-current-offset;
            }
            if(current-total > offset){
                overflow = current-total-offset;
            }
            console.log('current:' + current);
        }
        return offset+overflow;
        */
        return offset;
    }

    get mobile(){
        return this.clientWidth<800;
    }
    
}
