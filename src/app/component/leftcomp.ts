import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';
import { EksiciService } from '../service/eksici-http-service';
import { EksiSharedService } from '../service/eksi-shared.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-leftside',
  templateUrl: '../view/leftside.html',
  styleUrls: ['../view/style/left.css'],
  providers: [EksiciService]
})
export class EksiLeftsideComponent {



  constructor(
    private eksiciService: EksiciService,
    private eksiciSharedService : EksiSharedService) {}

  loadTopics(ptopicsType: string) {
    console.log('loading topics');
    this.eksiciService.getTopics(ptopicsType).subscribe(
      data => this.eksiciSharedService.sessionbean.topicsCurrentPage = data,
      error => this.eksiciSharedService.sessionbean.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed " + this.eksiciSharedService.sessionbean.topicsCurrentPage.contentList + " topics loaded..");
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
    this.loadTopics('today');

  }

  get topicsTypeDescription() {
    return this.eksiciSharedService.sessionbean.topicsType;
  }

  get topicsCurrentPage(){
    return this.eksiciSharedService.sessionbean.topicsCurrentPage;
  }

}
