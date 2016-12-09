import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './components/no-content/no-content.component';

import { DataResolver } from './app.resolver';
import {EditorComponent} from "./components/editor/editor.component";
import {HomePage} from "./pages/HomePage";
import {InterfaceListPage} from "./pages/InterfaceListPage";
import {ProgramListPage} from "./pages/ProgramListPage";
import {VersionListPage} from "./pages/VersionListPage";
import {EditorPage} from "./pages/EditorPage";
import {ExecutionListPage} from "./pages/ExecutionListPage";
import {ReadonlyEditorPage} from "./pages/ReadonlyEditorPage";


export const ROUTES: Routes = [
  { path: '', component: HomePage },
  {
    path: 'execution',
    children: [
      {
        path: '',
        component: ExecutionListPage
      },
      {
        path: ':executionID',
        component: ReadonlyEditorPage
      }
    ]
  },
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
