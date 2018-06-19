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
import { Level, AccountLevels } from '../model';


@Injectable()
export class LevelAccountAccpintService {
    constructor(private http: HttpClient) { }

    private monthAccount: AccountLevels;
    private quarterAccount: AccountLevels;
    private halfYearAccount: AccountLevels;

    private level: Level;

    private customerId: string = '';
    private monthCid: string = '';
    private quarterCid: string = '';
    private yearCid: string = '';

    getAccount(input: any): Observable<AccountLevels> {
        if (input.span == 1 && this.monthAccount && this.monthCid == input.userId) {
            return Observable.of(this.monthAccount);
        } else if (input.span == 3 && this.quarterAccount && this.quarterCid == input.userId) {
            return Observable.of(this.quarterAccount);
        } else if (input.span == 6 && this.halfYearAccount && this.yearCid == input.userId) {
            return Observable.of(this.halfYearAccount);
        }
        return this.http.get('/api/services/app/Product/GetCustAndAccountInfoAsync', input, true).map(data => {
            if (input.span == 1) {
                this.monthAccount = data.result;
                this.monthCid = input.userId;
            } else if (input.span == 3) {
                this.quarterAccount = data.result;
                this.quarterCid = input.userId;
            } else if (input.span == 6) {
                this.halfYearAccount = data.result;
                this.yearCid = input.userId;
            }
            
            return data.result;
        });
    }
    getLevel(input: any): Observable<Level> {
        if (this.level && this.customerId == input.userId) {
            return Observable.of(this.level);
        }
        return this.http.get('/api/services/app/Product/GetRetailBasicInfoAsync', input, true).map(data => {
            this.level = data.result;
            this.customerId = input.userId;
            return data.result;
        });
    }
}