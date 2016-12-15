import { Injectable } from '@angular/core';
import {stateService} from "./state.service";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import {wrapIntoObservable} from "@angular/router/src/utils/collection";

@Injectable()
export class BreadcrumbService {
  private breadcrumbs: string[];
  private redirects: string[];
  private regexp: RegExp;
  private params;

  constructor(private state: stateService, private store: Store<fromRoot.State>) {

  }

  update(params: any, routes:any, url: string): any {
    this.redirects = [];
    this.breadcrumbs = [];
    this.params = params;

    if(params && url){
      this.findRedirects(routes);
      this.regexp = new RegExp("(" + this.redirects.join('|') + ")", 'i');


      if(url == '/'){
        this.breadcrumbs.push(url);
      }else this.generateBreadcrumbTrail(url);
    }

    return this.breadcrumbs;
  }

  findRedirects(routes: any){
    for (let route in routes) {
      if (routes.hasOwnProperty(route)) {
        if(routes[route]['redirectTo']){
          this.redirects.push(routes[route]['redirectTo']);
        }
        if(routes[route]['children']){
          this.findRedirects(routes[route]['children']);
        }
      }

    }
  }

  generateBreadcrumbTrail(url: string){

    if( ! this.regexp.test( url.substr( url.lastIndexOf('/')+1, url.length) ) ){
      this.breadcrumbs.unshift(url);
    }

    if (url.lastIndexOf('/') > 0) {
      this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/')));
    }else if(url.lastIndexOf('/') == 0) { this.breadcrumbs.unshift('/'); }
  }

  getFriendlyName(url: string) {

    if(url == '/'){
      return this.wrapToObservable('Home');
    }else if(url == '/interface') {
      return this.wrapToObservable('Interfaces');
    }else if(url == '/execution'){
      return this.wrapToObservable('Execution');
    }else{
      if( url.indexOf('interface') != -1 && url.indexOf('program') != -1 && url.indexOf('version') != -1){

        return this.wrapToObservable(this.state.getCurrentVersion().title);

      }
      else if(url.indexOf('interface') != -1 && url.indexOf('program') != -1){

        return this.wrapToObservable(this.state.getCurrentProgram().title);

      }
      else if(url.indexOf('interface') != -1){

        return this.store.let(fromRoot.getCurrentPrInterfaceTitle);

      }else if(url.indexOf('execution') != -1){
        return this.state.getCurrentExecution().id;
      }else{
        return url;
      }
    }

  }

  wrapToObservable(value){
    return new Observable(observer => {
      observer.next(value);
    });
  }
}
