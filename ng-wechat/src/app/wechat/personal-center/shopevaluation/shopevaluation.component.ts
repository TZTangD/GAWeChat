import { Component, ViewEncapsulation, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { PageModel, WechatUser, ShopEvaluation, PurchaseRecord } from '../../../services/model';
import { Router } from '@angular/router';
import { InfiniteLoaderComponent } from 'ngx-weui';
import { ActivatedRoute } from '@angular/router';
import { ShopEvaluationService, PurchaserecordService } from '../../../services';

@Component({
    moduleId: module.id,
    selector: 'shopevaluation',
    templateUrl: 'shopevaluation.component.html',
    styleUrls: ['shopevaluation.component.scss']
})

export class ShopEvaluationComponent extends AppComponentBase implements OnInit {
    pageModel: PageModel = new PageModel(); // 分页信息
    user: WechatUser;
    purchaseRecordList: PurchaseRecord[] = [];
    // shopEvaluationList: ShopEvaluation[] = [];
    openId: string = this.route.snapshot.params['openId'];

    constructor(injector: Injector, private purchaserecordService: PurchaserecordService, private route: ActivatedRoute, private router: Router) {
        super(injector);
    }
    ngOnInit() {
        this.pageModel.isLast = false;
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
        });
        this.GetPagedPurchaseRecord();
    }

    GetPagedPurchaseRecord() {
        let params: any = {};
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        params.openId = this.openId;
        this.purchaserecordService.GetPurchaseRecordById2(params).subscribe(result => {
            this.purchaseRecordList = result;
        });
    }
}
