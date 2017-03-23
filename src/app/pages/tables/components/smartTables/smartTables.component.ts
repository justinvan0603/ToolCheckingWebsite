import { Component } from '@angular/core';

//import { SmartTablesService } from './smartTables.service';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';

import { BasicExampleLoadService } from './basic-example-load.service';

import 'style-loader!./smartTables.scss';
import { Http } from '@angular/http/src/http';
import { CourseService } from "../../services/course.service";
import { ICourse } from "../../defines/course.interface";
@Component({
  selector: 'smart-tables',
  templateUrl: `
    <ng2-smart-table 
      [settings]="settings" 
      [source]="source" 
      (deleteConfirm)="onDeleteConfirm($event)"
      (editConfirm)="onSaveConfirm($event)"
      (createConfirm)="onCreateConfirm($event)"></ng2-smart-table>
  `
})

export class SmartTables {

  query: string = '';
  valid:boolean = false;


  // settings = {
  //   columns: {
  //   
  //   }
  // };

   settings = {
    delete: {
      confirmDelete: true
    },
    add: {
      confirmCreate: true
    },
    edit: {
      confirmSave: true
    },
     columns: {



      Id: {
        title: 'Id'
      },
      DOMAIN_ID: {
        title: 'DOMAIN_ID'
      },
      DOMAIN: {
        title: 'DOMAIN'
      }


      //   id: {
      //   title: 'ID'
      // },
      // albumId: {
      //   title: 'Album'
      // },
      // title: {
      //   title: 'Title'
      // },
      // url: {
      //   title: 'Url'
      // }

    }
  };

  //source: LocalDataSource = new LocalDataSource();

 // constructor(protected service: CourseService) {
   // this.service.getItems();
 // }

  // constructor(protected service: SmartTablesService) {
  //   this.source = new LocalDataSource();

  //   this.service.getData().then((data) => {
  //     this.source.load(data);
  //   })
  // }

  source: ServerDataSource;

  constructor(http: Http, protected service: CourseService) {
 
   this.source = new ServerDataSource(http, { endPoint: 'http://localhost:9823/api/Domains/' });
   // this.source = new ServerDataSource(http, { endPoint: 'https://jsonplaceholder.typicode.com/photos' });

//  this.service.getData().then((data) => {
//       this.source.load(data);
//     })
}


  //   constructor(http: Http) {
 
  //   this.source = new ServerDataSource(http, { endPoint: 'http://localhost:9823/api/Domains/' });
  // }

  onDeleteConfirm(event): void {
    console.log(event);
   // this.service.deleteItem(event.data.Id);
   console.log(this.source);
 //  this.source.data.remove(event.data);
//   this.source.data

		//	(data: ICourse) => this.removeCourseFromArray(id)
//		(data: ICourse) => this.getItems()

  //  this.valid = true;
    if (window.confirm('Are you sure you want to delete?')) {
	    // this.service.deleteItem(event.data.Id).subscribe(
      // );
   //   event.newData['name'] += ' + added in code';
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  onSaveConfirm(event): void {
    console.log(event.newData);
    // 	let course: ICourse	= {
		// 	DOMAIN		: event.newData.DOMAIN,
		// 	Status		: event.newData.Status
		// };

     
     this.service.editItem(event.newData).subscribe(
    
    
		);
       event.confirm.resolve(event.newData)
   // this.confirm.confirmSave(true)
//     event.newData['name'] += ' + added in code';
  }

  onCreateConfirm(event): void {

    console.log(event.newData);
	let course: ICourse	= {
			DOMAIN		: event.newData.DOMAIN,
			Status		: event.newData.Status
		};
    	this.service.addItem(event.newData).subscribe(
          event.confirm.resolve(event.newData)
		//	(data: ICourse) => this.updateCourseFromArray(this.selectedCourse)
		);
    // if (window.confirm('Are you sure you want to create?')) {

    //   event.confirm.resolve(event.newData);
    // } else {
    //   event.confirm.reject();
    // }
  }



}
