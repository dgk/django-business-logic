/**
 * Created by Infirex on 5/27/2016.
 */

import {Component, OnInit} from '@angular/core';
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';
import {BackendService} from  '../backend.service';
import BlocklyComponent from './blockly.component';

@Component({
  selector: 'program-editor',
  template: require('./version-editor.html'),
  directives: [BlocklyComponent]
})
export class VersionEditorComponent {
  public programVersionId;
  private version;

  constructor(private router: Router,
              private backend: BackendService,
              private routeParams: RouteParams) {
  }

  ngOnInit(): any {
    this.programVersionId = Number.parseInt(this.routeParams.get('programVersionId'));
    this.backend.getProgramVersionById(this.programVersionId)
      .subscribe(version => this.version = version);
  }

  onXmlSaved(xmlText) {
    this.version.xml = xmlText;
    this.backend.saveVersion(this.version)
      .subscribe(version => this.version = version);
  }
}
