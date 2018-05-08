import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { WechatUserService } from '../personal-center/wechat-user.service';
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

    constructor(private wechatUserService: WechatUserService, private httpClient: HttpClient) { }

    setUserId(oid: string, tid: string) {
        if (tid == '0') {
            tid = null;
        }
        this.openId = oid;
        this.tenantId = tid;
    }

    setUser(val: any) {
        this.user = WechatUser.fromJS(val);
        if (this.user.headImgUrl.includes('timg-4.jpeg')) {//表示默认头像
            this.user.headImgUrl = AppConsts.remoteServiceBaseUrl + this.user.headImgUrl;
        }
    }

    getUser(): Observable<WechatUser> {
        if (this.user) {
            //return this.user;
            return Observable.of(this.user);
        }
        if (this.openId) {
            return this.wechatUserService.GetWeChatUserAsync(this.openId, this.tenantId).map(data => {
                this.setUser(data);
                return this.user;
            })
        }
        return Observable.of(<WechatUser>null);
    }

    getJsApiConfig(url): Observable<JsApiConfig> {
        return this.httpClient.get('/GAWX/GetJsApiConfig',{ url: url }).map(ret => {
            if (!ret.success) {
                console.error('jsapi 获取失败');
                return null;
            }
            this.jsApiConfig = JsApiConfig.fromJS({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: ret.result.appId, // 必填，公众号的唯一标识
                timestamp: parseInt(ret.result.timestamp), // 必填，生成签名的时间戳
                nonceStr: ret.result.nonceStr, // 必填，生成签名的随机串
                signature: ret.result.signature,// 必填，签名
                jsApiList: [] // 必填，需要使用的JS接口列表
            });
            return this.jsApiConfig;
        });
    }
}
