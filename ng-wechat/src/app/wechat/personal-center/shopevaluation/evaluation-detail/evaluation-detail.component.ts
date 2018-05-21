import { Component, ViewEncapsulation, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../components/app-component-base';
import { PageModel, WechatUser, ShopEvaluation, PurchaseRecord } from '../../../../services/model';
import { Router } from '@angular/router';
import { InfiniteLoaderComponent, ToptipsService } from 'ngx-weui';
import { ActivatedRoute } from '@angular/router';
import { ShopEvaluationService, PurchaserecordService, AppConsts } from '../../../../services';

@Component({
    moduleId: module.id,
    selector: 'evaluation-detail',
    templateUrl: 'evaluation-detail.component.html',
    styleUrls: ['evaluation-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EvaluationDetailComponent extends AppComponentBase implements OnInit {
    //传参
    productId: string = this.route.snapshot.params['productId'];
    id: string = this.route.snapshot.params['id'];

    hostUrl: string = AppConsts.remoteServiceBaseUrl;
    loading = false;
    res: any = {};
    purchaseRecord: PurchaseRecord = new PurchaseRecord();
    radio: any[] = [{ id: 1, name: '是', value: true }, { id: 2, name: '否', value: false }];
    radioType: any[] = [{ id: 1, name: '好评', value: 5 }, { id: 2, name: '中评', value: 3 }, { id: 3, name: '差评', value: 1 }];
    shopEvaluation: ShopEvaluation = new ShopEvaluation();

    constructor(injector: Injector, private srv: ToptipsService, private shopEvaluationService: ShopEvaluationService, private purchaserecordService: PurchaserecordService, private route: ActivatedRoute, private router: Router) {
        super(injector);
    }
    ngOnInit() {
        this.res.radioType = this.radioType[2];
        this.res.radio = this.radio[0];
        this.GetWXProductsDetailsByIdAsync();
    }

    GetWXProductsDetailsByIdAsync() {
        let params: any = {};
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        params.openId = this.settingsService.openId;
        params.productId = this.productId;
        params.id = this.id;
        this.purchaserecordService.GetWXProductsDetailsByIdAsync(params).subscribe(result => {
            this.purchaseRecord = result;
        });
    }
    save() {
        this.loading = true;
        this.shopEvaluation.evaluation = this.res.radioType.value;
        this.shopEvaluation.isCorrectQuantity = this.res.radio.value;
        this.shopEvaluation.purchaseRecordId = this.id;
        this.shopEvaluation.openId = this.settingsService.openId;
        this.shopEvaluation.shopId = this.purchaseRecord.shopId;
        this.shopEvaluationService.SubmitShopEvaluationAsync(this.shopEvaluation).subscribe(data => {
            this.loading = false;
            if (data && data.code === 0) {
                this.router.navigate(['/feedbacks/feedback-success', { successType: 'evaluation' }]);
            } else {
                this.srv['warn']('提交失败，请重试');
            }
        });
    }
}
