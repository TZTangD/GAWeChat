import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { WechatUserService } from '../personal-center/wechat-user.service';
import { AppConsts } from '../AppConsts';
import { WechatUser } from '../model'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {

    private user: WechatUser;
    openId: string;
    tenantId: string;

    constructor(private wechatUserService: WechatUserService) { }

    setUserId(oid: string, tid: string){
        this.openId = oid;
        this.tenantId = tid;
    }

    setUser(val: any) {
        this.user = WechatUser.fromJS(val);
        if(this.user.headImgUrl.includes('timg-4.jpeg')){//表示默认头像
            this.user.headImgUrl =  AppConsts.remoteServiceBaseUrl + this.user.headImgUrl;
        }
    }

    getUser(): Observable<WechatUser>{
        if(this.user){
            //return this.user;
            return Observable.of(this.user);
        }
        if(this.openId && this.tenantId){
            return this.wechatUserService.GetWeChatUserAsync(this.openId, this.tenantId).map(data => { 
                this.setUser(WechatUser.fromJS(data.result));
                return this.user;
            })
        }
        return Observable.of(<WechatUser>null);
    }
}
