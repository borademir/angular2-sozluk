import { TopicPager } from '../model/topicpager';
import { Topic }      from '../model/topic';
import { Channel }    from '../model/channel';
import { Suser }      from '../model/suser';
import { LoginSuser }      from '../model/loginsuser';

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
    asyncJobWorking: boolean = false;

    lastTopicTypeUrl: String = '';

    suser: Suser = null;
    loginSuser: LoginSuser = new LoginSuser();

    constructor() {
        console.log('SessionBean constructor');
    }

    get channelOffset(){
        if(this.clientWidth<1050 && this.clientWidth >=800){
            return 4;
        }else if(this.clientWidth<800){
            return 0;
        }
        return 7;
    }

    get userExists() {
        return this.loginSuser != null && this.loginSuser.sozlukToken != null && this.loginSuser.suserInfo != null && this.loginSuser.suserInfo.nick != null;
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
        return this.clientWidth<768;
    }
    
}
