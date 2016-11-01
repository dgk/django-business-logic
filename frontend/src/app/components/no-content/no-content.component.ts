import { Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BackendService } from '../../backend.service';
import { AppState } from '../../app.service';

@Component({
  selector: 'no-content',
  template: `No Content!`
})

export class NoContentComponent{
  private programs;

  constructor(
    public backend: BackendService,
    private route: ActivatedRoute,
    private router: Router){

  }

  ngOnInit() {


  }
}
