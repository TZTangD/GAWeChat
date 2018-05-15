import { Component, ViewEncapsulation, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { PageModel, IntegralDetail, WechatUser } from '../../../services/model';
import { Router } from '@angular/router';
import { IntegralDetailService } from '../../../services';
import { InfiniteLoaderComponent } from 'ngx-weui';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'integral',
    templateUrl: 'integral.component.html',
    styleUrls: ['integral.component.scss']
})

export class IntegralComponent extends AppComponentBase implements OnInit {
    openId: string = this.route.snapshot.params['openId'];
    // integralTotal: number = this.route.snapshot.params['integralTotal'];
    integralDetail: IntegralDetail[] = [];
    pageModel: PageModel = new PageModel(); // 分页信息
    user: WechatUser;

    constructor(injector: Injector, private integralDetailService: IntegralDetailService, private route: ActivatedRoute, private router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.pageModel.isLast = false;
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
        });
        this.GetPagedIntegralDetail();
    }

    onLoadMore(comp: InfiniteLoaderComponent) {
        this.pageModel.pageIndex++;
        console.log(this.pageModel.isLast);
        if (this.pageModel.isLast) {
            comp.setFinished();
            return;
        }
        this.GetPagedIntegralDetail();
        comp.resolveLoading();
    }

    GetPagedIntegralDetail() {
        let params: any = {};
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        params.openId = this.openId;
        params.pageIndex = this.pageModel.pageIndex;
        params.pageSize = this.pageModel.pageSize;
        this.integralDetailService.GetIntegralDetailById(params).subscribe(result => {
            this.integralDetail.push(...result);
            if (result && result.length < this.pageModel.pageSize) {
                this.pageModel.isLast = true;
            }
        });
    }
}
