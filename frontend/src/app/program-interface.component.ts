/**
 * Created by Infirex on 5/27/2016.
 */
import {Component, OnInit} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {EmptyComponent} from './empty.component';
import {BackendService} from './backend.service';
import {ProgramComponent} from './program.component';

@Component({
  selector: 'program-interface',
  template: `
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <a href="/" class="mdl-navigation__link mdl-typography--text-uppercase mdl-layout-title">Blocly Elements</a>
        </div>
        <div>
          <li *ngFor="let programInterface of programInterfaces" class="mdl-layout__tab">
               <a [routerLink]="['Program',{programInterfaceId:programInterface.id}]" class="mdl-layout__tab">
               {{programInterface.title}}
               </a>
          </li>
          <router-outlet></router-outlet>
        </div>
      </header>
      <main class="mdl-layout__content">
        <section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">
          <div class="page-content"></div>
        </section>
        <section class="mdl-layout__tab-panel" id="scroll-tab-2">
          <div class="page-content"></div>
        </section>
        <section class="mdl-layout__tab-panel" id="scroll-tab-3">
          <div class="page-content"></div>
        </section>
        <section class="mdl-layout__tab-panel" id="scroll-tab-4">
          <div class="page-content"></div>
        </section>
        <section class="mdl-layout__tab-panel" id="scroll-tab-5">
          <div class="page-content"></div>
        </section>
        <section class="mdl-layout__tab-panel" id="scroll-tab-6">
          <div class="page-content"></div>
        </section>
      </main>
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

  constructor(private router: Router,
              private backend: BackendService) {
  }


  ngOnInit(): any {
    this.backend.listProgramInterfaces().subscribe(
      envelope => this.programInterfaces = envelope.results
    );
  }
}
