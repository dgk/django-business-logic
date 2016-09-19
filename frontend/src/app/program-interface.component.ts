/**
 * Created by Infirex on 5/27/2016.
 */
import {Component, OnInit} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {EmptyComponent} from './empty.component';
import {BackendService} from './backend.service';
import {ProgramComponent} from './program.component';
import {BreadcrumbService} from './breadcrumb.service';

@Component({
  selector: 'program-interface',
  providers: [ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES, BreadcrumbService],
  template: `
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header" (click)="openFack()">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <a [routerLink]="['ProgramInterfaceEmpty']" class="mdl-navigation__link mdl-typography--text-uppercase mdl-layout-title">Blocly Elements</a>
        </div>
        <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
          <breadcrumb></breadcrumb>
        </div>
      </header>
      <div id="menuDinamic">
        <ul class="demo-list-item mdl-list">
          <li *ngFor="let programInterface of programInterfaces" class="mdl-list__item-primary-content">
             <a [routerLink]="['Program',{programInterfaceId:programInterface.id}]" style="padding-left: 20px;" class="mdl-list__item-primary-content">
               {{programInterface.title}}
             </a>
          </li>
        </ul>
        <router-outlet></router-outlet>
      </div>
    </div>
    <style>
        .mdl-layout__tab {padding: 0 12px;}
    </style>
  `
})
@RouteConfig([
  {
    path: '/',
    name: 'ProgramInterfaceEmpty',
    component: EmptyComponent,
    useAsDefault: true
  },
  {
    path: '/interface/:programInterfaceId/...',
    name: 'Program',
    component: ProgramComponent
  }])
export class ProgramInterfaceComponent implements OnInit {
  private programInterfaces;

  openFack(){
    var menuDinamicElements = document.getElementById('menuDinamic').getElementsByTagName('ul');
    for (var i = 0; i < menuDinamicElements.length; i++){
      var active = menuDinamicElements[i].getElementsByClassName('router-link-active');
      if(active.length){
        menuDinamicElements[i].setAttribute("hidden", "true");
      }else{
        if( menuDinamicElements[i].hasAttribute("hidden") )
          menuDinamicElements[i].removeAttribute("hidden")
      }
    }
  }

  constructor(private router: Router,
              private backend: BackendService,
              private breadcrumbService: BreadcrumbService) {
    breadcrumbService.addBreadcrumbRoute( { route:'/', name:'Home' } );
  }

  ngOnInit(): any {
    this.backend.listProgramInterfaces().subscribe(
      envelope => this.programInterfaces = envelope.results
    );
    // this.breadcrumbs.push(router);
  }
}
