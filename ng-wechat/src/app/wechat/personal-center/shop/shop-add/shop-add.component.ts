import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { AppComponentBase } from '../../../components/app-component-base';
import { WechatUser, UserType, Shop } from '../../../../services/model';
import { Router, Params } from '@angular/router';
import { UploaderOptions, FileItem, Uploader, UploaderHeaders } from 'ngx-weui';
import { ShopService, AppConsts } from '../../../../services';
import { ToptipsService } from "ngx-weui/toptips";
import { JWeiXinService } from 'ngx-weui/jweixin';

@Component({
    selector: 'wechat-shop-add',
    templateUrl: './shop-add.component.html',
    styleUrls: ['./shop-add.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShopAddComponent extends AppComponentBase implements OnInit {
    showAddInfo: boolean = true;
    user: WechatUser;

    res: any = {};
    coverPhoto: string;

    img: any;
    imgShow: boolean = false;
    title: string = '新增店铺';
    hostUrl: string = AppConsts.remoteServiceBaseUrl;
    longitude: number;
    latitude: number;

    uploader: Uploader = new Uploader(<UploaderOptions>{
        url: AppConsts.remoteServiceBaseUrl + '/WeChatFile/FilesPosts?folder=shop',
        auto: true,
        limit: 1,
        onUploadSuccess: ((file: FileItem, response: string) => {
            //console.log('onUploadSuccess-' + response);
            let data = JSON.parse(response);
            if (data && data.success == true) {
                this.coverPhoto = data.result;
            }
        }),
        onUploadComplete: function (file: FileItem, response: string) {
            //console.log('onUploadComplete-' + response, arguments);
        }
    });

    constructor(injector: Injector, private router: Router,
        private shopService: ShopService,
        private wxService: JWeiXinService,
        private srv: ToptipsService) {
        super(injector);
    }

    ngOnInit() {
        if (this.id && this.id == '1') {
            this.showAddInfo = false;
        }
        //微信JS SDK配置
        this.wxService.get().then((res) => {
            if (!res) {
                console.warn('jweixin.js 加载失败');
                return;
            }
            let url = encodeURIComponent(location.href.split('#')[0]);
            this.settingsService.getJsApiConfig(url).subscribe(result => {
                if (result) {
                    result.jsApiList = ['openLocation', 'getLocation'];//指定调用的接口名
                    // 1、通过config接口注入权限验证配置
                    wx.config(result.toJSON());
                    // 2、通过ready接口处理成功验证
                    wx.ready(() => {
                        // 注册各种onMenuShareTimeline & onMenuShareAppMessage
                        if (this.showAddInfo == true) {//当新增的时候 才自动定位
                            this.wxGetLocation();
                        }
                    });
                    // 2、通过error接口处理失败验证
                    wx.error(() => {

                    });
                }
            });
        });

        this.settingsService.getUser().subscribe(result => {
            this.user = result;
        });
        this.shopService.GetShopByOpenId(this.WUserParams).subscribe(result => {
            if (result) {
                this.res = result.toJSON();
                this.coverPhoto = this.res.coverPhoto;
                this.latitude = this.res.latitude;
                this.longitude = this.res.longitude;
                this.showAddInfo = false;
                this.title = '修改店铺';
            }
        });
    }

    onGallery(item: any) {
        if (item) {
            this.img = [{ file: item._file, item: item }];
        } else {
            this.img = this.hostUrl + this.coverPhoto;
        }
        this.imgShow = true;
    }

    onDel(item: any) {
        //console.log(item);
        if (item) {
            this.uploader.removeFromQueue(item.item);
        }
        this.coverPhoto = null;
    }

    onSave() {
        //alert('请求数据：' + JSON.stringify(this.res));
        if (!this.coverPhoto) {
            this.res.coverPhoto = this.coverPhoto;
        }
        //console.table(this.res);
        if (!this.res.coverPhoto || this.res.coverPhoto == '') {
            this.srv['warn']('请上传店铺形象');
            return;
        }
        if (!this.latitude || !this.longitude) {
            this.srv['warn']('请获取位置信息');
            return;
        }
        this.res.latitude = this.latitude;
        this.res.longitude = this.longitude;
        this.shopService.WechatCreateOrUpdateShop({
            shop: this.res,
            tenantId: this.settingsService.tenantId,
            openId: this.settingsService.openId
        }).subscribe(data => {
            if (data) {
                this.srv['success']('保存成功');
                this.router.navigate(["/shops/shop"]);
            } else {
                this.srv['warn']('保存失败');
            }
        });
    }

    //调用微信获取当前位置
    wxGetLocation() {
        (new Promise<any>((resolve, reject) => {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    //var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    //var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    //var speed = res.speed; // 速度，以米/每秒计
                    //var accuracy = res.accuracy; // 位置精度
                    resolve(res);
                }
            });
        })).then((res) => {
            this.latitude = res.latitude;
            this.longitude = res.location;
        });
    }
    //打开微信地图
    wxOpenLocation() {
        if (!this.latitude || !this.longitude) {
            this.srv['info']('请先获取位置信息');
            return;
        }
        wx.openLocation({
            latitude: this.latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: this.longitude, // 经度，浮点数，范围为180 ~ -180。
            name: this.res.name, // 位置名
            address: this.res.address, // 地址详情说明
            scale: 12, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: this.hostUrl + '/gawechat/index.html#/shops/shop/' + this.settingsService.openId + '/0' // 在查看位置界面底部显示的超链接,可点击跳转
        });
    }
}
