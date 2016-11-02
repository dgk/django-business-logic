import { Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { AppState } from '../../app.service';

import { BaseService } from "../../services/base.service";

@Component({
  selector: 'program',
  template: `
            <breadcrumb [params]="params"></breadcrumb>
            <md-list>
                <md-list-item *ngFor="let program of programs" (click)="onSelect(program)">
                  <h3 md-line>{{program.title}}</h3>
                </md-list-item>
              </md-list>`
})

export class ProgramComponent{
  private programs;
  private params: any = {
    "Interface": 'Interface',
    "Program": 'Program',
    "Version": 'Version'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base: BaseService){

  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.base.fetchPrograms( +params["interfaceID"] ).subscribe(() => {
        this.programs = this.base.programs.getCollection();

        this.params["Interface"] = this.base.programInterfaces.getCurrent().getTitle();
      });

    });

  }

  onSelect(program: any){
    this.base.programs.setCurrent(program);
    this.router.navigate([this.base.programs.getCurrent().getID()], { relativeTo: this.route });
  }
}
