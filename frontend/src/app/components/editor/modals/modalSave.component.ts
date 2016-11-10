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
  selector: 'modal-save',
  template: `
    <form id="modalSave" class="ui small modal" 
          (ngSubmit)="onSubmit()" #modalSaveForm="ngForm">

      <div class="header">
          Save
        </div>
        <div class="image content">
          <div class="description">
            <p>{{description}}</p>
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

export class ModalSaveComponent{
  description = 'This action change current version of program, save anyway?';

  @Output() onSave = new EventEmitter();

  constructor() {

  }

  onSubmit(): void {
    this.onSave.emit();
  }

  show(){
    $("#modalSave").modal('show');
  }
}
