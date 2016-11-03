import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { AppState } from '../../app.service';

@Component({
  selector: 'home',
  styleUrls: [

  ],
  template: `
      <breadcrumb [params]="params"></breadcrumb>
      <md-list>
        <md-list-item [routerLink]=" ['./interface'] ">
          <h3 md-line>Interfaces</h3>
        </md-list-item>
      </md-list>
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
