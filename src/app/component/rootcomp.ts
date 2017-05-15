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
        console.log('client width is smaller than 800');
      }
  }

    ngOnInit(): void {
     console.log('init calisti');
    }

  title = 'app works!';


}
