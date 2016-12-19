import {Component, NgModule, Input} from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { AppState } from '../app.service';
import _ from 'lodash';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import { BreadcrumbService } from '../services/breadcrumb.service';
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
            <span *ngIf="breadcrumb.show" [ngClass]="{notActiveLink: breadcrumb.isLast}">
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
        show: true,
        isLast: false
      },
      {
        name: 'interfaces',
        title: this.wrapToObservable('Interfaces'),
        link: '/interfaces',
        show: false,
        isLast: false
      },
      {
        name: 'programs',
        title: this.store.let(fromRoot.getCurrentPrInterfaceTitle),
        link: '',
        show: false,
        isLast: false
      },
      {
        name: 'versions',
        title: this.store.let(fromRoot.getCurrentProgramTitle),
        link: '',
        show: false,
        isLast: false
      },
      {
        name: 'version',
        title: this.store.let(fromRoot.getCurrentVersionTitle),
        link: '',
        show: false,
        isLast: false
      },
      {
        name: 'executions',
        title: this.wrapToObservable('Executions'),
        link: '/execution',
        show: false,
        isLast: false
      },
      {
        name: 'execution',
        title: this.store.let(fromRoot.getCurrentExecutionId),
        link: '',
        show: false,
        isLast: false
      }
    ];

    this.router.events.subscribe((data) => {
      if(data instanceof NavigationEnd){
        this.url = data.url;

        this.links = this.breadcrumbService.update(this.router.config, this.url);

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
              }
              break;
          }

        });

        try {
          let active = find(this.breadcrumbs, item => item["link"] == this.url);

          if (active && active["name"] === 'execution') {
            this.setActiveTo(this.breadcrumbs[6], 5);
          }else if(active && active["name"] === 'executions'){
            this.setActiveTo(this.breadcrumbs[5], 5);
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

  setActiveTo(activeBreadcrumb: any, start?: any){

    if(start){
      start = arguments[1];
    }else{
      start = 0;
    }

    let foundCurrent = false;
    for(let i = start; i < this.breadcrumbs.length; i++){
      let breadcrumb = this.breadcrumbs[i];

      breadcrumb["show"] = !foundCurrent;

      breadcrumb["isLast"] = false;

      if (breadcrumb.name === activeBreadcrumb.name) {
        foundCurrent = true;
        breadcrumb["isLast"] = true;
      }
    }

    if(start != 0){
      this.breadcrumbs[0].show = true;
      this.breadcrumbs[0].isLast = false;
    }
  }

  wrapToObservable(value){
    return new Observable(observer => {
      observer.next(value);
    });
  }

  checkUrl(url){
    return (part) => url.indexOf(part) != -1;
  }

}
