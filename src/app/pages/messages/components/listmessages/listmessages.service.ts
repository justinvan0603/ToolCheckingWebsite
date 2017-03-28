import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
 import {Message} from './message'

 @Injectable()
 export class ListMessageService
 {
     private apiUrl = 'http://localhost:9823/api/Messages/';
     constructor(private _httpService : Http)
     {

     }
     getListMessages() : Observable<Message[]>{
         return this._httpService.get(this.apiUrl).map(this.extractData).catch(this.handleError);
     }
     private extractData(res: Response) {
		return res.json() || { };
	}

	private handleError (error: Response | any) {

		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}

		return Observable.throw(errMsg);
	}
 }