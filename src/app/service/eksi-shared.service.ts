import { Injectable }               from '@angular/core';
import { SessionBean }              from '../bean/sessionbean';
import { Subject }                  from 'rxjs/Subject';
import { EksiciService }            from '../service/eksici-http-service';
import { SessionManagementService } from '../service/session-management.service';
import { Topic }                    from '../model/topic';
import { Channel }                  from '../model/channel';
import { LoginSuser }               from '../model/loginsuser';

import { Router, ActivatedRoute, Params, Data , NavigationEnd , Event as RouterEvent, NavigationStart,NavigationCancel, NavigationError } from '@angular/router';

@Injectable()
export class EksiSharedService {

  public sessionbean: SessionBean = new SessionBean();
  public isCollapsed: boolean = false;

  constructor(
    private eksiciService: EksiciService,
    private router: Router,
    private sessionManagementService: SessionManagementService
  ) {
    console.log('EksiSharedService constructor ');
  }

  loadPageDefaults(){
    if(this.sessionbean.topicsCurrentPage.contentList == null){
      this.loadTopicsAsync('topic/today','bugün');
    }

    if(this.sessionbean.currentTopic == null || this.sessionbean.currentTopic.entryList == null){
       
      this.isCollapsed = false;
    }
  }

  loadTopicsAsync(ptopicsType: String, pTopicsTypeDescription: String) {
    //this.sessionbean.lastTopicTypeUrl = ptopicsType;
    console.log('loading topics');
    this.changeAsyncJobStatus(true);
    this.eksiciService.getTopics(ptopicsType).subscribe(
      data => this.sessionbean.topicsCurrentPage = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed topics loaded..");
        this.sessionbean.topicsTypeDescription = pTopicsTypeDescription;
        this.changeAsyncJobStatus(false);
      }

    );
  }

  loadSuserEntryStats(pSuserNick: String , pEntryStatType: String, pActiveTabIndex: number) {    
    console.log('loading entry stats');
    this.changeAsyncJobStatus(true);
    this.eksiciService.getSuserEntryStats(pSuserNick,pEntryStatType).subscribe(
      data => this.sessionbean.suser.currentEntryStats = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed entry stats loaded..");
        this.changeAsyncJobStatus(false);
        this.sessionbean.suser.activeTabIndex = pActiveTabIndex;
      }

    );
  }

  hideWaitingDialog() {
    if(document.getElementById('waitingDialogCloserButton') != null){
      setTimeout(document.getElementById('waitingDialogCloserButton').click(),1000);
    }
  }

  showWaitingDialog() {
    if(document.getElementById('waitingDialogOpenerButton') != null){
      document.getElementById('waitingDialogOpenerButton').click();
    }
  }

    changeAsyncJobStatus(pStatus: boolean){
        if(pStatus){
          this.showWaitingDialog();
        }else{
          this.hideWaitingDialog();
        }
        this.sessionbean.asyncJobWorking = pStatus;        
    }

    changeLoadingStatusFromNavigationLifeCycle(pStatus: boolean){
        if(!this.sessionbean.asyncJobWorking){
          console.log('changeLoadingStatusFromNavigationLifeCycle:' + pStatus);
          if(pStatus){
            this.showWaitingDialog();
          }else{
            this.hideWaitingDialog();
          }
        }
    }

/**
 * 
 * http://www.eksici.com/api/v1/topics/entries?topicsHref=
 */
  loadTopicEntriesAsync(pHref: String) {
    console.log('loading topic entries')
    this.changeAsyncJobStatus(true);
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
        this.changeAsyncJobStatus(false);
      }

    );
  }

  loadEntry(pEntryId: String) {
    console.log('loading entry');
    this.changeAsyncJobStatus(true);
    this.eksiciService.getEntry(pEntryId).subscribe(
      data => this.sessionbean.currentTopic = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed and entry loaded..");
        this.changeAsyncJobStatus(false);
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
    this.changeAsyncJobStatus(true);
    this.eksiciService.getSuser(pSuserNick).subscribe(
      data => this.sessionbean.suser = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed and suser loaded.." + this.sessionbean.suser.nick);
        this.changeAsyncJobStatus(false);
        this.isCollapsed=true;
        this.loadSuserEntryStats(pSuserNick, "son-entryleri",1);
        console.log('suser entry stats:' + pSuserNick);
      }

    );
  }

  loadMessages() {
    console.log('loading messages');
    this.changeAsyncJobStatus(true);
    this.eksiciService.getMessages().subscribe(
      data => this.sessionbean.loginSuser = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed messages." + this.sessionbean.loginSuser.sozlukToken);
        
        this.changeAsyncJobStatus(false);
        if(this.sessionbean.loginSuser.sozlukToken != null){
          this.sessionManagementService.addSozlukToken(this.sessionbean.loginSuser.sozlukToken);
        }else{
          console.log('giris basarisiz..');
        }
      }

    );
  }

  logout() {
    this.showWaitingDialog();
    this.sessionManagementService.removeSozlukToken();
    this.sessionbean.loginSuser = new LoginSuser();
    this.hideWaitingDialog();
  }
  login(pEmail: String, pPassword: String) {
    console.log('loading login');
    this.changeAsyncJobStatus(true);
    this.eksiciService.login(pEmail,pPassword).subscribe(
      data => this.sessionbean.loginSuser = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed login." + this.sessionbean.loginSuser.sozlukToken);
        
        this.changeAsyncJobStatus(false);
        if(this.sessionbean.loginSuser.sozlukToken != null){
          this.sessionManagementService.addSozlukToken(this.sessionbean.loginSuser.sozlukToken);
          this.router.navigate([this.getSuserRouterLink(this.sessionbean.loginSuser.suserInfo.nick)]);
        }else{
          console.log('giris basarisiz..');
        }
      }

    );
  }

  loginWithToken(pToken) {
    console.log('loading login with token');
    this.changeAsyncJobStatus(true);
    this.eksiciService.loginWithToken(pToken).subscribe(
      data => this.sessionbean.loginSuser = data,
      error => this.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed auto login." + this.sessionbean.loginSuser.sozlukToken);
        
        this.changeAsyncJobStatus(false);
        if(this.sessionbean.loginSuser.sozlukToken != null){
          this.sessionManagementService.addSozlukToken(this.sessionbean.loginSuser.sozlukToken);
          console.log('auto token alindi:' + this.sessionManagementService.getSozlukToken());
        }else{
          console.log('auto giris basarisiz..');
          this.sessionManagementService.removeSozlukToken();
        }
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