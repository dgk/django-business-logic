import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { AppState } from '../../app.service';

@Component({
  selector: 'home',
  styleUrls: [

  ],
  template: `
      <breadcrumb [params]="params"></breadcrumb>
      <div class="list">
        <div class="item" [routerLink]=" ['./interface'] ">
          <h3 md-line>Interfaces</h3>
        </div>
      </div>
  `
})
export class HomeComponent {
  private params: any = {};

  constructor(
    public appState: AppState) {
  }

  ngOnInit() {

  }

}
