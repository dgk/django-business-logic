import {
  Component,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BlocksService } from "../../blocks/blocks.service";
import { BaseService } from "../../services/base.service";
import { ReferenceService } from "../../services/reference.service";
import { VersionService } from "../../services/version.service";
import {ArgumentFieldService} from "../../services/argumentField.service";
import {Observable} from "rxjs";

@Component({
  selector: 'editor',
  template: `
    <breadcrumb [params]="params"></breadcrumb>
    
    <div class="ui icon top pointing right pointing dropdown button black">
      <div class="header"><i class="dropdown icon"></i> Version</div>
      
      <div class="menu">
        <div class="item" (click) = "modalSave.show()"><i class="save icon"></i>Save</div>
        <div class="item" (click) = "modalSaveAs.show()">Save as ...</div>
      </div>
    </div>
    
    <modal-save #modalSave (onSave)="onSave( blockly.getXml() )"></modal-save>
    <modal-save-as #modalSaveAs (onSaveAs)="onSaveAs($event, blockly.getXml())" [title] = "title" [verDescription] = "verDescription"></modal-save-as>
    
    <br>
    
    <div class="ui segment">
        <p>{{verDescription}}</p>
    </div>    
    
    <blockly [version] = "version" 
             [xmlForReferenceDescriptors] = "xmlForReferenceDescriptors" 
             [xmlForArgumentFields] = "xmlForArgumentFields" #blockly>
    </blockly>
   
    <div *ngIf = "saving" class="ui active page dimmer">
      <div class="ui text loader">Saving</div>
    </div>
    `,
  styles: [`
         .ui.dropdown{
            top: 10px!important;
            right: 10px!important;
            position: absolute;
         }`],
  providers: []
})

export class EditorComponent {
  version: any;
  title: any;
  verDescription: any;

  saving: boolean = false;

  xmlForReferenceDescriptors: any;
  xmlForArgumentFields: any;

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
    private ref: ReferenceService,
    private argField: ArgumentFieldService,
    private ver: VersionService){
  }


  ngAfterViewInit() {


    $(".ui.dropdown").dropdown();

    this.blocks.init();

    this.route.params.subscribe(params => {

      this.base.fetchVersion( +params["interfaceID"], +params["programID"], +params["versionID"] ).subscribe((data) => {

        this.version = data;
        this.title = data.title;
        this.verDescription = data.description;

        this.params["Interface"] = this.base.programInterfaces.getCurrent().getTitle();
        this.params["Program"] = this.base.programs.getCurrent().getTitle();
        this.params["Version"] = this.base.versions.getCurrent().getTitle();

        // console.log(this.version.xml);

        Observable.forkJoin(
            this.ref.fetchReferenceDescriptors(),
            this.argField.fetchArguments()
        ).subscribe(() => {
          this.xmlForReferenceDescriptors = this.ref.generateXmlForToolbox();
          this.xmlForArgumentFields = this.argField.generateXmlForToolbox();
        });

      });

    });



  }

  getVersionName(){
    if(this.version){
      return this.version.title;
    }
    return "";
  }

  ngOnChanges(changes: any): any {

  }


  onSaveAs(changes: any, xml){

    this.version.xml = xml;
    this.version.title = changes.title;
    this.version.description = changes.description;

    this.saving = true;

    this.ver.saveAsVersion(this.version).subscribe((response: any) => {
      this.saving = false;

      //TODO: redirect to new version!
      // let id = response.id.toString();
      // this.router.navigate([ id ], { relativeTo: this.route.parent });

    });
  }

  onSave(xml: string) {

    this.version.xml = xml;

    this.saving = true;

    this.ver.saveVersion(this.version).subscribe(() => {
      console.log("Save works!");
      this.saving = false;
    });
  }

}
