import { Component, OnInit } from '@angular/core';
import { GlobalLoaderService } from '../../services/global-loader.service';

@Component({
  selector: 'app-todo-loader',
  templateUrl: './todo-loader.component.html',
  styleUrls: ['./todo-loader.component.css']
})
export class TodoLoaderComponent implements OnInit {
  globalLoader:object;

  constructor(private gls: GlobalLoaderService) { }

  ngOnInit() {
    this.globalLoader = this.gls.globalLoader;
  }

}
