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
import { ApiResult, IntegralDetail, MemberConfigs } from '../model/index';


@Injectable()
export class IntegralDetailService {
    constructor(private http: HttpClient) { }

    GetIntegralDetailById(params: any): Observable<IntegralDetail[]> {
        return this.http.get('/api/services/app/IntegralDetail/GetWXPagedIntegralDetailAsync', params).map(data => {
            console.log(data);
            console.log(data.result)
            if (data.result) {
                return IntegralDetail.fromJSArray(data.result);
            } else {
                return null;
            }
        });
    }

    GetMemberConfigsByTenantId(params: any): Observable<MemberConfigs[]> {
        return this.http.get('/api/services/app/MemberConfig/GetWXMemberConfigByTenantIdAsync', params).map(data => {
            if (data.result) {
                return MemberConfigs.fromJSArray(data.result);
            } else {
                return null;
            }
        });
    }
}
