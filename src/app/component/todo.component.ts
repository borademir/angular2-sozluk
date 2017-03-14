import { Component } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoDataService } from '../service/todo-data.service';

@Component({
  selector: 'todo-list',
  templateUrl: '../view/todo.component.html',
  providers: [TodoDataService]
})
export class TodoComponent {
  title = 'app works!';

  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService){

  }

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
