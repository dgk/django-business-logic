import { Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BackendService } from '../backend.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { BaseService } from "../services/base.service";

@Component({
  selector: 'version',
  template: `
            <breadcrumb [params]="params"></breadcrumb>
            <md-list>
                <md-list-item *ngFor="let version of versions" (click)="onSelect(version)">
                  <h3 md-line>{{version.title}}</h3>
                </md-list-item>
              </md-list>`
})

export class VersionComponent{
  private versions;
  private params: any = {
    "Interface": 'Interface',
    "Program": 'Program',
    "Version": 'Version'
  };

  constructor(
    public backend: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    private base: BaseService){

  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.base.fetchVersions( +params["interfaceID"], +params["programID"] ).subscribe(() => {
        this.versions = this.base.versions.getCollection();

        this.params["Interface"] = this.base.programInterfaces.getCurrent().getTitle();
        this.params["Program"] = this.base.programs.getCurrent().getTitle();
      });

    });



  }

  onSelect(version: any) {
    this.base.versions.setCurrent(version);
    this.router.navigate([this.base.versions.getCurrent().getID()], { relativeTo: this.route });

  }
}
