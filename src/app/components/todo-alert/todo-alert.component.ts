import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/index';

@Component({
  selector: 'app-todo-alert',
  templateUrl: './todo-alert.component.html',
  styleUrls: ['./todo-alert.component.css'],
  providers: []
})
export class TodoAlertComponent implements OnInit {

  private allAlerts = [];

  constructor(private als: AlertService) { }

  ngOnInit() {
    this.allAlerts = this.als.getAlertsQueue();
  }



}
