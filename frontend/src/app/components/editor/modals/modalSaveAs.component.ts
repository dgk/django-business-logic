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
          (ngSubmit)="onSubmit(newTitle.value)" #modalSaveForm="ngForm">

      <div class="header">
          Save
        </div>
        <div class="image content ui form">
            <label>Name of program version</label>
            <input type="text" name="newTitle" [(ngModel)]="version.name" #newTitle="ngModel">
        </div>
      <div class="actions">
        <button class="ui grey deny button">
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
  @Output() onSaveAs = new EventEmitter<string>();

  constructor() {

  }

  ngOnChanges(changes: any){
    if(changes.title){
      this.version.name = changes.title.currentValue;
    }
  }

  onSubmit(newTitle: string): void {
    this.onSaveAs.emit(newTitle);
  }

  show(){
    $("#modalSaveAs").modal('show');
  }
}
