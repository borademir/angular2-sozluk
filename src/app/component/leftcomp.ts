import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';
import {Topic} from '../model/topic';
import { EksiSharedService } from '../service/eksi-shared.service';
import { Router, ActivatedRoute, Params, Data , NavigationEnd , Event as RouterEvent, NavigationStart,NavigationCancel, NavigationError } from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-leftside',
  templateUrl: '../view/leftside.html',
  //styleUrls: ['../view/style/left.css'],
  providers: []
})
export class EksiLeftsideComponent {
  
  private sub: Subscription;
  
  constructor(
    private eksiciSharedService : EksiSharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log(route);
    router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
    });
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
          this.eksiciSharedService.isCollapsed=false;
        }else if(this.route.snapshot.data['type'] == 'history'){
          this.eksiciSharedService.loadTopicsAsync(
            this.route.snapshot.data['href'] + this.route.snapshot.params['year'], 
            this.route.snapshot.data['title'] + '(' + this.route.snapshot.params['year'] + ')'
            );
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
    
    if(this.eksiciSharedService.sessionbean.topicsCurrentPage.contentList == null){
      console.log('left defaults');
      this.eksiciSharedService.loadTopicsAsync('topic/today','bugün');
    }

    if(this.eksiciSharedService.sessionbean.currentTopic == null || this.eksiciSharedService.sessionbean.currentTopic.entryList == null){
       console.log('current topic is null..');
      this.eksiciSharedService.isCollapsed = false;
    }
    
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
    console.log(pHref + ' clicked..');
    this.eksiciSharedService.loadTopicEntriesAsync(pHref);
    this.eksiciSharedService.isCollapsed=true;
  }

  openEntry(pEntryId: String) {
    console.log(pEntryId + ' clicked..');
    this.eksiciSharedService.loadEntry(pEntryId);
    this.eksiciSharedService.isCollapsed=true;
  }

    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            console.log('loading true');
            this.eksiciSharedService.sessionbean.loading = true;
            document.getElementById('waitingDialogOpenerButton').click();
        }
        if (event instanceof NavigationEnd) {
            console.log('loading false');
            this.eksiciSharedService.sessionbean.loading = false;
            document.getElementById('waitingDialogCloserButton').click();
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            console.log('loading false');
            this.eksiciSharedService.sessionbean.loading = false;
            document.getElementById('waitingDialogCloserButton').click();
        }
        if (event instanceof NavigationError) {
            console.log('loading false');
            this.eksiciSharedService.sessionbean.loading = false;
            document.getElementById('waitingDialogCloserButton').click();
        }
    }

  refresh(event) {
     console.log('sacma sapan click');
     location.reload();
  }

}
