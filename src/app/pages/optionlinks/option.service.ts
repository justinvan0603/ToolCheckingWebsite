import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



import { Option } from "./option";


import { ItemsService } from "../shared/utils/items.service";
import { ConfigService } from "../shared/utils/config.service";
import { PaginatedResult, Pagination } from "../shared/interfaces";
import { OptionLinkUpdateObject } from "./optionupdateobject";

@Injectable()
export class OptionService {

    _baseUrl: string = '';

    constructor(private http: Http,
        private itemsService: ItemsService,
        private configService: ConfigService) {
        this._baseUrl = configService.getApiURI()+ 'Options';
    }
   getOption(domain: string)
   {
        let headers = new Headers();
         headers.append('Content-Type', 'application/json');
         return this.http.get(this._baseUrl + '?domain=' + domain)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
   }
   updateOption(option:OptionLinkUpdateObject)
   {
            let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this._baseUrl + '/' + option.OPTION.ID, JSON.stringify(option), {
            headers: headers
        })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
   }
    // getOptionLinks(domain: string,page?: number, itemsPerPage?: number): Observable<PaginatedResult<Option[]>> {
    //     var peginatedResult: PaginatedResult<Option[]> = new PaginatedResult<Option[]>();

    //     let headers = new Headers();
    //     if (page != null && itemsPerPage != null) {
    //         headers.append('Pagination', page + ',' + itemsPerPage);
    //     }

    //     return this.http.get(this._baseUrl +'?domain=' +domain, {
    //         headers: headers
    //     })
    //         .map((res: Response) => {
    //             console.log(res.headers.keys());
    //             peginatedResult.result = res.json();

    //             if (res.headers.get("Pagination") != null) {
    //                 //var pagination = JSON.parse(res.headers.get("Pagination"));
    //                 var paginationHeader: Pagination = this.itemsService.getSerialized<Pagination>(JSON.parse(res.headers.get("Pagination")));
    //                 console.log(paginationHeader);
    //                 peginatedResult.pagination = paginationHeader;
    //             }
    //             return peginatedResult;
    //         })
    //         .catch(this.handleError);
    // }




    // updateOptionLink(optionlinks: Option[]): Observable<void> {

    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');

    //     return this.http.post(this._baseUrl, JSON.stringify(optionlinks), {
    //         headers: headers
    //     })
    //         .map((res: Response) => {
    //             return;
    //         })
    //         .catch(this.handleError);
    // }


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