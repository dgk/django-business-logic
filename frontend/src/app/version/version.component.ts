import { Component,  HostBinding,
  trigger, transition, animate,
  style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'version',
  template: `<p>Version component!</p>`
})

export class VersionComponent{
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
