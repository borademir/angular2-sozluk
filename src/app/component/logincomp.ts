import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';
import { Topic } from '../model/topic';
import { LoginSuser } from '../model/loginsuser';
import { EksiSharedService } from '../service/eksi-shared.service';
import { Router, ActivatedRoute, Params, Data , NavigationEnd , Event as RouterEvent, NavigationStart,NavigationCancel, NavigationError } from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-login',
  templateUrl: '../view/login.html',
  providers: []
})
export class LoginComponent {

  submitted = false;
  private sub: Subscription;
  loginBean : LoginSuser = new LoginSuser();
  email : String = ''; 
  password : String = '';
  
  constructor(
    private eksiciSharedService : EksiSharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.eksiciSharedService.loadPageDefaults();
    console.log('login comp initialized..');
    this.eksiciSharedService.isCollapsed=true;
  }

  onSubmit() { 
    this.submitted = true; 
    this.eksiciSharedService.login(this.email,this.password);
  }

}
