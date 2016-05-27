/**
 * Created by Infirex on 5/27/2016.
 */

import {Component, OnInit} from '@angular/core';
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';
import {BackendService} from  '../backend.service';

@Component({
  selector: 'program-editor',
  template: `
  programVersionId = {{programVersionId}}
  `
})
export class ProgramEditorComponent {
  public programVersionId;

  constructor(private router: Router,
              private backend: BackendService,
              private routeParams: RouteParams) {
  }

  ngOnInit(): any {
    this.programVersionId = Number.parseInt(this.routeParams.get('programVersionId'));
  }
}
