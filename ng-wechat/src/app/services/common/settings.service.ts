import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient } from '../httpclient';
import { AppConsts } from '../AppConsts';
import { WechatUser, JsApiConfig } from '../model'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {

    private user: WechatUser;
    openId: string;
    tenantId: string;
    private jsApiConfig: JsApiConfig;

    constructor(private httpClient: HttpClient) { }

    load(): Promise<any> {
        if (this.openId) {
            return new Promise<any>((resolve, reject) => {
                resolve(null);
            });
        } else {
            return new Promise<any>((resolve, reject) => {
                this.httpClient.get('/GAWX/GetCurrentUserOpenId').subscribe(ret => {
                    if (!ret.success) {
                        console.error('openid获取失败');
                        resolve(null);
                        return;
                    }
                    if (ret.result.code != 0) {
                        console.error(ret.result.msg);
                        resolve(null);
                        return;
                    }
                    this.setUserId(ret.result.data.openId, ret.result.data.tenantId);
                    resolve(ret);
                });
            });
        }
    };

    setUserId(oid: string, tid: string) {
        if (tid == '0') {
            tid = null;
        }
        this.openId = oid;
        this.tenantId = tid;
    }

    setUser(val: any) {
        this.user = WechatUser.fromJS(val);
    }

    getUser(): Observable<WechatUser> {
        if (this.user) {
            //return this.user;
            return Observable.of(this.user);
        }
        if (this.openId) {
            return this.GetWeChatUserAsync(this.openId, this.tenantId).map(data => {
                this.setUser(data);
                return this.user;
            })
        }
        return Observable.of(<WechatUser>null);
    }

    getJsApiConfig(url): Observable<JsApiConfig> {
        return this.httpClient.get('/GAWX/GetJsApiConfig', { url: url }).map(ret => {
            if (!ret.success) {
                console.error('jsapi 获取失败');
                return null;
            }
            this.jsApiConfig = JsApiConfig.fromJS({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: ret.result.appId, // 必填，公众号的唯一标识
                timestamp: parseInt(ret.result.timestamp), // 必填，生成签名的时间戳
                nonceStr: ret.result.nonceStr, // 必填，生成签名的随机串
                signature: ret.result.signature,// 必填，签名
                jsApiList: [] // 必填，需要使用的JS接口列表
            });
            return this.jsApiConfig;
        });
    }

    GetWeChatUserAsync(oId:string, tId:string): Observable<WechatUser> {
        let param: any = {};
        param.openId = oId;
        if(tId){
          param.tenantId = tId;
        }
        return this.httpClient.get('/api/services/app/WeChatUser/GetWeChatUserAsync', param).map(data => {
          return WechatUser.fromJS(data.result);
        });
      }
}
