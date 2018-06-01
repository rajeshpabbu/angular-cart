import { Component, OnInit } from '@angular/core';
import { UserService, GlobalLoaderService, AlertService } from '../../services/index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];

  constructor(
    private us: UserService, 
    private gls: GlobalLoaderService,
    private als: AlertService
  ) { }

  ngOnInit() {
    this.gls.globalLoader.isLoading = true;
    this.loadUsers(); 
  }

  loadUsers () {
    this.us.getAll().subscribe((result:any) => {
      this.users = result;
      this.gls.globalLoader.isLoading = false;          
    }, error => this.errorCallback(error));
  }

  updateUser (user) {
    this.gls.globalLoader.isLoading = true;
    this.us.update(user).subscribe((result) => {
      this.als.updateAlertQueue({message:"<strong>" +user.name+ "</strong> updated successfully", type:"success"});
      this.loadUsers ();
    }, error => this.errorCallback(error));
  }

  removeUser(user) {
    this.gls.globalLoader.isLoading = true;    
    this.us.remove(user._id).subscribe((result) => {
      this.als.updateAlertQueue({message:"<strong>" +user.name+ "</strong> removed successfully", type:"success"})            
      this.loadUsers ();      
    }, error => this.errorCallback(error));
  }

  errorCallback(error) {
    this.gls.globalLoader.isLoading = false;          
    console.log(error);
    this.als.updateAlertQueue({message:"<strong>" + error.error + "</strong>", type:"danger"});
  }

}
