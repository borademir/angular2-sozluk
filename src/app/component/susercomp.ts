import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';
import {Topic} from '../model/topic';
import { EksiSharedService } from '../service/eksi-shared.service';
import { Router, ActivatedRoute, Params, Data , NavigationEnd , Event as RouterEvent, NavigationStart,NavigationCancel, NavigationError } from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-suser',
  templateUrl: '../view/suser.html',
  providers: []
})
export class SuserComponent {
  
  private sub: Subscription;
  
  constructor(
    private eksiciSharedService : EksiSharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnDestroy() {
     //this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        this.eksiciSharedService.sessionbean.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        console.log('scrolling to top width from susercomp client width :' + this.eksiciSharedService.sessionbean.clientWidth);
        document.body.scrollTop = 0;
    });
    
    this.sub = this.route.params
       .subscribe(params => {
          if(params != null){
            if(params['suserNick'] != null ){
              let suserNick = params['suserNick'];
              this.eksiciSharedService.loadSuser(suserNick);
              console.log('suser page:' + suserNick);
              this.eksiciSharedService.isCollapsed=false;
            }


          }
      });

this.route.snapshot.params['entryId']
      
      
    /*if(this.route.snapshot.data['type']){
        if(this.route.snapshot.data['type'] == 'suser'){
          let suserNick = this.route.snapshot.data['suserNick'];
          this.eksiciSharedService.loadSuser(suserNick);
          console.log('suser page:' + suserNick);
          this.eksiciSharedService.isCollapsed=false;
        }      
    }
    */
    this.eksiciSharedService.loadPageDefaults();
    
  }

}
