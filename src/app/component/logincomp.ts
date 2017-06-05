import { Component, OnInit } from '@angular/core';
import { TopicPager } from '../model/topicpager';
import { Topic } from '../model/topic';
import { LoginSuser } from '../model/loginsuser';
import { EksiSharedService } from '../service/eksi-shared.service';
import { Router, ActivatedRoute, Params, Data , NavigationEnd , Event as RouterEvent, NavigationStart,NavigationCancel, NavigationError } from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';
import { EksiciService }            from '../service/eksici-http-service';
import { SessionManagementService } from '../service/session-management.service';
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
  errorMessage: String = '';
  
  constructor(
    private eksiciSharedService : EksiSharedService,
    private eksiciService: EksiciService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionManagementService: SessionManagementService
  ) {

  }

  ngOnInit(): void {
    this.eksiciSharedService.isCollapsed=true;
    this.eksiciSharedService.loadPageDefaults();
    console.log('login comp initialized..');
    
  }

  onSubmit() { 
    this.submitted = true; 
    this.login(this.email,this.password);
  }


  login(pEmail: String, pPassword: String) {
    console.log('loading login');
    this.eksiciSharedService.changeAsyncJobStatus(true);
    this.eksiciService.login(pEmail,pPassword).subscribe(
      data => this.eksiciSharedService.sessionbean.loginSuser = data,
      error => {
        this.eksiciSharedService.changeAsyncJobStatus(false);
        this.errorMessage = error;
        
      } ,
      () => {
        console.log("the subscription is completed login." + this.eksiciSharedService.sessionbean.loginSuser.sozlukToken);
        
        this.eksiciSharedService.changeAsyncJobStatus(false);
        if(this.eksiciSharedService.sessionbean.loginSuser.sozlukToken != null){
          this.sessionManagementService.addSozlukToken(this.eksiciSharedService.sessionbean.loginSuser.sozlukToken);
          this.router.navigate([this.eksiciSharedService.getSuserRouterLink(this.eksiciSharedService.sessionbean.loginSuser.suserInfo.nick)]);
        }else{
          console.log('giris basarisiz..');
        }
      }

    );
  }

}
