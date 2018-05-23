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
import { ApiResult, ShopEvaluation } from '../model/index';


@Injectable()
export class ShopEvaluationService {
    constructor(private http: HttpClient) { }
    GetPurchaseRecordById(params: any): Observable<ShopEvaluation[]> {
        return this.http.get('/api/services/app/ShopEvaluation/GetWXPagedPurchaseRecordAsync', params).map(data => {
            if (data.result) {
                return ShopEvaluation.fromJSArray(data.result);
            } else {
                return null;
            }
        });
    }

    SubmitShopEvaluationAsync(input: any): Observable<any> {
        return this.http.post('/api/services/app/ShopEvaluation/SubmitShopEvaluationAsync', input).map(data => {
            return data.result;
        });
    }
}
