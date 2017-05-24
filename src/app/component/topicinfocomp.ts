import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';
import {Topic} from '../model/topic';
import { EksiSharedService } from '../service/eksi-shared.service';
import { Router, ActivatedRoute, Params, Data , NavigationEnd , Event as RouterEvent, NavigationStart,NavigationCancel, NavigationError } from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-topicinfo',
  templateUrl: '../view/topicinfo.html',
  //styleUrls: ['../view/style/left.css'],
  providers: []
})
export class TopicInfoComponent {
  
  private sub: Subscription;
  
  constructor(
    private eksiciSharedService : EksiSharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log(route);
    router.events.subscribe((event: RouterEvent) => {
        if(event.url.indexOf('topic/entries') < 0){
          console.log('event.url from leftside:' + event.url);
          this.eksiciSharedService.sessionbean.lastTopicTypeUrl = event.url;
        }
        if(event.url.indexOf('/entry/') >= 0){
          this.eksiciSharedService.isCollapsed=true;
        }
        this.navigationInterceptor(event);
    });
  }

  ngOnDestroy() {
     this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        this.eksiciSharedService.sessionbean.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        console.log('scrolling to top width client width :' + this.eksiciSharedService.sessionbean.clientWidth);
        //this.eksiciSharedService.sessionbean.topicsTypeDescription = 'w:' + this.eksiciSharedService.sessionbean.clientWidth;
        document.body.scrollTop = 0;
    });
    this.sub = this.route.params
       .subscribe(params => {
          if(params != null){
            if(params['channelname'] != null ){
              console.log('channelname:' + params['channelname']);
              this.navigateToChannel(params['channelname']);
            }

            if(params['topicHref'] != null ){
              console.log('topicHref:' + params['topicHref']);
              this.openTopicEntries(params['topicHref']);
            }
          }
      });

    this.sub = this.route.queryParams
       .subscribe(queryParams => {
          if(queryParams != null){
            if(queryParams['q'] != null ){
              console.log('see:' + queryParams['q']);
              this.openTopicEntries('?q=' + queryParams['q']);
            }
          }
      });
      
    if(this.route.snapshot.data['type']){
        if(this.route.snapshot.data['type'] == 'classic'){
          this.eksiciSharedService.loadTopicsAsync(this.route.snapshot.data['href'], this.route.snapshot.data['title']);
          console.log('false1');
          this.eksiciSharedService.isCollapsed=false;
        }else if(this.route.snapshot.data['type'] == 'history'){
          this.eksiciSharedService.loadTopicsAsync(
            this.route.snapshot.data['href'] + this.route.snapshot.params['year'], 
            this.route.snapshot.data['title'] + '(' + this.route.snapshot.params['year'] + ')'
            );
            console.log('false2');
            this.eksiciSharedService.isCollapsed=false;
        }else if(this.route.snapshot.data['type'] == 'channel'){
          this.navigateToChannel(this.route.snapshot.params['channelname']);
        }else if(this.route.snapshot.data['type'] == 'topic'){
          this.openTopicEntries(this.route.snapshot.params['topicHref']);
        }else if(this.route.snapshot.data['type'] == 'entry'){
          this.openEntry(this.route.snapshot.params['entryId']);
        }else if(this.route.snapshot.data['type'] == 'see'){
          console.log('typ see:' + this.route.snapshot.queryParams['q']);
        }         
    }else{
      console.log('else executed');
      this.eksiciSharedService.loadTopicsAsync('topic/today','bugün');
    }
    
    this.eksiciSharedService.loadPageDefaults();
    
  }

  navigateToChannel(pChannelName: String){
      let targetChannel = this.eksiciSharedService.getChannelInfoByName(pChannelName);
      console.log('targtet channel:' + targetChannel);
      if(targetChannel != null){
        this.eksiciSharedService.loadTopicsAsync('channels/topics?topicsHref=' + targetChannel.href,targetChannel.name);
      }
      this.eksiciSharedService.isCollapsed=false;
  }

  openTopicEntries(pHref: String) {
    console.log(pHref + ' true1..');
    this.eksiciSharedService.loadTopicEntriesAsync(pHref);
    this.eksiciSharedService.isCollapsed=true;
  }

  openEntry(pEntryId: String) {
    console.log(pEntryId + ' true2..');
    this.eksiciSharedService.loadEntry(pEntryId);
    this.eksiciSharedService.isCollapsed=true;
  }

    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            console.log('loading true');
            this.eksiciSharedService.changeLoadingStatusFromNavigationLifeCycle(true);
            this.eksiciSharedService.showWaitingDialog();
        }
        if (event instanceof NavigationEnd) {
            this.eksiciSharedService.changeLoadingStatusFromNavigationLifeCycle(false);
            this.eksiciSharedService.hideWaitingDialog();
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.eksiciSharedService.changeLoadingStatusFromNavigationLifeCycle(false);
            this.eksiciSharedService.hideWaitingDialog();
        }
        if (event instanceof NavigationError) {
            this.eksiciSharedService.changeLoadingStatusFromNavigationLifeCycle(false);
            this.eksiciSharedService.hideWaitingDialog();
        }
    }

  refresh(event) {
     console.log('sacma sapan click');
     location.reload();
  }

}
