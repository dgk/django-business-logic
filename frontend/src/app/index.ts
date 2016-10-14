/**
 * Created by Infirex on 5/27/2016.
 */

import {BackendService} from './backend.service';
import {BreadcrumbService} from './breadcrumb.service';

// Application wide providers
export const APP_PROVIDERS = [
  BackendService,
  BreadcrumbService
];
export {ProgramInterfaceComponent as AppComponent} from './program-interface.component';
