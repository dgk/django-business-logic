import { Component, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

import * as actionsInfo from "../actions/info";

import {Observable} from "rxjs";
import {RestService} from "../services/rest.service";
import * as actions from "../actions/versionList";
import * as actionsProgram from "../actions/programList";
import * as actionsVersionList from "../actions/versionList";
import * as actionsPrInterface from '../actions/prInterfaceList';
import {PostService} from "../services/post.service";
import {stateService} from "../services/state.service";


@Component({
  selector: 'version-list-page',
  template: `
        <!--<div class="ui container">-->
           <!--<div class="ui grid one column">-->
              <!--<div class="row">-->
                  <!--&lt;!&ndash;<div class="column">&ndash;&gt;-->
                      <!--&lt;!&ndash;<h2 class="ui center aligned icon medium header">&ndash;&gt;-->
                        <!--&lt;!&ndash;Versions&ndash;&gt;-->
                      <!--&lt;!&ndash;</h2>&ndash;&gt;-->
                  <!--&lt;!&ndash;</div>&ndash;&gt;-->
                  <!--<div class="column" align="right">-->
                      <!--<button class="ui active button blue" (click)="modal.show()">-->
                          <!--<i class="plus icon"></i>-->
                          <!--Create-->
                      <!--</button>-->
                  <!--</div>-->
              <!--</div>-->
          <!--</div>       -->
        <!--</div>-->
        <!--<br>-->
        
        <div class="btn-group">
            <button class="btn-group-item" (click)="modal.show()"><i class="plus icon"></i> Create</button>
        </div>
        
        <modal #modal 
               [header]="'Create empty program version'" 
               [title]="'Title'" 
               [title_value]="''" 
               [description]="'Description'" 
               [description_value]="''" 
               [content]="false"
               (submit)="onCreate($event)"></modal>
       
        <block-list (select)="onSelect($event)" [list] = "list | async"  [list_icon] = "icon"></block-list>
    `
})
export class VersionListPage {
  list: any;
  icon = "file text";

  private programID: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private state: stateService) {

    this.list = this.store.let(fromRoot.getVersions);

  }

  ngOnInit() {

    this.store.dispatch(new actionsInfo.SetStepAction("VersionList"));

    this.route["params"].subscribe(params => {
      this.store.dispatch(new actionsProgram.SetCurrentAction(+params["programID"]));
      this.store.dispatch(new actionsPrInterface.SetCurrentAction(+params["interfaceID"]));
    });

  }

  onSelect(item){
    this.store.dispatch(new actions.SetCurrentAction(item["id"]));
    this.router.navigate([item["id"]], { relativeTo: this.route });
  }

  onCreate($event){
    // this.post.createNewVersion($event["title"], $event["description"]).subscribe(() => {});
    let data = Object.assign({}, $event, {
      programID: this.state.getState()['programs'].currentID
    });

    this.store.dispatch(new actionsVersionList.createAction(data));

    this.store.let(fromRoot.getCurrentVersionID).subscribe(id => {
      this.router.navigate(['tmp'], { relativeTo: this.route });
    });
  }

}
