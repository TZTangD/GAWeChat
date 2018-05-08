import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { AppComponentBase } from '../../components/app-component-base';
import { Router } from '@angular/router';
import { WechatUser, Shop, UserType } from '../../../services/model';
import { ShopService, AppConsts } from '../../../services';
import { JWeiXinService } from 'ngx-weui/jweixin';

@Component({
    selector: 'wechat-scan',
    templateUrl: './scan.component.html',
    styleUrls: ['./scan.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ScanComponent extends AppComponentBase implements OnInit {

    cardNum: string;
    goodsBarCode: string;
    num: number = 1;
    num1: number = 1;

    user: WechatUser;
    shop: Shop;

    constructor(injector: Injector,
        private shopService: ShopService,
        private router: Router,
        private wxService: JWeiXinService) {
        super(injector);
    }

    ngOnInit() {
        this.wxService.get().then((res) => {
            if (!res) {
                console.warn('jweixin.js 加载失败');
                return;
            }
            //alert(location.href.split('#')[0])
            //alert(encodeURIComponent(location.href.split('#')[0]));
            let url = encodeURIComponent(location.href.split('#')[0]);
            this.settingsService.getJsApiConfig(url).subscribe(result => {
                if (result) {
                    result.jsApiList = ['scanQRCode'];//指定调用的接口名
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

        this.settingsService.getUser().subscribe(result => {
            this.user = result;
            if (this.user) {
                //console.table(this.user);
                if (this.user.userType != UserType.Retailer) { //不是零售客户需先绑定
                    this.router.navigate(['/center/bind-retailer']);
                } else {
                    if (!this.user.isShopkeeper && this.user.status == 0) {//不是店主 且 未审核
                        this.router.navigate(['/center/wait-audit']);
                    } else {
                        this.shopService.GetShopByOpenId(this.WUserParams)
                            .subscribe(result => {
                                this.shop = result;
                                if (!this.shop) {//如果没有店铺 需要新增
                                    this.router.navigate(['/center/shop-add']);
                                }
                            });
                    }
                }
            }
        });
    }

    scanCard() {
        //console.log('log scanCard start');
        
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            //scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            scanType: ['barCode'],
            success: ((res) => {
               this.cardNum = res.resultStr;
            }) 
        });

        //console.log('log scanCard end');
    }

    scanGoodsBarCode(){
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['barCode'],
            success: ((res) => {
               this.goodsBarCode = res.resultStr;
            }) 
        });
    }

    onSave() {

    }
}
