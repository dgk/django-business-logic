import { Component, NgModule, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { BreadcrumbService } from '../services/breadcrumb.service';
import { AppState } from '../app.service';
import _ from 'lodash';

@Component({
  selector: 'breadcrumb',
  template: `
      <div class="md">
          <div class="breadcrumb flat">
          <a *ngFor="let breadcrumb of breadcrumbs; let i = index; let last = last" [routerLink] = [breadcrumb] [ngClass]="{notActiveLink: last}">
            {{this.friendlyName(breadcrumb)}}
          </a>
          </div>
      </div>
      <br>
`,
  styleUrls: [ '../css/breadcrumb.component.css' ],
  providers: [ BreadcrumbService ]
})

export class BreadcrumbComponent{
  private breadcrumbs: string[];
  private url: string;


  @Input('params') params: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService ){

    this.router.events.subscribe((data) => {
      if(data instanceof NavigationEnd){
        this.url = data.url;
        this.breadcrumbs = this.breadcrumbService.update(this.params, this.router.config, this.url);
      }
    });

  }

  ngOnInit() {
  }

  friendlyName(breadcrumb: string) {
    let friendlyName = this.breadcrumbService.getFriendlyName(breadcrumb);
    return friendlyName;
  }

  ngOnChanges(change: any) {
    this.breadcrumbs = this.breadcrumbService.update(change.params.currentValue, this.router.config, this.url);
  }

  onSelect(url: string){
    //this.router.navigate(url);
  }
}
