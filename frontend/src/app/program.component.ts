/**
 * Created by Infirex on 5/27/2016.
 */
import {Component, OnInit} from '@angular/core';
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';
import {EmptyComponent} from './empty.component';
import {BackendService} from './backend.service';
import {ProgramVersionComponent} from './program-version.component';

@Component({
  selector: 'program',
  template: `
  programInterfaceId = {{programInterfaceId}}
    <ul>
        <li *ngFor="let program of programs">
            <a [routerLink]="['ProgramVersion',{programId:program.id}]">{{program.title}}</a>
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
              private routeParams: RouteParams) {
  }

  ngOnInit(): any {
    this.programInterfaceId = Number.parseInt(this.routeParams.get('programInterfaceId'));
    this.backend.listPrograms(this.programInterfaceId)
      .subscribe(envelope => this.programs = envelope.results);
  }
}
