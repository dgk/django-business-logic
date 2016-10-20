import { Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BackendService } from '../backend.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'version',
  template: `
            <breadcrumb [params]="params"></breadcrumb>
            <md-list>
                <md-list-item *ngFor="let version of versions" (click)="onSelect(version.id)">
                  <h3 md-line>{{version.title}}</h3>
                </md-list-item>
              </md-list>`
})

export class VersionComponent{
  private versions;
  private params: any = {};

  constructor(
    public backend: BackendService,
    private route: ActivatedRoute,
    private router: Router){

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.params = params;

      this.backend.listProgramVersions(+params['programID']).subscribe((envelope) => {
        this.versions = envelope.results;
      });
    });
  }

  onSelect(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
