import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { HttpClient } from '../httpclient'
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { Customers } from '../model';


@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) { }
    getAll(input: any): Observable<Customers[]> {
        return this.http.get('/api/services/app/Retailer/GetAllRetailByPageAsync', input).map(data => {
            if (data.result) {
                return Customers.fromJSArray(data.result);
            } else {
                null;
            }
        });
    }
    getSingle(params:any):Observable<Customers>{
        return this.http.get('/api/services/app/Retailer/GetRetailerByIdDtoForWeChatAsync',params).map(data=>{
            return data.result;
        });
    }
}