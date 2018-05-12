import { Injectable } from '@angular/core';
import { LoaderService } from './../utils/loader.service';

@Injectable()
export class JWeiXinService {

    constructor(private load: LoaderService) { }

    /**
     * 懒加载jweixin.js
     *
     * @param jweixinUrl 默认：//res.wx.qq.com/open/js/jweixin-1.2.0.js
     */
    get(jweixinUrl?: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.load.loadScript(jweixinUrl || '//res.wx.qq.com/open/js/jweixin-1.2.0.js').then((res) => {
                resolve(res.loaded === true);
            }).catch(() => {
                resolve(false);
            });
        });
    }

    /**
     * libraries的值可以为
     * &libraries=drawing,geometry,autocomplete,convertor
     */
    getMap(jweixinUrl?: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.load.loadScript(jweixinUrl || '//map.qq.com/api/js?v=2.exp&key=DVRBZ-2WJWF-YCAJ4-NKR5L-AYX7Q-GPFE7&libraries=convertor').then((res) => {
                resolve(res.loaded === true);
            }).catch(() => {
                resolve(false);
            });
        });
    }
}
