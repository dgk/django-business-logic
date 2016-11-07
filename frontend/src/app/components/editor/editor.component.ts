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
    
    <div class="ui icon top pointing right pointing dropdown button black" style="top:10px!important;right:10px!important;position:absolute;">
      <div class="header"><i class="dropdown icon"></i> Version</div>
      
      <div class="menu">
        <div class="item" (click) = "showModalSave()"><i class="save icon"></i>Save</div>
        <div class="item" (click) = "showModalSaveAs()">Save as ...</div>
      </div>
    </div>
    

      <div id="modalSave" class="ui small modal">
        <div class="header">
          Save
        </div>
        <div class="image content">
          <div class="description">
            <p>This action change current version of program, save anyway?</p>
          </div>
        </div>
        <div class="actions">
          <div class="ui grey deny button">
            Cancel
          </div>
          <div class="ui positive right labeled icon button">
            Yes
            <i class="checkmark icon"></i>
          </div>
        </div>
      </div>
      
      <div id="modalSaveAs" class="ui small modal">
        <div class="header">
          Save as...
        </div>
        <div class="content">
        <form class="ui form">
            <div class="field">
              <label>Name of program version</label>
              <input type="text" name="save-as-version" placeholder="">
            </div>
        </form>
          <div class="description">
            <p>This action change current version of program, save anyway?</p>
          </div>
        </div>
        <div class="actions">
          <div class="ui grey deny button">
            Cancel
          </div>
          <div class="ui positive right labeled icon button">
            Yes
            <i class="checkmark icon"></i>
          </div>
        </div>
      </div>
      
    <br>
    
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

  private workspace: Blockly.Workspace;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blocks: BlocksService,
    private base: BaseService,
    private ref: ReferenceService){
  }


  ngAfterViewInit() {

    $(".ui.dropdown").dropdown();

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

  showModalSave(){
    $("#modalSave").modal('show');
  }

  showModalSaveAs(){
    $("#modalSaveAs").modal('show');
  }

  getVersionName(){
    if(this.version.title){
      return this.version.title;
    }
    return "";
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
