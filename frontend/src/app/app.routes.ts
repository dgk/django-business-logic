import { Routes, RouterModule } from '@angular/router';

import { BlocklyComponent } from './blockly/blockly.component';
import { InterfaceListComponent } from './interface/interface-list.component';
import { ProgramComponent } from './program/program.component';
import { VersionComponent } from './version/version.component';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', component: BlocklyComponent },
  {
    path: 'interface',
    children: [
      {
        path: '',
        component: InterfaceListComponent
      },
      {
        path: ':interfaceID',
        children: [
          {
            path: '',
            redirectTo: 'program',
            pathMatch: 'full'
          },
          {
            path: 'program',
            children: [
              {
                path: '',
                component: ProgramComponent
              },
              {
                path: ':programID',
                children:[
                  {
                    path: '',
                    component: VersionComponent
                  },
                  {
                    path: 'version/:versionID',
                    component: BlocklyComponent
                  }
                ]

              }
            ]
          }

        ]
      }
    ]
  },
  // {
  //   path: 'detail', loadChildren: () => System.import('./+detail')
  // },
  { path: '**',    component: BlocklyComponent },
];
