import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { EksiciService } from '../service/eksici-http-service';
import { EksiSharedService } from '../service/eksi-shared.service';
import { Channel }                 from '../model/channel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-topiclist',
  templateUrl: '../view/topiclist.html',
  providers: [EksiciService]
})
export class TopicListComponent {

  
  errorMessage: String;

  constructor(
    private eksiciService: EksiciService,
    private eksiciSharedService : EksiSharedService) {
  }


  ngOnInit(): void {
  }



}
