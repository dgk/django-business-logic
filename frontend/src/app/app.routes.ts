import { Routes, RouterModule } from '@angular/router';

import { BlocklyComponent } from './version-editor/blockly.component';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: BlocklyComponent },
  { path: 'home',  component: BlocklyComponent },
  { path: 'about', component: BlocklyComponent },
  // {
  //   path: 'detail', loadChildren: () => System.import('./+detail')
  // },
  { path: '**',    component: BlocklyComponent },
];
