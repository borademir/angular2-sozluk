import { Component,OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoDataService } from '../service/todo-data.service';


@Component({
  selector: 'app-root',
  templateUrl: '../view/root.html',
  styleUrls: [ '../view/style/app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent implements OnInit {

  errorMessage: string;

    ngOnInit(): void {
     console.log('init calisti');
    }

  title = 'app works!';

  newTodo: Todo = new Todo();

  constructor(
    private todoDataService : TodoDataService
  ){ }

  addTodo(){
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo){
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo){
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos(){
    return this.todoDataService.getAllTodos();
  }
}
