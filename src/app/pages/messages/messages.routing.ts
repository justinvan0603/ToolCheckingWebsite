import { Routes, RouterModule }  from '@angular/router';

import { ListMessagesComponent } from './components/listmessages/listmessages.component';
import { ModuleWithProviders } from '@angular/core';
import {Messages} from './messages.component'
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Messages ,
    children: [
      { path: 'messagelist', component: ListMessagesComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
