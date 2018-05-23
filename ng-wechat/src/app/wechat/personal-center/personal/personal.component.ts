import { Component, ViewEncapsulation, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUser, UserType } from '../../../services/model';
import { Router } from '@angular/router';
import { PurchaserecordService } from '../../../services';

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
    countNotEvaluation: number;
    constructor(injector: Injector, private router: Router, private purchaserecordService: PurchaserecordService) {
        super(injector);
    }

    ngOnInit() {
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
            if (this.user.userType == UserType.Retailer) {//零售客户
                this.isShowRetailer = true;
                this.accountTitle = '我的台账';
            } else if (this.user.userType == UserType.Staff) {//内部员工
                this.isShowRetailer = true;
                this.accountTitle = '台账查询';
            }
        });
        // 以.then()方式处理，待确认
        this.GetCountNotEvaluationById();
    }

    /**
     * 展示未评价数目    
     * @memberof PersonalComponent
     */
    GetCountNotEvaluationById() {
        let params: any = {};
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        params.openId = this.settingsService.openId;
        this.purchaserecordService.GetWXCountNotEvaluationByIdAsync(params).subscribe(result => {
            this.countNotEvaluation = result;
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
    goShopEvaluation(openId: string, pageType: string) {
        this.router.navigate(['/purchaserecords/purchaserecord', { openId: openId, pageType: 'shopEvaluation' }]);
    }
    goArchivalLevel() {
        //2：内部员工，1：零售用户
        if (this.user.userType == UserType.Staff) {
            this.router.navigate(['/customer-searchs/customer-search']);
        } else if (this.user.userType == UserType.Retailer) {
            this.router.navigate(['/account-levels/account-level']);
        }
        // else{
        //     this.router.navigate(['/customer-searchs/customer-search']);
        // }
    }
} 
