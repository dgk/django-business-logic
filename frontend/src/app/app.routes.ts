import { Routes, RouterModule } from '@angular/router';

import { BlocklyComponent } from './blockly/blockly.component';
import { InterfaceListComponent } from './interface/interface-list.component';
import { ProgramComponent } from './program/program.component';
import { VersionComponent } from './version/version.component';
import { HomeComponent } from './home/home.component';

import { NoContentComponent } from './no-content/no-content.component';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
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
                    redirectTo: 'version',
                    pathMatch: 'full'

                  },
                  {
                    path:'version',
                    children: [
                      {
                        path: '',
                        component: VersionComponent
                      },
                      {
                        path: ':versionID',
                        component: BlocklyComponent
                      }
                    ]

                  }
                ]

              }
            ]
          }

        ]
      }
    ]
  },
  { path: '**',    component: NoContentComponent },
];
