import { Component, ViewEncapsulation, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { PageModel, WechatUser, ShopEvaluation, PurchaseRecord } from '../../../services/model';
import { Router } from '@angular/router';
import { InfiniteLoaderComponent } from 'ngx-weui';
import { ActivatedRoute } from '@angular/router';
import { ShopEvaluationService, PurchaserecordService, AppConsts } from '../../../services';

@Component({
    moduleId: module.id,
    selector: 'shopevaluation',
    templateUrl: 'shopevaluation.component.html',
    styleUrls: ['shopevaluation.component.scss']
})

export class ShopEvaluationComponent extends AppComponentBase implements OnInit {
    user: WechatUser;
    purchaseRecordList: PurchaseRecord[] = [];
    openId: string = this.route.snapshot.params['openId'];
    hostUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector, private purchaserecordService: PurchaserecordService, private route: ActivatedRoute, private router: Router) {
        super(injector);
    }
    ngOnInit() {
        // this.settingsService.getUser().subscribe(result => {
        //     this.user = result;
        // });
        this.GetPagedPurchaseRecord();
    }

    GetPagedPurchaseRecord() {
        let params: any = {};
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        params.openId = this.openId;
        this.purchaserecordService.GetWXNotEvaluationByIdAsync(params).subscribe(result => {
            this.purchaseRecordList = result;
        });
    }

    goDetail(productId: string, purchaseRecordId: string) {
        this.router.navigate(['/shopevaluations/evaluation-detail', { id: purchaseRecordId, productId: productId }]);
    }
}
