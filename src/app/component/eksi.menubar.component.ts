import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoDataService } from '../service/todo-data.service';
import { EksiciService } from '../service/eksici.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'eksi-menubar',
  templateUrl: '../view/menubar.html',
  providers: [EksiciService]
})
export class EksiMenuBarComponent {

  channels: Object[];
  errorMessage: String;
  isDataAvailable:boolean = false;

  constructor(private eksiciService: EksiciService) {
  }

  ngOnInit(): void {
    console.log('init calisti');
    this.eksiciService.getChannels().subscribe(
       data  => this.channels = data,
       error => this.errorMessage = <any>error,
       function() { 

         console.log("the subscription is completed");
         this.isDataAvailable = true;
        }
    );
  }

}
