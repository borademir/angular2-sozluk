import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { EksiciService } from '../service/eksici-http-service';
import { Channel }                 from '../model/channel';
import { EksiSharedService } from '../service/eksi-shared.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-menubar',
  templateUrl: '../view/menubar.html',
  providers: [EksiciService]
})
export class EksiMenuBarComponent {

  channels: Channel[];
  errorMessage: String;
  isDataAvailable: boolean = false;

  constructor(
    private eksiciService: EksiciService,
    private eksiciSharedService : EksiSharedService) {
  }

  loadChannels() {
    console.log('loading channels');
    this.eksiciService.getChannels().subscribe(
      data => this.channels = data,
      error => this.errorMessage = <any>error,
      () => {
        this.isDataAvailable = true;
        console.log(this.isDataAvailable + " info..");
        console.log("the subscription is completed " + this.channels[0]+ " channels loaded..");
      }

    );
  }

  openTodaysTopicList(){
    console.log('today topic clicked');
    this.eksiciSharedService.sessionbean.topicsType = 'bugün';
  }

  openPopularTopicList(){
    console.log('popular topic clicked');
    this.eksiciSharedService.sessionbean.topicsType = 'gündem';
  }

  openChannelTopicList(pChannel: Channel){
    console.log(pChannel.name + ' clicked');
    this.eksiciSharedService.sessionbean.topicsType = pChannel.name;
  }

  ngOnInit(): void {

    this.loadChannels();

  }

}
