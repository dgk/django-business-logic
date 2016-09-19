/**
 * Created by Infirex on 5/27/2016.
 */
import {Component, OnInit} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams} from '@angular/router-deprecated';
import {EmptyComponent} from './empty.component';
import {BackendService} from './backend.service';
import {ProgramVersionComponent} from './program-version.component';
import {BreadcrumbService} from './breadcrumb.service';

@Component({
  selector: 'program',
  template: `
  <!-- programInterfaceId = {{programInterfaceId}} -->
  <ul class="demo-list-item mdl-list">
    <li *ngFor="let program of programs" class="mdl-list__item-primary-content">
        <a [routerLink]="['ProgramVersion',{programId:program.id}]" style="padding-left: 20px;" class="mdl-list__item-primary-content">{{program.title}}</a>
    </li>
  </ul>
  <router-outlet></router-outlet>
  `
})
@RouteConfig([
  {
    path: '/',
    name: 'ProgramEmpty',
    component: EmptyComponent,
    useAsDefault: true
  },
  {
    path: '/program/:programId/...',
    name: 'ProgramVersion',
    component: ProgramVersionComponent
  }])
export class ProgramComponent implements OnInit {
  public programs;
  private programInterfaceId: number;

  constructor(private router: Router,
              private backend: BackendService,
              private routeParams: RouteParams,
              private breadcrumbService: BreadcrumbService) {
    breadcrumbService.addBreadcrumbRoute( { route:'/', name:'Home' } );
  }

  ngOnInit(): any {
    this.programInterfaceId = Number.parseInt(this.routeParams.get('programInterfaceId'));
    this.backend.listPrograms(this.programInterfaceId)
      .subscribe(envelope => this.programs = envelope.results);
  }
}
