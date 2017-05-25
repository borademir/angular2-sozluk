import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { EksiciService } from '../service/eksici-http-service';
import { EksiSharedService } from '../service/eksi-shared.service';
import { Channel }                 from '../model/channel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-menubar',
  templateUrl: '../view/menubar.html',
  providers: []
})
export class EksiMenuBarComponent {

  
  errorMessage: String;

  constructor(
    private eksiciService: EksiciService,
    private eksiciSharedService : EksiSharedService) {
  }

  loadChannels() {
    console.log('loading channels');
    this.eksiciService.getChannels().subscribe(
      data => this.eksiciSharedService.sessionbean.channels = data,
      error => this.errorMessage = <any>error,
      () => {
        console.log("the subscription is completed and channels loaded..");
      }

    );
  }


  getChannellRouterLink(pChannel: Channel){
   let routerLink = "channels/"+pChannel.name.substring(1)+"/topics";
   //console.log(pChannel.name + ' rouerLink:' + routerLink);
   return routerLink;
  }

  ngOnInit(): void {

    this.loadChannels();

  }

}
