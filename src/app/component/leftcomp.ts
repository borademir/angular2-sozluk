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
    if(this.route.snapshot.data['type']){
        if(this.route.snapshot.data['type'] == 'classic'){
          this.eksiciSharedService.loadTopicsAsync(this.route.snapshot.data['href'], this.route.snapshot.data['title']);
        }else if(this.route.snapshot.data['type'] == 'history'){
          this.eksiciSharedService.loadTopicsAsync(
            this.route.snapshot.data['href'] + this.route.snapshot.params['year'], 
            this.route.snapshot.data['title'] + '(' + this.route.snapshot.params['year'] + ')'
            );
        }
        
    }else{
      this.eksiciSharedService.loadTopicsAsync('topic/today','bugün');
    }
    
    
  }

  openTopicEntries(pHref: String) {
    console.log(pHref + ' clicked..');
    this.eksiciSharedService.loadTopicEntriesAsync(pHref);
  }


}
