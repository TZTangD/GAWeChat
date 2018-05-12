import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { JWeiXinService } from 'ngx-weui/jweixin';

@Component({
    selector: 'wechat-nearby-shop',
    templateUrl: './nearby-shop.component.html',
    styleUrls: ['./nearby-shop.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NearbyShopComponent extends AppComponentBase implements OnInit {

    myaddress: string = "定位中...";
    citylocation: any;
    options: any = {
        complete: ((res) => {
             //console.log(JSON.stringify(res));
            this.myaddress = res.detail.detail;
        }),
        error:(() => {
            this.myaddress = "定位失败";
        })
    }

    constructor(injector: Injector, private wxService: JWeiXinService) {
        super(injector);
    }

    ngOnInit() {
         //调用城市服务信息
         this.citylocation = new qq.maps.CityService(this.options);
        this.wxService.get().then(res => {
            if (!res) {
                console.warn('weixin或qq map js加载失败');
                return;
            }
            let url = encodeURIComponent(location.href.split('#')[0]);
            this.settingsService.getJsApiConfig(url).subscribe(result => {
                if (result) {
                    result.jsApiList = ['openLocation', 'getLocation'];//指定调用的接口名
                    //console.log(result.toJSON());
                    // 1、通过config接口注入权限验证配置
                    wx.config(result.toJSON());
                    // 2、通过ready接口处理成功验证
                    wx.ready(() => {
                        // 注册各种onMenuShareTimeline & onMenuShareAppMessage
                    });
                    // 2、通过error接口处理失败验证
                    wx.error(() => {

                    });
                }
            });
        });

        this.getlocation();
    }

    getlocation() {
        var latLng = new qq.maps.LatLng(39.884450,116.392937);
        this.citylocation.searchCityByLatLng(latLng);
    }
} 
