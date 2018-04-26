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
import { WechatUser } from '../model/index';


@Injectable()
export class WechatUserService {
  constructor(private http: HttpClient) { }

  GetWeChatUserAsync(oId:string, tId:string): Observable<any> {
    if(tId == '0'){
      return this.http.get('/api/services/app/WeChatUser/GetWeChatUserAsync',{ openId: oId});
    }
    return this.http.get('/api/services/app/WeChatUser/GetWeChatUserAsync',{ openId: oId, tenantId: tId});
  }
  
}
