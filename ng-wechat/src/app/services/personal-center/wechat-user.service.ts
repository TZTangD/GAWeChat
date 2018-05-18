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
import { WechatUser, ApiResult } from '../model/index';


@Injectable()
export class WechatUserService {
  constructor(private http: HttpClient) { }

  GetWeChatUserByMemberBarCodeAsync(mCode:string, tId:string): Observable<WechatUser> {
    let param: any = {};
    param.memberBarCode = mCode;
    if(tId){
      param.tenantId = tId;
    }
    return this.http.get('/api/services/app/WeChatUser/GetWeChatUserByMemberBarCodeAsync', param).map(data => {
      return WechatUser.fromJS(data.result);
    });
  }

  BindMemberAsync(params: any): Observable<ApiResult<WechatUser>>{
    return this.http.post('/api/services/app/WeChatUser/BindMemberAsync', params).map(data => {
      let result = new ApiResult<WechatUser>();
      result.code = data.result.code;
      result.msg = data.result.msg;
      result.data = WechatUser.fromJS(data.result.data);
      return result;
    });
  }

  BindWeChatUserAsync(params: any): Observable<ApiResult<WechatUser>>{
    return this.http.post('/api/services/app/WeChatUser/BindWeChatUserAsync', params).map(data => {
      let result = new ApiResult<WechatUser>();
      result.code = data.result.code;
      result.msg = data.result.msg;
      result.data = WechatUser.fromJS(data.result.data);
      return result;
    });
  }

  getSingleWeChatUser(params:any):Observable<WechatUser>{
    return this.http.get('/api/services/app/WeChatUser/GetSingleWeChatUser',params).map(data=>{
      return WechatUser.fromJS(data);
    })
  }
  
}
