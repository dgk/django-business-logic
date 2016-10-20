import { Injectable } from '@angular/core';

@Injectable()
export class BreadcrumbService {
  private breadcrumbs: string[];
  private redirects: string[];
  private regexp: RegExp;
  private params;

  constructor() {

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
    }else if(url.lastIndexOf('/') == 0) { this.breadcrumbs.unshift('/'); }
  }

  getFriendlyName(url: string) {
    if(url == '/'){
      return 'Home';
    }else if(url == '/interface'){
      return 'Interfaces';
    }else{
      if( url.indexOf('interface') != -1 && url.indexOf('program') != -1 && url.indexOf('version') != -1){
        return "Version";
      }else if(url.indexOf('interface') != -1 && url.indexOf('program') != -1){
        return "Program";
      }else if(url.indexOf('interface') != -1){
        return "Interface";
      }
    }

  }
}
