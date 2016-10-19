import { Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { BackendService } from '../backend.service';
import { AppState } from '../app.service';
import _ from 'lodash';

@Component({
  selector: 'breadcrumb',
  template: `<md-list class="breadcrumb">
                <md-list-item class="breadcrumb-item" *ngFor="let breadcrumb of breadcrumbs" [routerLink] = [breadcrumb] >
                  <h3 md-line>{{breadcrumb}}</h3>
                </md-list-item>
              </md-list>`,
  styles: [`
      .breadcrumb {
        padding: 8px 15px;
        margin-bottom: 20px;
        list-style: none;
        background-color: transparent;
        border-radius: 3px;
      }
      .breadcrumb > .breadcrumb-item {
        display: inline-block;
      }
      .breadcrumb > .breadcrumb-item + .breadcrumb-item:before {
        content: "/";
        padding: 0 5px;
        color: #999999;
      }
      .breadcrumb > .active {
        color: #555555;
      }
   `]
})

export class BreadcrumbComponent{
  private breadcrumbs: string[];
  private redirects: string[];
  private regexp: RegExp;

  constructor(
    public backend: BackendService,
    private route: ActivatedRoute,
    private router: Router){

    this.router.events.subscribe((data) => {
      if(data instanceof NavigationEnd){
        this.breadcrumbs = [];
        this.generateBreadcrumbTrail(data.url);
      }
    });

  }

  ngOnInit() {
    this.breadcrumbs = [];

    this.redirects = [];
    this.findRedirects(this.router.config);
    this.regexp = new RegExp("(" + this.redirects.join('|') + ")", 'i');

  }

  findRedirects(routes: any){
    for (var route of routes) {
      if(route['redirectTo']){
        this.redirects.push(route['redirectTo']);
      }
      if(route['children']){
        this.findRedirects(route['children']);
      }
    }
  }

  generateBreadcrumbTrail(url: string){

    if( ! this.regexp.test( url.substr( url.lastIndexOf('/')+1, url.length) ) ){
      this.breadcrumbs.unshift(url);
    }

    if (url.lastIndexOf('/') > 0) {
      this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/')));
    }
  }

  onSelect(url: string){
    //this.router.navigate(url);
  }
}
