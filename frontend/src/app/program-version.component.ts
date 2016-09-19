/**
 * Created by Infirex on 5/27/2016.
 */
import {Component, OnInit} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams} from '@angular/router-deprecated';
import {EmptyComponent} from './empty.component';
import {BackendService} from './backend.service';
import {VersionEditorComponent} from './version-editor/version-editor.component.ts';
import {BreadcrumbService} from './breadcrumb.service';

@Component({
  selector: 'program-version',
  template: `
  <!--programId = {{programId}}-->
  <ul class="demo-list-item mdl-list">
    <li *ngFor="let programVersion of programVersions" class="mdl-list__item-primary-content">
        <a [routerLink]="['Program',{programVersionId:programVersion.id}]" style="padding-left: 20px;" class="mdl-list__item-primary-content">
        {{programVersion.title}}</a>
    </li>
  </ul>
  <router-outlet></router-outlet>
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
    path: '/version/:programVersionId',
    name: 'Program',
    component: VersionEditorComponent
  }])
export class ProgramVersionComponent implements OnInit {
  public programVersions;
  private programId: number;

  constructor(private router: Router,
              private backend: BackendService,
              private routeParams: RouteParams,
              private breadcrumbService: BreadcrumbService) {
    breadcrumbService.addBreadcrumbRoute( { route:'/', name:'Home' } );
  }

  ngOnInit(): any {
    this.programId = Number.parseInt(this.routeParams.get('programId'));
    this.backend.listProgramVersions(this.programId).subscribe(
      envelope => this.programVersions = envelope.results
    );
  }
}
