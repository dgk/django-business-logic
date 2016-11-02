import { Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppState } from '../../app.service';

@Component({
  selector: 'no-content',
  template: `No Content!`
})

export class NoContentComponent{
  private programs;

  constructor(
    private route: ActivatedRoute,
    private router: Router){

  }

  ngOnInit() {


  }
}
