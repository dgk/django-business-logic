import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { AppState } from '../../app.service';

@Component({
  selector: 'home',
  styleUrls: [

  ],
  template: `
      <breadcrumb [params]="params"></breadcrumb>
      
      <div class="ui container segment">
          <div class="ui relaxed divided list">
            <div class="item" [routerLink]=" ['./interface'] ">
              <div class="content">
                  <a class="header">Interfaces</a>
                  <div class="description"></div>
              </div>
            </div>
          </div>
        </div>`
})
export class HomeComponent {
  private params: any = {};

  constructor(
    public appState: AppState) {
  }

  ngOnInit() {

  }

}
