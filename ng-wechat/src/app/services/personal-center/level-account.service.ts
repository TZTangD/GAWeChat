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
import { Accounts, Level, AccountLevels } from '../model';


@Injectable()
export class LevelAccountAccpintService {
    constructor(private http: HttpClient) { }

    getAccount(code: any): Observable<AccountLevels>{
       return this.http.get('/api/services/app/Product/GetCustAndAccountInfoAsync',code).map(data=>{
           return data.result;
        });
    }
    getLevel(input :any):Observable<Level>{
        return this.http.get('/api/services/app/Product/GetRetailBasicInfoAsync',input).map(data=>{
            return data.result;
        });
    }
}