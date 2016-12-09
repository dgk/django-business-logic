import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import {Store, State} from "@ngrx/store";
import {Observable} from "rxjs";
import {stateService} from "../services/state.service";


@Component({
  selector: 'help-card',
  template: `
    <div class="ui card">
      <div class="content">
        <div class="header"><i class="help circle icon"></i>Helper</div>
      </div>
      <div class="content">
      
        <h4 class="ui sub header">Previous value :</h4>
        <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">
                  {{previous_value}}
              </div>
            </div>
          </div>
        </div>  
        <h4 class="ui sub header">Current value :</h4>
        <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">
                  {{current_value}}
              </div>
            </div>
          </div>
        </div>
        
      </div>  
    </div>`,
  styleUrls: ['../css/helpcard.component.css'],
  providers: []
})


export class HelpCardComponent {
  @Input() previous_value: any;
  @Input() current_value: any;
}
