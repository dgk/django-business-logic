import {Component, NgModule, Input} from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { BreadcrumbService } from '../services/breadcrumb.service';
import { AppState } from '../app.service';
import _ from 'lodash';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import * as breadcrumbsActions from '../actions/breadcrumbs';
import {stateService} from "../services/state.service";
import {Observable} from "rxjs";


@Component({
  selector: 'breadcrumb',
  template: `
      <div class="md">
          <div class="breadcrumb flat">
          <a *ngFor="let breadcrumb of breadcrumbs | async; let i = index; let last = last" [routerLink] = [breadcrumb.link] [ngClass]="{notActiveLink: last}">
            {{breadcrumb.friendlyName | async}}
          </a>
          </div>
      </div>
      <br>
  `,
  styleUrls: [ '../css/breadcrumb.component.css' ],
  providers: [ BreadcrumbService ]
})

export class BreadcrumbComponent{
  breadcrumbs: any;
  navigationEnd: any;
  links: any;
  private url: string;
  info: any;


  @Input('params') params: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private state: stateService,
    private store: Store<fromRoot.State>
  ){

    this.breadcrumbs = store.let(fromRoot.getBreadcrumbs);
    this.navigationEnd = store.let(fromRoot.getNavigationEnd);
    this.info = store.let(fromRoot.getInfoState);


    this.router.events.subscribe((data) => {
      if(data instanceof NavigationEnd){
        this.url = data.url;

        this.links = this.breadcrumbService.update(this.params, this.router.config, this.url);

        this.store.dispatch(new breadcrumbsActions.NavigationEndAction());
        // this.onNavigationEnd(links);
      }
    });

    Observable.combineLatest(this.navigationEnd, this.info).subscribe(([navEnd, info]) => {

      if(navEnd && info["loaded"]){
        this.onNavigationEnd(this.modifyLinks());
        this.store.dispatch(new breadcrumbsActions.NavigationInProcessAction());
      }
    });

  }

  modifyLinks(){
    return this.links.map(link => {
      return {
        link: link,
        friendlyName: this.breadcrumbService.getFriendlyName(link)
      };
    });
  }

  onNavigationEnd(links){
    this.store.dispatch(new breadcrumbsActions.ClearAction());
    this.store.dispatch(new breadcrumbsActions.FillAction(links));
  }

  ngOnInit() {

  }

  ngOnChanges(change: any) {
    // this.breadcrumbs = this.breadcrumbService.update(change.params.currentValue, this.router.config, this.url);
  }

}
