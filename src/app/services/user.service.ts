import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class UserService {
  host: string = "/api";
  //currentUser:User;

  private currentUser = new BehaviorSubject<User>(new User("", "", "", ""));
  castUser = this.currentUser.asObservable();

  constructor(private _http: HttpClient) { }

  getAll() {
    let _url = this.host + "/users";
    return this._http.get(_url)
  }

  getCurrentUser() {
    return this.currentUser.value;
  }

  updateCurrentUer(user) {
    this.currentUser.next(user);
  }

  add(newUser) {
    let _url = this.host + "/addUser";

    return this._http.post(_url, newUser);
  }

  update(user) {
    let userCopy = Object.assign({}, user);
    let _url = this.host + "/updateUser/" + user._id;
    delete userCopy._id;
    
    return this._http.put(_url, userCopy)
  }

  remove(userId) {
    let _url = this.host + "/removeUser/" + userId;
    
    return this._http.delete(_url);
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
