import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';




import { routing }       from './messages.routing';

import { Messages } from './messages.component';
import { ListMessagesComponent } from "./components/listmessages/listmessages.component";
import { ListMessageService } from "./components/listmessages/listmessages.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
  ],
  declarations: [
    Messages,
    ListMessagesComponent
  ],
  providers: [
    ListMessageService
  ]
})
export class MessageModule {
  
}