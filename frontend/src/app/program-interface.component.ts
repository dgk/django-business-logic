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
 <ul>
  <li *ngFor="let programInterface of programInterfaces">
       <a [routerLink]="['Program',{programInterfaceId:programInterface.id}]">
       {{programInterface.title}}
       </a>
  </li>
</ul>

<main>
  <router-outlet></router-outlet>
</main>
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
