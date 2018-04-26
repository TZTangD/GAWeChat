import { Component, ViewEncapsulation, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUserService, AppConsts } from '../../../services';
import { WechatUser } from '../../../services/model';

@Component({
    selector: 'wechat-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PersonalComponent extends AppComponentBase implements OnInit {

    user: WechatUser;

    constructor(injector: Injector, private wechatUserService: WechatUserService) { 
        super(injector);
    }

    ngOnInit() {
        this.wechatUserService.GetWeChatUserAsync(this.openId, this.tenantId).subscribe(data =>{
            this.user = WechatUser.fromJS(data.result);
            if(this.user.headImgUrl.includes('timg-4.jpeg')){//表示默认头像
                this.user.headImgUrl =  AppConsts.remoteServiceBaseUrl + this.user.headImgUrl;
            }
        });
    }
} 
