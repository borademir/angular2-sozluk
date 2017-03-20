import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';
import {Topic} from '../model/topic';
import { EksiSharedService } from '../service/eksi-shared.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-leftside',
  templateUrl: '../view/leftside.html',
  styleUrls: ['../view/style/left.css'],
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
  }

  ngOnInit(): void {
    this.sub = this.route.params
       .subscribe(params => {
          if(params != null){
            if(params['channelname'] != null ){
              console.log('channelname:' + params['channelname']);
              this.navigateToChannel(params['channelname']);
            }

            if(params['topicHref'] != null ){
              this.openTopicEntries(params['topicHref']);
            }
          }

      });
      
    if(this.route.snapshot.data['type']){
        if(this.route.snapshot.data['type'] == 'classic'){
          this.eksiciSharedService.loadTopicsAsync(this.route.snapshot.data['href'], this.route.snapshot.data['title']);
        }else if(this.route.snapshot.data['type'] == 'history'){
          this.eksiciSharedService.loadTopicsAsync(
            this.route.snapshot.data['href'] + this.route.snapshot.params['year'], 
            this.route.snapshot.data['title'] + '(' + this.route.snapshot.params['year'] + ')'
            );
        }else if(this.route.snapshot.data['type'] == 'channel'){
          this.navigateToChannel(this.route.snapshot.params['channelname']);
        }else if(this.route.snapshot.data['type'] == 'entry'){
          this.openTopicEntries(this.route.snapshot.params['topicHref']);
          
        }        
    }else{
      this.eksiciSharedService.loadTopicsAsync('topic/today','bugün');
    }
    
    
  }

  navigateToChannel(pChannelName: String){
      let targetChannel = this.eksiciSharedService.getChannelInfoByName(pChannelName);
      console.log('targtet channel:' + targetChannel);
      if(targetChannel != null){
        this.eksiciSharedService.loadTopicsAsync('channels/topics?topicsHref=' + targetChannel.href,targetChannel.name);
      }
  }

  openTopicEntries(pHref: String) {
    console.log(pHref + ' clicked..');
    this.eksiciSharedService.loadTopicEntriesAsync(pHref);
  }


  getEntryRouterLink(pTopicHref: String){
   let routerLink = "topic/entries/"+pTopicHref;
   return routerLink;
  }

}
