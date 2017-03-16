import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';

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
    if (!this.eksiciSharedService.sessionbean.topicsType) {
      this.eksiciSharedService.sessionbean.topicsType = 'bugün';
    }
    this.eksiciSharedService.loadTopicsAsync('topic/today','Bugün');
  }

  openTopic(pTopicHref: string) {
    console.log(pTopicHref + ' clicked..')
  }


}
