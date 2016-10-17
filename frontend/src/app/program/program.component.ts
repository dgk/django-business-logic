import { Component,  HostBinding,
  trigger, transition, animate,
  style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'program',
  template: `<p>Program component!</p>`
})

export class ProgramComponent{
  constructor(
    private route: ActivatedRoute,
    private router: Router){

  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log(params);
    });
  }
}
