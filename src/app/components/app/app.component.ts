import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Todo } from '../todo-list/todo';
import { ToDoService } from '../../services/to-do.service';

@Component({
  selector: 'app-todo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todos';
  
  constructor() {};

  ngOnInit(){
  }
}