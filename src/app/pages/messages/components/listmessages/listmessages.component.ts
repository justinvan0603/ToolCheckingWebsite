import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ListMessageService} from './listmessages.service'
import { Message } from './message';
import { Observable } from "rxjs/Observable";
@Component({
  selector: 'listmessages',
  templateUrl: '/listmessages.html',
  styles: ['.IdColumn { display:none }']
})
export class ListMessagesComponent 
{
    

    listMessages: Message[];
    constructor(protected service: ListMessageService){
           //this.service.getListMessages().subscribe(val => this.listMessages =val);
          
    }
   

}