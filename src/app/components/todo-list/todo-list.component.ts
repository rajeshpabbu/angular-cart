import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './todo';
import { ToDoService, GlobalLoaderService, AlertService, UserService } from '../../services/index';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos = [];
  filteredTodos = [];
  currentUser;
  private filterBy = "All";

  private filterTabs = [
    {filterBy: "All"},
    {filterBy: "Completed"},
    {filterBy: "Pending"}
  ];

  constructor(
    private todoService: ToDoService, 
    private gls: GlobalLoaderService,
    private als: AlertService,
    private us: UserService
  ) {
  };

  filterTodos(filter: string) {
    this.filterBy = filter;
    switch(filter){
      case "All":
      this.filteredTodos = this.todos;
      break;

      case "Completed":
      case "Pending":
      this.filteredTodos = this.todos.filter(item => item.status === filter);
      break;
    }
  }

  ngOnInit() {
    this.currentUser = this.us.getCurrentUser();
    this.loadTodos();
    this.todoService.castTodos.subscribe((todos) => {
      this.todos = todos;
      this.filterTodos(this.filterBy);
    });
  }

  loadTodos () {
    this.gls.globalLoader.isLoading = true;
    
    this.todoService.getAll().subscribe((result:any) => {
      this.todos = result;
      this.filterTodos(this.filterBy);
      this.gls.globalLoader.isLoading = false;          
    }, error => this.errorCallback(error));
  }

  updateStatus(todo: Todo) {
    todo.status = todo.status === 'Completed' ? 'Pending' : 'Completed';
    this.updateTodo(todo);
  }

  updateTodo (todo: Todo) {
    this.gls.globalLoader.isLoading = true;
    this.todoService.update(todo).subscribe((result) => {
      this.als.updateAlertQueue({message:"<strong>" +todo.name+ "</strong> updated successfully", type:"success"});
      this.loadTodos();
    }, error => this.errorCallback(error));
  }

  removeTodo(todo: Todo) {
    this.gls.globalLoader.isLoading = true;    
    this.todoService.remove(todo._id).subscribe((result) => {
      this.als.updateAlertQueue({message:"<strong>" +todo.name+ "</strong> removed successfully", type:"success"})            
      this.loadTodos();      
    }, error => this.errorCallback(error));
  }

  errorCallback(error) {
    this.gls.globalLoader.isLoading = false;          
    console.log(error);
    this.als.updateAlertQueue({message:"<strong>" + error.error + "</strong>", type:"danger"});
  }
}