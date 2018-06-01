import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../components/todo-list/todo';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GlobalLoaderService } from './global-loader.service';
import { UserService } from '../services/user.service';


@Injectable()
export class ToDoService {
  host: string = "/api";
  currentUser;

  constructor(
    private _http: HttpClient, 
    private gls: GlobalLoaderService,
    private us: UserService
  ) {
  }

  private todos = new BehaviorSubject<any>([]);
  castTodos = this.todos.asObservable();

  getAll() {
    this.currentUser = this.us.getCurrentUser();
    let _url = this.host + "/todos/" + this.currentUser._id;
    if(this.currentUser.role === "admin") _url = this.host + "/allTodos";

    return this._http.get(_url);
  }

  add(newTodo) {
    let _url = this.host + "/addTodo";

    return this._http.post(_url, newTodo);
  }

  update(todo) {
    let todoCopy = Object.assign({}, todo);
    let _url = this.host + "/updateTodo/" + todo._id;
    delete todoCopy._id;
    
    return this._http.put(_url, todoCopy)
  }

  remove(todoId) {
    let _url = this.host + "/removeTodo/" + todoId;
    
    return this._http.delete(_url);
  }

  updateTodoList() {
    this.gls.globalLoader.isLoading = true;    
    this.getAll().subscribe((result) => {
      console.log(result)
      this.todos.next(result);
      this.gls.globalLoader.isLoading = false;          
    }); 
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
