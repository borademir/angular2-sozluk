import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoDataService } from '../service/todo-data.service';
import { EksiciService } from '../service/eksici.service';
import { Channel }                 from '../model/channel';

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

  constructor(private eksiciService: EksiciService) {
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
  }

  openPopularTopicList(){
    console.log('popular topic clicked');
  }

  openChannelTopicList(pChannel: Channel){
    console.log(pChannel.name + ' clicked');
  }

  ngOnInit(): void {

    this.loadChannels();

  }

}
