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

    res: any = { };
    coverPhoto: string = '';

    img: any;
    imgShow: boolean = false;
    title: string = '新增店铺';

    uploader: Uploader = new Uploader(<UploaderOptions>{
        url: AppConsts.remoteServiceBaseUrl + '/WeChatFile/FilesPosts?folder=shop',
        auto: true,
        limit: 1,
        /*onUploadSuccess(file: FileItem, response: string) {
            console.log('onUploadSuccess-' + response, arguments);
            //console.table(file);
            //console.table(arguments);
            let data = JSON.parse(response);
            if(data && data.success == true){
                this.coverPhoto = data.result;
            }
        },*/
        onUploadSuccess: ((file: FileItem, response: string) => {
            console.log('onUploadSuccess-' + response);
            //console.table(file);
            //console.table(arguments);
            let data = JSON.parse(response);
            if(data && data.success == true){
                this.coverPhoto = data.result;
            }
        }),
        onUploadComplete: function(file: FileItem, response: string) {
            console.log('onUploadComplete-' + response, arguments);
            //console.table(file);
            //console.table(arguments);  
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
        this.coverPhoto = '';
    }

    onSave() {
        //alert('请求数据：' + JSON.stringify(this.res));
        if(this.coverPhoto != ''){
            this.res.coverPhoto = this.coverPhoto;
        }
        //console.table(this.res);
        if(!this.res.coverPhoto || this.res.coverPhoto == ''){
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
