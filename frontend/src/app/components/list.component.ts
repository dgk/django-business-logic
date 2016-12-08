import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'block-list',
  template: `<div class="ui container segment">
                <div class="ui relaxed divided list">
                  <div class="item" *ngFor = "let item of list" (click) = "onSelect(item)">
                    <i class="{{list_icon}} middle aligned icon color_blue"></i>
                    <div class="content">
                      <a class="header">{{item.title || item.id}}</a>
                      <div class="description">{{item.description}}</div>
                      
                      <div class="description" *ngIf="!item.description && item.start_time">
                        <b>Launched:</b> <i>{{item.start_time | date: 'dd.MM.yyyy HH:mm:ss'}}</i>
                        <b>run time:</b> <i class="color_blue">{{ calculateDelta(item.finish_time, item.start_time) }} (seconds)</i>
                      </div>
                      
                      <div class="description" *ngIf="!item.description && item.modification_time">
                        <b>Updated:</b> <i>{{item.modification_time | date: 'dd.MM.yyyy HH:mm:ss'}}</i>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              `,
  styleUrls: ['../css/list.component.css']
})
export class ListComponent {

  @Input() list: any;
  @Input() list_icon: string;
  @Output() select = new EventEmitter();

  onSelect(item){
    this.select.emit(item);
  }

  calculateDelta(finish, start){
    return Math.abs(new Date(finish) - new Date(start)) / 1000;
  }
}
