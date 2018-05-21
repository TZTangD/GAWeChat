import { Component, ViewEncapsulation, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { PageModel, WechatUser, PurchaseRecord } from '../../../services/model';
import { Router } from '@angular/router';
import { PurchaserecordService, AppConsts } from '../../../services';
import { InfiniteLoaderComponent } from 'ngx-weui';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'purchaserecord',
    templateUrl: 'purchaserecord.component.html',
    styleUrls: ['purchaserecord.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PurchaserecordComponent extends AppComponentBase implements OnInit {
    pageModel: PageModel = new PageModel(); // 分页信息
    user: WechatUser;
    purchaseRecordList: PurchaseRecord[] = [];
    openId: string = this.route.snapshot.params['openId'];
    pageType: string = this.route.snapshot.params['pageType'];
    hostUrl: string = AppConsts.remoteServiceBaseUrl;
    tittleType: boolean = false;
    constructor(injector: Injector, private purchaserecordService: PurchaserecordService, private route: ActivatedRoute, private router: Router) {
        super(injector);
    }
    ngOnInit() {
        this.pageModel.isLast = false;
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
        });
        if (this.pageType == 'shopEvaluation') {
            this.tittleType = true;
            this.GetWXNotEvaluationByIdAsync();
        } else {
            this.tittleType = false;
            this.GetPagedPurchaseRecord();
        }
    }

    GetPagedPurchaseRecord() {
        let params: any = {};
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        params.openId = this.openId;
        params.pageIndex = this.pageModel.pageIndex;
        params.pageSize = this.pageModel.pageSize;
        this.purchaserecordService.GetPurchaseRecordById(params).subscribe(result => {
            this.purchaseRecordList.push(...result);
            if (result && result.length < this.pageModel.pageSize) {
                this.pageModel.isLast = true;
            }
        });
    }

    GetWXNotEvaluationByIdAsync() {
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

    goFindGoods() {
        this.router.navigate(['/goodses/goods']);
    }
}
