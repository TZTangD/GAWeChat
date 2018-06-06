import { Injectable } from '@angular/core';
import { LoaderService } from './../utils/loader.service';

declare var wx: any;
declare var qq: any;
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

    getLocation(): Promise<any> {
        return (new Promise<any>((resolve, reject) => {
            wx.getLocation({
                //type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                type: 'gcj02',
                success: function (res) {
                    resolve(res);
                }
            });
        }));
    }

    translate(lat: any, lng: any): Promise<any> {
        return (new Promise<any>((resolve, reject) => {
            //将GPS坐标 转换为腾讯坐标
            qq.maps.convertor.translate(new qq.maps.LatLng(lat, lng), 1,
                function (results) {//[{"lat":39.921792,"lng":116.200274}]
                    resolve(results);
                });
        }));
    }
}
