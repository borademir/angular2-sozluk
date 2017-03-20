import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { EksiciService } from '../service/eksici-http-service';
import { EksiSharedService } from '../service/eksi-shared.service';
import { Channel }                 from '../model/channel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-menubar',
  templateUrl: '../view/menubar.html',
  providers: [EksiciService]
})
export class EksiMenuBarComponent {

  
  errorMessage: String;

  constructor(
    private eksiciService: EksiciService,
    private eksiciSharedService : EksiSharedService) {
  }

  loadChannels() {
    console.log('loading channels');
    this.eksiciService.getChannels().subscribe(
      data => this.eksiciSharedService.sessionbean.channels = data,
      error => this.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed " + this.eksiciSharedService.sessionbean.channels[0]+ " channels loaded..");
      }

    );
  }

  openTodaysTopicList(){
    console.log('today topic clicked');
    this.eksiciSharedService.sessionbean.topicsType = 'bugün';
    this.eksiciSharedService.loadTopicsAsync('topic/today','bugün');
  }

  openTodayInHistoryTopicList(){
    console.log('today topic clicked');
    this.eksiciSharedService.sessionbean.topicsType = 'bugün';
    this.eksiciSharedService.loadTopicsAsync('topic/todayinhistory/2002','tarihte bugün');
  }

  openVideoTopicList(){
    console.log('video topic clicked');
    this.eksiciSharedService.sessionbean.topicsType = 'bugün';
    this.eksiciSharedService.loadTopicsAsync('topic/videos','videolar');
  }
  



  openPopularTopicList(){
    console.log('popular topic clicked');
    this.eksiciSharedService.sessionbean.topicsType = 'gündem';
    this.eksiciSharedService.loadTopicsAsync('topic/popular','gündem');
  }

  openChannelTopicList(pChannel: Channel){
    console.log(pChannel.name + ' clicked');
    this.eksiciSharedService.loadTopicsAsync('channels/topics?topicsHref=' + pChannel.href,pChannel.name);
  }

  openDesertedTopicList(){
    console.log('başıboşlar clicked');
    this.eksiciSharedService.loadTopicsAsync('topic/deserted','başıboşlar');
  }

  ngOnInit(): void {

    this.loadChannels();

  }

}
