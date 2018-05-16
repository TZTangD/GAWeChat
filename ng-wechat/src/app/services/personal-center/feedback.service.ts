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
import { FeedBack } from '../model';


@Injectable()
export class FeedBackService {
    constructor(private http: HttpClient) { }

    createOrUpdateFeedBack(input: any): Observable<any> {
        return this.http.post('/api/services/app/Advise/SubmitAdviseAsync', input, null, true).map(data => {
            return data.result;
        });
    }

}