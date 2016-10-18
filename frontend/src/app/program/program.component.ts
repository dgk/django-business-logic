import { Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BackendService } from '../backend.service';
import { AppState } from '../app.service';

@Component({
  selector: 'program',
  template: `<md-list>
                <md-list-item *ngFor="let program of programs" (click)="onSelect(program.id)">
                  <h3 md-line>{{program.title}}</h3>
                </md-list-item>
              </md-list>`
})

export class ProgramComponent{
  private programs;

  constructor(
    public backend: BackendService,
    private route: ActivatedRoute,
    private router: Router){

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let interfaceID = +params['interfaceID'];

      this.backend.listPrograms(interfaceID).subscribe(
        envelope => {
          this.programs = envelope.results;
          console.log('*** ', this.programs);
        }

      );
    });

  }

  onSelect(id: number){
    this.router.navigate([id], { relativeTo: this.route });
  }
}
