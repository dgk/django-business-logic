import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'block-list',
  template: `<div class="ui container segment">
                <div class="ui relaxed divided list">
                  <div class="item" *ngFor = "let item of list" (click) = "onSelect(item)">
                    <div class="content">
                      <a class="header">{{item.title || item.id}}</a>
                      <div class="description">{{item.description}}</div>
                    </div>
                  </div>
                </div>
              </div>
              `
})
export class ListComponent {

  @Input() list: any;
  @Output() select = new EventEmitter();

  onSelect(item){
    this.select.emit(item);
  }
}
