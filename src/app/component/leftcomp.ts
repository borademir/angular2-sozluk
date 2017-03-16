import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';
import {Topic} from '../model/topic';
import { EksiSharedService } from '../service/eksi-shared.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-leftside',
  templateUrl: '../view/leftside.html',
  styleUrls: ['../view/style/left.css'],
  providers: []
})
export class EksiLeftsideComponent {
  
  constructor(private eksiciSharedService : EksiSharedService) {}

  ngOnInit(): void {
    this.eksiciSharedService.loadTopicsAsync('topic/today','bugün');
  }

  openTopicEntries(pTopic: Topic) {
    console.log(pTopic.href + ' clicked..');
    this.eksiciSharedService.loadTopicEntriesAsync(pTopic);
  }


}
