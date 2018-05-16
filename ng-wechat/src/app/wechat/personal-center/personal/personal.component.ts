import { Component, ViewEncapsulation, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUser, UserType } from '../../../services/model';
import { Router } from '@angular/router';

@Component({
    selector: 'wechat-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PersonalComponent extends AppComponentBase implements OnInit {

    user: WechatUser;
    isShowRetailer: boolean = false;
    accountTitle: string = '我的台账';

    constructor(injector: Injector, private router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
            if(this.user.userType == UserType.Retailer){//零售客户
                this.isShowRetailer = true;
                this.accountTitle = '我的台账';
            } else if(this.user.userType == UserType.Staff){//内部员工
                this.isShowRetailer = true;
                this.accountTitle = '台账查询';
            }
        });
    }

    goIntegralTotal(openId: string) {
        this.router.navigate(["/integrals/integral", { openId: openId }]);
    }

    goShowCard() {
        this.router.navigate(["/members/member-card"]);
    }

    goBindPhone() {
        this.router.navigate(["/personals/bind-member"]);
    }
    goFeedBack() {
        this.router.navigate(['/feedbacks/feedback']);
    }
    goPurchaseRecord(openId: string) {
        this.router.navigate(['/purchaserecords/purchaserecord', { openId: openId }]);
    }
} 
