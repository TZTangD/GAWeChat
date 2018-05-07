import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { AppComponentBase } from '../../../components/app-component-base';
import { WechatUser, UserType, Shop } from '../../../../services/model';
import { Router, Params } from '@angular/router';
import { UploaderOptions, FileItem, Uploader, UploaderHeaders } from 'ngx-weui';
import { ShopService, AppConsts } from '../../../../services';
import { ToptipsService } from "ngx-weui/toptips";

@Component({
    selector: 'wechat-shop-add',
    templateUrl: './shop-add.component.html',
    styleUrls: [ './shop-add.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class ShopAddComponent extends AppComponentBase implements OnInit {
    showAddInfo: boolean = true;
    user: WechatUser;

    res: any = {};

    img: any;
    imgShow: boolean = false;
    title: string = '新增店铺';

    uploader: Uploader = new Uploader(<UploaderOptions>{
        url: AppConsts.remoteServiceBaseUrl + '/WeChatFile/FilesPosts',
        /*headers: [
            { name: 'Content-Type', value: 'application/x-www-form-urlencoded'}
        ],*/
        method: 'POST',
        params: {
            folder: 'shop',
        },
        /*types: [
            'jpg','png'
        ],*/
        //auto: true,
        onFileQueued: function(file: FileItem) {
            console.log('onFileQueued', arguments);
        },
        onFileDequeued: function() {
            console.log('onFileDequeued', arguments);
        },
        onStart: function() {
            console.log('onStart', arguments);
        },
        onCancel: function() {
            console.log('onCancel', arguments);
        },
        onFinished: function() {
            console.log('onFinished', arguments);
        },
        onUploadStart: function() {
            console.log('onUploadStart', arguments);
        },
        onUploadProgress: function() {
            console.log('onUploadProgress', arguments);
        },
        onUploadSuccess: function(file: FileItem, response: string) {
            console.log('onUploadSuccess' + response, arguments);
        },
        onUploadError: function() {
            console.log('onUploadError', arguments);
        },
        onUploadComplete: function(file: FileItem, response: string) {
            console.log('onUploadComplete' + response, arguments);
        },
        onUploadCancel: function() {
            console.log('onUploadCancel', arguments);
        },
        onError: function() {
            console.log('onError', arguments);
        }
    });

    constructor(injector: Injector, private router: Router, 
        private shopService: ShopService,
        private srv: ToptipsService) {
        super(injector);
    }

    ngOnInit() {
        //alert(this.id)
        if(this.id && this.id == '1'){
            this.showAddInfo = false;
        }
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
        });
        this.shopService.GetShopByOpenId(this.WUserParams).subscribe(result => {
            if(result){
                this.res = result.toJSON();
                this.showAddInfo = false;
                this.title = '修改店铺';
            }
        });
        /*
        this.activatedRoute.params.subscribe((params: Params) => {
            let shop = params['shop'];
            console.table(shop);
            if(shop){//编辑
                this.res = shop;
                this.showAddInfo = false;
            }
        });*/
    }

    onGallery(item: any) {
        this.img = [{ file: item._file, item: item }];
        this.imgShow = true;
    }

    onDel(item: any) {
        console.log(item);
        this.uploader.removeFromQueue(item.item);
    }

    onSave() {
        //alert('请求数据：' + JSON.stringify(this.res));
        if(this.res.coverPhoto){
            this.srv['warn']('请上传店铺形象');
            return;
        }
        this.shopService.WechatCreateOrUpdateShop({ 
            shop : this.res, 
            tenantId: this.settingsService.tenantId, 
            openId: this.settingsService.openId 
        }).subscribe(data =>{
            if(data){
                this.srv['success']('保存成功');
                this.router.navigate(["/center/shop"]);
            } else {
                this.srv['warn']('保存失败');
            }
        });
    }
}
