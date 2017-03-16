import { Component,OnInit } from '@angular/core';
import { Todo } from '../model/todo';


@Component({
  selector: 'app-root',
  templateUrl: '../view/root.html',
  providers: [
    
  ]
})
export class AppComponent implements OnInit {

  errorMessage: string;

    ngOnInit(): void {
     console.log('init calisti');
    }

  title = 'app works!';

  newTodo: Todo = new Todo();

  constructor(){ }
}
