import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ListMessageService} from './listmessages.service'
import { Message } from './message';
import { Observable } from "rxjs/Observable";
import { LocalDataSource,ServerDataSource } from "ng2-smart-table/ng2-smart-table";

@Component({
  selector: 'listmessages',
  templateUrl: '/listmessages.html',
  styles: ['.IdColumn { display:none }']
})
export class ListMessagesComponent 
{
    
settings = {

     add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {

      // id: {
      //   title: 'Id'
      // },
    
      DOMAIN_ID: {
        title: 'DOMAIN_ID'
      },
      DOMAIN: {
        title: 'DOMAIN'
      }
    }
  };

  data2: Message[] = [];
  ngOnInit(){
		this.getItems();
   
	}

  getItems(){
		this._listMessageService.getListMessages().subscribe(      
			(data: Message[]) => {
        this.data2 = data
       this.source = new LocalDataSource(this.data2);
        
      }
      
		);
	}

  source: LocalDataSource;

  constructor(private _listMessageService: ListMessageService) {
  //  this.source = new LocalDataSource(this.data2);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
        //this._courseService.deleteItem(event.data.Id).subscribe(
       // event.confirm.resolve(event.data)
		//);   
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event): void {
    event.newData['name'] += ' + added in code';
   
    //this._courseService.editItem(event.newData).subscribe(
     // event.confirm.resolve(event.newData)
       
	//	);   
    
    
  }

   

}