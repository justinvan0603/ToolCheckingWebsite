import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';




import { routing } from './users.routing';
import { Users } from "./users.component";
import { ListUserComponent } from "./components/listusers/listusers.component";
import { UsersService } from "./components/users.service";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
  ],
  declarations: [
    Users,
    ListUserComponent
  ],
  providers: [
    UsersService
  ]
})
export class UserModule {
  
}