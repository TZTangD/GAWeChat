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
import { GoodSource } from '../model';


@Injectable()
export class GoodSourceService {
    constructor(private http: HttpClient) { }

    getSource(input: any): Observable<GoodSource[]> {
        return this.http.get('/api/services/app/GoodSource/GetPagedGoodSourcesForWeChatAsync', input).map(data => {
            return data.result;
        });
    }

}