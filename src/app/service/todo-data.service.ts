import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';

@Injectable()
export class TodoDataService {

  /**
   * service instance seviyesinde, session scope gibi sanirim , degisken store ediyoruz.
   */
  lastId: number = 0;

  todos: Todo[] = [];

  constructor() { }

  addTodo(pTodo: Todo): TodoDataService {
    if(!pTodo.id){
      pTodo.id = ++this.lastId;
    }
    this.todos.push(pTodo);
    return this;
  }
  
  /**
   * 
   * todo : array filter nasil calisiyor ??
   */
  deleteTodoById(pId: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== pId);
    return this;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(pId: number): Todo {
    return this.todos.filter(todo => todo.id === pId).pop();
  }

  updateTodoById(pId : number, values: Object = {}): Todo {
    let targetTodo = this.getTodoById(pId);
    if(!targetTodo){
      return null;
    }

    Object.assign(targetTodo, values);
    return targetTodo;
  }

  toggleTodoComplete(todo : Todo): Todo {
    let targetTodo = this.updateTodoById(todo.id, {
      compplete : !todo.complete
    });
    
    return targetTodo;
  }
}
