import {
  Component,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

import { BlocksService } from "../blockly/blocks/blocks.service";
import { BaseService } from "../../services/base.service";
import {ReferenceService} from "../../services/reference.service";

import {BlocklyComponent} from '../blockly/blockly.component';

@Component({
  selector: 'editor',
  template: `
    <breadcrumb [params]="params"></breadcrumb>
    
    <section>

        <span>Save current version of program ?</span>
        &nbsp;
        <span></span>
        <button (click)="onSave( blockly.getXml() )">{{this.save_text}}</button>

    </section>
    
    <blockly [version] = "version" [xmlForReferenceDescriptors] = "xmlForReferenceDescriptors" #blockly></blockly>
    `,
  providers: []
})

export class EditorComponent {
  private save_text = "Save";

  version: any;
  xmlForReferenceDescriptors: any;

  private params: any = {
    "Interface": 'Interface',
    "Program": 'Program',
    "Version": 'Version'
  };

  style = {
    width: '99%',
    height: '79%',
    position: 'absolute'
  };

  private workspace: Blockly.Workspace;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blocks: BlocksService,
    private base: BaseService,
    private ref: ReferenceService){
  }


  ngAfterViewInit() {
    this.blocks.init();

    this.route.params.subscribe(params => {

      this.base.fetchVersion( +params["interfaceID"], +params["programID"], +params["versionID"] ).subscribe((data) => {

        this.version = data;
        this.fetchReferences();

        this.params["Interface"] = this.base.programInterfaces.getCurrent().getTitle();
        this.params["Program"] = this.base.programs.getCurrent().getTitle();
        this.params["Version"] = this.base.versions.getCurrent().getTitle();
      });

    });

  }

  fetchReferences(){

    this.ref.fetchReferenceDescriptors().subscribe(() => {

      this.xmlForReferenceDescriptors = this.ref.generateXmlForToolbox();

    });
  }


  ngOnChanges(changes: any): any {

  }

  onSave(xml: string) {

    this.save_text = "Saving ...";

    this.version.xml = xml;

    this.ref.saveVersion(this.version).subscribe(() => {
      this.save_text = "Save";
    });
  }

}
