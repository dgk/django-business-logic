import {Component} from '@angular/core';


@Component({
  selector: 'breadcrumb',
  template: `
    <a *ngFor="let breadcrumb of routeBreadcrumbs;" href="{{breadcrumb.route}}" class="mdl-layout__tab">{{breadcrumb.name}}</a>
  `
})

export class BreadcrumbService {
  private routeBreadcrumbs: any [];

  constructor() {
    this.routeBreadcrumbs = [];
  }

  addBreadcrumbRoute(route: any): void {
    this.routeBreadcrumbs.push( route );
    console.log(this.routeBreadcrumbs);
  }
}