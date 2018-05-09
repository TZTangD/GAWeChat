import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { IntegralServiceProxy, PagedResultDtoOfIntegralDetails } from '@shared/service-proxies/member';
import { IntegralDetails } from '@shared/entity/member';

@Component({
    moduleId: module.id,
    selector: 'integral-search-detail',
    templateUrl: 'integral-search-detail.component.html',
    styleUrls: ['integral-search-detail.component.scss']
})
export class IntegralSearchDetailComponent extends AppComponentBase implements OnInit {
    integralDetails: IntegralDetails[] = [];
    loading = false;
    userInfo: IntegralDetails = new IntegralDetails();
    openId: string;

    constructor(injector: Injector, private integralService: IntegralServiceProxy,
        private Acroute: ActivatedRoute, private modal: NzModalService,
        private router: Router) {
        super(injector);
        this.openId = this.Acroute.snapshot.params['openId'];
    }
    ngOnInit(): void {
        this.getUserInfo();
    }

    getUserInfo() {
        this.integralService.GetUserInfo(this.openId).subscribe((result: IntegralDetails) => {
            this.userInfo = result;
            this.getSingleIntegral();
        });
    }

    getSingleIntegral() {
        this.loading = true;
        this.integralService.getIntegralDetailsById(this.query.skipCount(), this.query.pageSize, this.openId).subscribe((result: PagedResultDtoOfIntegralDetails) => {
            this.loading = false;
            this.integralDetails = result.items;
            this.query.total = result.totalCount;
        });
    }

    return() {
        this.router.navigate(['admin/member/integral-search']);
    }
}
