import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from '../../services/index';
import { User } from '../../models/user'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser:User;

  constructor(
    private us: UserService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    const lsUser = localStorage.getItem('currentUser');
    if (lsUser) {
      this.us.updateCurrentUer(JSON.parse(lsUser));
    }
    this.us.castUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
