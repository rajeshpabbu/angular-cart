import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  constructor() { }

  private alerts = [];
  private maxCount = 2;
  
  getAlertsQueue() {
    return this.alerts;
  }

  clearQueue() {
    this.alerts.length = 0;
  }

  updateAlertQueue(newalert) {
    this.alerts.unshift(newalert);
    if(this.alerts.length > this.maxCount) {
      this.alerts.length = this.maxCount;      
    }
  }

}
