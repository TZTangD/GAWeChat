import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { JWeiXinService } from 'ngx-weui/jweixin';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AppConsts } from './services';

/**
 * 微信JS-SDK服务器
 */
@Injectable()
export class WXService {
    private static DEFAULTSHARE: any = {
        title: 'Site Name',
        desc: '',
        link: '',
        imgUrl: ''
    };
    constructor(private wxService: JWeiXinService, private http: HttpClient) { }

    private share: any;
    config(shareData: any): Promise<boolean> {
        this.share = shareData;
        return new Promise((resolve, reject) => {
            this.wxService.get().then((res) => {
                if (!res) {
                    reject('jweixin.js 加载失败');
                    return;
                }

                wx.ready(() => {
                    this._onMenuShareTimeline()
                        ._onMenuShareAppMessage()
                        ._onMenuShareQQ()
                        ._onMenuShareQZone()
                        ._onMenuShareWeibo();

                    resolve();
                });
                wx.error(() => {
                    reject('config 注册失败');
                });

                this.http
                    .get(AppConsts.remoteServiceBaseUrl + '/GAWX/GetJsApiConfig')
                    .pipe(
                        catchError((error: Response | any) => {
                            reject('无法获取签名数据');
                            return Observable.throw('error');
                        })
                    )
                    .subscribe((ret: any) => {
                        if (!ret.success) {
                            reject('jsapi 获取失败');
                            return;
                        }
                        let conf = {
                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: ret.result.appId, // 必填，公众号的唯一标识
                            timestamp: ret.result.timestamp, // 必填，生成签名的时间戳
                            nonceStr: ret.result.nonceStr, // 必填，生成签名的随机串
                            signature: ret.result.signature,// 必填，签名
                            jsApiList: ['onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo',
                                'onMenuShareQZone'] // 必填，需要使用的JS接口列表
                        };
                        wx.config(conf);
                    });
            });
        });
    }

    private _onMenuShareTimeline() {
        wx.onMenuShareTimeline(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }

    private _onMenuShareAppMessage() {
        wx.onMenuShareAppMessage(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }

    private _onMenuShareQQ() {
        wx.onMenuShareQQ(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }

    private _onMenuShareWeibo() {
        wx.onMenuShareWeibo(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }

    private _onMenuShareQZone() {
        wx.onMenuShareQZone(Object.assign({}, WXService.DEFAULTSHARE, this.share));
        return this;
    }
}
