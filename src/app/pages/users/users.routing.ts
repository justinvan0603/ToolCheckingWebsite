import { Routes, RouterModule }  from '@angular/router';


import { ModuleWithProviders } from '@angular/core';
import { ListUserComponent } from "./components/listusers/listusers.component";
import { Users } from "./users.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Users ,
    children: [
      { path: 'userlist', component: ListUserComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
