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
import { Shop, ApiResult } from '../model/index';


@Injectable()
export class ShopService {
  constructor(private http: HttpClient) { }

  WechatCreateOrUpdateShop(params: any): Observable<boolean>{
    return this.http.post('/api/services/app/Shop/WechatCreateOrUpdateShop', params).map(data => {
        return <boolean>data.success;
    });
  }

  GetShopByOpenId(params: any): Observable<Shop>{
    return this.http.get('/api/services/app/Shop/GetShopByOpenId', params).map(data => {
        return Shop.fromJS(data.result);
    });
  }
}
