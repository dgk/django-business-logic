import { Routes, RouterModule } from '@angular/router';

import { BlocklyComponent } from './components/blockly/blockly.component';
import { InterfaceListComponent } from './components/interface/interface-list.component';
import { ProgramComponent } from './components/program/program.component';
import { VersionComponent } from './components/version/version.component';
import { HomeComponent } from './components/home/home.component';

import { NoContentComponent } from './components/no-content/no-content.component';

import { DataResolver } from './app.resolver';
import {EditorComponent} from "./components/editor/editor.component";
import {HomePage} from "./pages/HomePage";
import {InterfaceListPage} from "./pages/InterfaceListPage";
import {ProgramListPage} from "./pages/ProgramListPage";
import {VersionListPage} from "./pages/VersionListPage";
import {EditorPage} from "./pages/EditorPage";


export const ROUTES: Routes = [
  { path: '', component: HomePage },
  {
    path: 'interface',
    children: [
      {
        path: '',
        component: InterfaceListPage
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
                component: ProgramListPage
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
                        component: VersionListPage
                      },
                      {
                        path: ':versionID',
                        component: EditorPage
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
