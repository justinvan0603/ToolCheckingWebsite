import { Routes, RouterModule }  from '@angular/router';


import { ModuleWithProviders } from '@angular/core';
import {Domains} from './domains.component'
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Domains ,
    children: [
      { path: 'domainlist', component:  }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
