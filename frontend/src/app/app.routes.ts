import { Routes, RouterModule } from '@angular/router';

import { BlocklyComponent } from './components/blockly/blockly.component';
import { InterfaceListComponent } from './components/interface/interface-list.component';
import { ProgramComponent } from './components/program/program.component';
import { VersionComponent } from './components/version/version.component';
import { HomeComponent } from './components/home/home.component';

import { NoContentComponent } from './components/no-content/no-content.component';

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
