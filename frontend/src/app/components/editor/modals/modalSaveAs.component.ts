import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  Validators
} from '@angular/forms';

@Component({
  selector: 'modal-save-as',
  template: `
    <form id="modalSaveAs" class="ui small modal" 
          (ngSubmit)="onSubmit(newTitle.value, newDescription.value)" #modalSaveForm="ngForm">

      <div class="header">
          Save as ...
        </div>
        <div class="content ui form">
            <label>Title of program version</label>
            <input type="text" name="newTitle" [(ngModel)]="version.name" #newTitle="ngModel">
        </div>    
        <div class="content ui form">    
            <label>Description of program version</label>
            <input type="text" name="newDescription" [(ngModel)]="version.verDescription" #newDescription="ngModel">
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

export class ModalSaveAsComponent{
  description = 'This action change current version of program, save anyway?';
  version: any = {};

  @Input('title') title;
  @Input('verDescription') verDescription;

  @Output() onSaveAs = new EventEmitter<any>();

  constructor() {

  }

  ngOnChanges(changes: any){
    if(changes.title){
      this.version.name = changes.title.currentValue;
    }
    if(changes.verDescription){
      this.version.verDescription = changes.verDescription.currentValue;
    }
  }

  onSubmit(newTitle: string, newDescription: string): void {
    let changes = {
      "title": newTitle,
      "description": newDescription
    };
    this.onSaveAs.emit(changes);
  }

  show(){
    $("#modalSaveAs").modal('show');
  }
}
