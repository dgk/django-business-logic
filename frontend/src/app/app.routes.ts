import { Routes, RouterModule } from '@angular/router';

import { BlocklyComponent } from './blockly/blockly.component';
import { InterfaceComponent } from './interface/interface.component';
import { ProgramComponent } from './program/program.component';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: BlocklyComponent },
  { path: 'interface',  component: InterfaceComponent },
  { path: 'program/:id', component: ProgramComponent },
  // {
  //   path: 'detail', loadChildren: () => System.import('./+detail')
  // },
  { path: '**',    component: BlocklyComponent },
];
