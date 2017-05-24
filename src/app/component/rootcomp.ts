import { Component,OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { EksiSharedService } from '../service/eksi-shared.service';

@Component({
  selector: 'app-root',
  templateUrl: '../view/root.html',
  providers: [
    
  ]
})
export class AppComponent implements OnInit {

  errorMessage: string;
  constructor(
    private eksiciSharedService : EksiSharedService) {
      if(this.eksiciSharedService.sessionbean.mobile){
        this.eksiciSharedService.isCollapsed = true;
      }
  }

    ngOnInit(): void {
     console.log('AppComponent.ngOnIniti');
    }

  title = 'app works!';


}
