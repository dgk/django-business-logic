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
import {EnvironmentService} from "../../services/environment.service";

import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {SimpleNotificationsComponent} from 'angular2-notifications/src/simple-notifications.component';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styles: [`
         .ui.section{
            top: 10px!important;
            right: 10px!important;
            position: absolute;
         }
         .header{
            text-transform: none!important;
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
  xmlForFunctionLibs: any;

  public options = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    // animate: 'scale',
    position: ['right', 'bottom']
  };

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
    private environment: EnvironmentService,
    private ver: VersionService,

    private notification: NotificationsService){
  }


  ngAfterViewInit() {

    $(".ui.dropdown").dropdown();

    this.blocks.init();

    this.route.params.subscribe(params => {

      this.base.fetchAll( +params["interfaceID"], +params["programID"], +params["versionID"] ).subscribe(() => {

        this.version = this.base.currentVersion;
        this.title = this.version.title;
        this.verDescription = this.version.description;

        console.log(this.environment.getEnvironment());

        this.params["Interface"] = this.base.programInterfaces.getCurrent().getTitle();
        this.params["Program"] = this.base.programs.getCurrent().getTitle();
        this.params["Version"] = this.base.versions.getCurrent().getTitle();

        if( this.environment.getEnvironment() ){
          this.xmlForFunctionLibs = this.environment.generateXmlForToolbox();
        }else{
          this.xmlForFunctionLibs = '';
        }

        this.ref.fetchReferenceDescriptors().subscribe(() => {
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

    this.ver.saveAsVersion(this.version)
      .subscribe(
        data => {
          this.saving = false;
          this.notification.success('Success!', 'Version saved!');

          //TODO: redirect to new version!
          // let id = data.id.toString();
          // this.router.navigate([ id ], { relativeTo: this.route.parent });
        },
        err => {
          this.saving = false;
          this.notification.error('Error!', 'Saving failed');
        },
        () => {}
      );
  }

  onSave(xml: string) {

    this.version.xml = xml;

    this.saving = true;

    this.ver.saveVersion(this.version)
      .subscribe(
        data => {
          this.saving = false;
          this.notification.success('Success!', 'Version saved!');
        },
        err => {
          this.saving = false;
          this.notification.error('Error!', 'Saving failed');
        },
        () => {}
      );

  }

}
