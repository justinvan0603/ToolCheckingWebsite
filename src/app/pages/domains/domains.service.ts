import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from "../shared/utils/config.service";
import { ItemsService } from "../shared/utils/items.service";
import { PaginatedResult, Pagination } from "../shared/interfaces";
import { Domain } from "./domain";

@Injectable()
export class DataService {

    _baseUrl: string = '';

    constructor(private http: Http,
        private itemsService: ItemsService,
        private configService: ConfigService) {
        this._baseUrl = configService.getApiURI()+ 'Domains';
    }
   
    getDomains(page?: number, itemsPerPage?: number): Observable<PaginatedResult<Domain[]>> {
        var peginatedResult: PaginatedResult<Domain[]> = new PaginatedResult<Domain[]>();

        let headers = new Headers();
        if (page != null && itemsPerPage != null) {
            headers.append('Pagination', page + ',' + itemsPerPage);
        }

        return this.http.get(this._baseUrl +'?userid=1056', {
            headers: headers
        })
            .map((res: Response) => {
                console.log(res.headers.keys());
                peginatedResult.result = res.json();

                if (res.headers.get("Pagination") != null) {
                    //var pagination = JSON.parse(res.headers.get("Pagination"));
                    var paginationHeader: Pagination = this.itemsService.getSerialized<Pagination>(JSON.parse(res.headers.get("Pagination")));
                    console.log(paginationHeader);
                    peginatedResult.pagination = paginationHeader;
                }
                return peginatedResult;
            })
            .catch(this.handleError);
    }

    getDomain(id: number): Observable<Domain> {
        return this.http.get(this._baseUrl + id)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }


    updateDomain(domain: Domain): Observable<void> {
        console.log(domain);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this._baseUrl +'/' + domain.ID, JSON.stringify(domain), {
            headers: headers
        })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    createDomain(user: Domain): Observable<Domain> {
        console.log(user);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json,');
        //headers.append('Accept', 'application/json');
        //let data = {'users': user,'domain': user.Domain};
        return this.http.post(this._baseUrl, JSON.stringify(user), {headers: headers})
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    deleteDomain(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + '/' + id)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';

        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }
}