import { Injectable } from '@angular/core';
import { SessionBean } from '../bean/sessionbean';
import { Subject }    from 'rxjs/Subject';
import { EksiciService } from '../service/eksici-http-service';
import { Topic } from '../model/topic';
import { Channel }                 from '../model/channel';

@Injectable()
export class EksiSharedService {

  sessionbean: SessionBean = new SessionBean();
  public isCollapsed: boolean = false;

  constructor(
    private eksiciService: EksiciService,
  ) {
    console.log('shared service constructed..');
  }

  loadPageDefaults(){
    if(this.sessionbean.topicsCurrentPage.contentList == null){
      console.log('left defaults');
      this.loadTopicsAsync('topic/today','bugün');
    }

    if(this.sessionbean.currentTopic == null || this.sessionbean.currentTopic.entryList == null){
       
      this.isCollapsed = false;
    }
  }

  loadTopicsAsync(ptopicsType: String, pTopicsTypeDescription: String) {
    //this.sessionbean.lastTopicTypeUrl = ptopicsType;
    console.log('loading topics');
    this.sessionbean.changeAsyncJobStatus(true);
    this.eksiciService.getTopics(ptopicsType).subscribe(
      data => this.sessionbean.topicsCurrentPage = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed topics loaded..");
        this.sessionbean.topicsTypeDescription = pTopicsTypeDescription;
        this.sessionbean.changeAsyncJobStatus(false);
      }

    );
  }

/**
 * 
 * http://www.eksici.com/api/v1/topics/entries?topicsHref=
 */
  loadTopicEntriesAsync(pHref: String) {
    console.log('loading topic entries')
    this.sessionbean.changeAsyncJobStatus(true);
    this.eksiciService.getTopicEntries(pHref).subscribe(
      data => this.sessionbean.currentTopic = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed and current topic loaded..");
        this.sessionbean.currentTopic.pageNumberlist = Array(this.sessionbean.currentTopic.totalEntryPage);
        for(let i=0;i<this.sessionbean.currentTopic.totalEntryPage;i++){
          this.sessionbean.currentTopic.pageNumberlist[i] = i+1;
        }
        
        if(this.sessionbean.currentTopic.focusTo != null){
          document.getElementById(this.sessionbean.currentTopic.focusTo).scrollIntoView();
        }
        console.log('scrolling..and true');
        this.isCollapsed = true;
        this.sessionbean.changeAsyncJobStatus(false);
      }

    );
  }

  loadEntry(pEntryId: String) {
    console.log('loading entry');
    this.sessionbean.changeAsyncJobStatus(true);
    this.eksiciService.getEntry(pEntryId).subscribe(
      data => this.sessionbean.currentTopic = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed and entry loaded..");
        this.sessionbean.changeAsyncJobStatus(false);
      }

    );
  }
  getChannelInfoByName(pChannelName: String): Channel {
    for(let i = 0; i < this.sessionbean.channels.length; ++i) {
      let current = this.sessionbean.channels[i];  
      if(('#' + pChannelName) == current.name) {
        return current;
      }
    }
    return null;
  }


  loadSuser(pSuserNick: String) {
    console.log('loading suser');
    this.sessionbean.changeAsyncJobStatus(true);
    this.eksiciService.getSuser(pSuserNick).subscribe(
      data => this.sessionbean.suser = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed and suser loaded.." + this.sessionbean.suser.nick);
        this.sessionbean.changeAsyncJobStatus(false);
      }

    );
  }

  getEntryRouterLink(pTopicHref: String){
   let routerLink = "/topic/entries/"+pTopicHref;
   return routerLink;
  }  

  getEntryRouterLinkFromTemplate(pTopic: Topic , pPageNumber: number){
   let routerLink = "/topic/entries/"+pTopic.pagingHrefTemplate + pPageNumber;
   return routerLink;
  }

  getEntryIdRouterLink(pEntryId: number){
   let routerLink = "/entry/"+pEntryId;
   return routerLink;
  } 


  getSuserRouterLink(pSuserNick: String){
    return "/suser/"+pSuserNick.split(' ').join('-');;
  }

  get timeInMiliseconds(){
    var date = new Date();
    return date.getTime();
  }

}