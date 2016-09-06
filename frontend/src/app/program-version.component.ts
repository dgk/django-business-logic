/**
 * Created by Infirex on 5/27/2016.
 */
import {Component, OnInit} from '@angular/core';
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';
import {EmptyComponent} from './empty.component';
import {BackendService} from './backend.service';
import {VersionEditorComponent} from './version-editor/version-editor.component.ts';

@Component({
  selector: 'program-version',
  template: `
    <!--programId = {{programId}}-->
    <li *ngFor="let programVersion of programVersions" class="mdl-layout__tab">
        <a [routerLink]="['Program',{programVersionId:programVersion.id}]" class="mdl-layout__tab">
        {{programVersion.title}}</a>
    </li>
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
              private routeParams: RouteParams) {
  }

  ngOnInit(): any {
    this.programId = Number.parseInt(this.routeParams.get('programId'));
    this.backend.listProgramVersions(this.programId).subscribe(
      envelope => this.programVersions = envelope.results
    );
  }
}
