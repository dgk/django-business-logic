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
import find = require("lodash/find");
import findLast = require("lodash/findLast");
import lastIndexOf = require("lodash/lastIndexOf");


@Component({
  selector: 'breadcrumb',
  template: `
      <div class="breadcrumbs">
   
        <span *ngFor="let breadcrumb of breadcrumbs">
            <span *ngIf="breadcrumb.show">
              <a [routerLink] = [breadcrumb.link]>{{breadcrumb.title | async}}</a>
              <span class="separator">/</span>
            </span>
        </span>
        
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

  list: any;


  @Input('params') params: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private state: stateService,
    private store: Store<fromRoot.State>
  ){

    this.breadcrumbs = [
      {
        name: 'home',
        title: this.wrapToObservable('Home'),
        link: '/',
        show: true
      },
      {
        name: 'interfaces',
        title: this.wrapToObservable('Interfaces'),
        link: '/interfaces',
        show: false
      },
      {
        name: 'programs',
        title: this.store.let(fromRoot.getCurrentPrInterfaceTitle),
        link: '',
        show: false
      },
      {
        name: 'versions',
        title: this.store.let(fromRoot.getCurrentProgramTitle),
        link: '',
        show: false
      },
      {
        name: 'version',
        title: this.store.let(fromRoot.getCurrentVersionTitle),
        link: '',
        show: false
      },
      {
        name: 'executions',
        title: this.wrapToObservable('Executions'),
        link: '/execution',
        show: false
      },
      {
        name: 'execution',
        title: this.store.let(fromRoot.getCurrentExecutionId),
        link: '',
        show: false
      }
    ];

    this.router.events.subscribe((data) => {
      if(data instanceof NavigationEnd){
        this.url = data.url;

        this.links = this.breadcrumbService.update(this.params, this.router.config, this.url);

        this.links.forEach(url => {
          let checkUrl = this.checkUrl(url);

          switch(url){
            case '/':
              this.breadcrumbs[0].link = url;
              break;
            case '/interface':
              this.breadcrumbs[1].link = url;
              break;
            case '/execution':
              this.breadcrumbs[5].link = url;
              break;
            default:
              if (checkUrl('interface') && checkUrl('program') && checkUrl('version')) {
                this.breadcrumbs[4].link = url;
              }
              else if (checkUrl('interface') && checkUrl('program')) {
                this.breadcrumbs[3].link = url+'/version';
              }
              else if (checkUrl('interface')) {
                this.breadcrumbs[2].link = url+'/program';
              } else if (checkUrl('execution')) {
                this.breadcrumbs[6].link = url;
              } else {
                // return url;
              }
              break;
          }

        });

        try {
          let active = find(this.breadcrumbs, item => item.link == this.url);

          if (active && active.name === 'execution') {
            this.setActiveTo(this.breadcrumbs[0]);

            this.breadcrumbs[6].show = true;
            this.breadcrumbs[5].show = true;
          }else if(active && active.name === 'executions'){
            this.setActiveTo(this.breadcrumbs[0]);

            this.breadcrumbs[5].show = true;
          }else {
            this.setActiveTo(active);
          }
        }
        catch (e) {
          // console.log(this.breadcrumbs.map(item => item.link), this.url);
        }
      }
    });

  }

  ngOnInit() {

  }

  setActiveTo(activeBreadcrumb){
    let foundCurrent = false;
    this.breadcrumbs.forEach(breadcrumb => {
      breadcrumb["show"] = !foundCurrent;

      // console.log(activeBreadcrumb, breadcrumb);

      if (breadcrumb.name === activeBreadcrumb.name) {
        foundCurrent = true;
      }
    });
  }

  wrapToObservable(value){
    return new Observable(observer => {
      observer.next(value);
    });
  }

  checkUrl(url){
    return (part) => url.indexOf(part) != -1;
  }


  ngOnChanges(change: any) {
    // this.breadcrumbs = this.breadcrumbService.update(change.params.currentValue, this.router.config, this.url);
  }

}
