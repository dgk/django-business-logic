import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  Validators
} from '@angular/forms';
import {PostService} from "../services/post.service";

@Component({
  selector: 'modal',
  template: `
    <form id="modal" class="ui small modal" 
          (ngSubmit)="onSubmit()" #modal="ngForm">

      <div class="header" *ngIf="header">
          {{header}}
        </div>
        <div class="content ui form" *ngIf="title">
            <label>{{title}}</label>
            <input type="text" name="titleValue" [(ngModel)]="title_value" #titleValue="ngModel">
        </div>    
        <div class="content ui form" *ngIf="description">    
            <label>{{description}}</label>
            <input type="text" name="descriptionValue" [(ngModel)]="description_value" #descriptionValue="ngModel">
        </div>
        
        <div class="image content" *ngIf="content">
          <div class="description">
            <p>{{content}}</p>
          </div>
        </div>
      <div class="actions">
        <button type = "button" class="ui grey deny button">
          Cancel
        </button>
        <button type="submit" class="ui positive right labeled icon button">
          Yes
          <i class="checkmark icon"></i>
        </button>
      </div>
    </form>`

})

export class ModalComponent{
  version: any = {};

  @Input() title: any;
  @Input() description: any;
  @Input() content: any;
  @Input() header: any;

  @Input() title_value: any;
  @Input() description_value: any;

  @Output() submit = new EventEmitter<any>();

  constructor() {

  }

  onSubmit(): void {
    this.submit.emit({
      title: this.title_value,
      description: this.description_value
    });
  }

  show(){
    $("#modal").modal('show');
  }
}
