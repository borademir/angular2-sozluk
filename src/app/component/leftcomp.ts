import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';
import { TodoDataService } from '../service/todo-data.service';
import { EksiciService } from '../service/eksici-http-service';
import { EksiSharedService } from '../service/eksi-shared.service';
import { Topic } from '../model/topic';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-leftside',
  templateUrl: '../view/leftside.html',
  styleUrls: ['../view/style/left.css'],
  providers: [EksiciService]
})
export class EksiLeftsideComponent {

  topics: Topic[] = [];
  errorMessage: String;
  isDataAvailable: boolean = false;

  constructor(
    private eksiciService: EksiciService,
    private eksiciSharedService : EksiSharedService) {}

  loadTopics() {
    console.log('loading topics');
    this.eksiciService.getTopics(this.eksiciSharedService.sessionbean.topicsType).subscribe(
      data => this.topics = data,
      error => this.errorMessage = <any>error,
      () => {
        this.isDataAvailable = true;
        console.log(this.isDataAvailable + " info..");
        console.log("the subscription is completed " + this.topics + " topics loaded..");
      }

    );
  }

  openTopic(pTopicHref: string) {
    console.log(pTopicHref + ' clicked..')
  }

  ngOnInit(): void {
    if (!this.eksiciSharedService.sessionbean.topicsType) {
      this.eksiciSharedService.sessionbean.topicsType = 'today';
    }
    this.loadTopics();

  }

  get topicsTypeDescription() {
    return this.eksiciSharedService.sessionbean.topicsType;
  }

}
