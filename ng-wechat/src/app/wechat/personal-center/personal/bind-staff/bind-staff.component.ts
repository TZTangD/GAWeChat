import { Component, ViewEncapsulation, Injector, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppComponentBase } from '../../../components/app-component-base';
import { WechatUserService } from '../../../../services';
import { Router } from '@angular/router';

import { ToptipsComponent, ToptipsService } from "ngx-weui/toptips";
import { ToastComponent } from "ngx-weui/toast";

@Component({
    selector: 'wechat-bind-staff',
    templateUrl: './bind-staff.component.html',
    styleUrls: [ './bind-staff.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class BindStaffComponent extends AppComponentBase {

    res: any = {};
    @ViewChild('toptips') toptips: ToptipsComponent;
    @ViewChild('loading') loadingToast: ToastComponent;

    isOpen: boolean = false;
    openMsg = '';//'测试验证码：123321 开放时间：2018-06-11 09:00';

    constructor(injector: Injector, 
        private wechatUserService: WechatUserService, 
        private router: Router, 
        private srv: ToptipsService) { 
        super(injector);

        /*let oDate = new Date(2018,5,11,9,0,0,0);
        //let oDate = new Date(2018,5,8,9,0,0,0);
        let nDate = new Date();
        if(nDate >  oDate){
            this.isOpen = true;
            this.openMsg = '测试验证码：123321 开放时间：已开放';
        }*/
    }

    onSave() {
        /*if(!this.isOpen && this.res.verificationCode != '668899'){
            this.srv['info']('还没有到开放绑定时间');
            return;
        }*/

        this.res.openId = this.settingsService.openId;
        if(this.settingsService.tenantId){
            this.res.tenantId = this.settingsService.tenantId;
        }
        this.res.userType = 2;//内部员工
        
        this.loadingToast._showd = true;
        this.wechatUserService.BindWeChatUserAsync(this.res).subscribe(result => {
            this.loadingToast.onHide();
            if(result.code == 0){//成功
                this.srv['success']('绑定成功');
                this.settingsService.setUser(result.data);
                this.router.navigate(["/personals/personal"]);
            } else {//失败
                this.srv['warn'](result.msg);
            }
        });
    }
}
