import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';
import { TodoDataService } from '../service/todo-data.service';
import { EksiciService } from '../service/eksici.service';
import {Topic} from '../model/topic';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-leftside',
  templateUrl: '../view/leftside.html',
  styleUrls: [ '../view/style/left.css'],
  providers: [EksiciService]
})
export class EksiLeftsideComponent {

  topics: Topic[] = [];
  topicsType : string ;
  errorMessage: String;
  isDataAvailable: boolean = false;

  constructor(private eksiciService: EksiciService) {
  }

  loadTopics() {
    console.log('loading topics');
    this.eksiciService.getTopics(this.topicsType).subscribe(
      data => this.topics = data,
      error => this.errorMessage = <any>error,
      () => {
        this.isDataAvailable = true;
        console.log(this.isDataAvailable + " info..");
        console.log("the subscription is completed " + this.topics+ " topics loaded..");
      }

    );
  }

  ngOnInit(): void {
    if(!this.topicsType){
      this.topicsType = 'today';
    }
    this.loadTopics();

  }

  get topicsTypeDescription(){
    if(this.topicsType){
      if(this.topicsType === 'today'){
        return "bugün";
      }else if(this.topicsType == 'popular'){
        return "gündem";
      }
    }
  }

}
