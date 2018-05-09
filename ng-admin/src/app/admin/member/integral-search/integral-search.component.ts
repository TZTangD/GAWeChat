import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { IntegralServiceProxy, PagedResultDtoOfIntegralDetails } from '@shared/service-proxies/member';
import { Parameter } from '@shared/service-proxies/entity';
import { IntegralDetails } from '@shared/entity/member';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'integral-search',
    templateUrl: 'integral-search.component.html',
})
export class IntegralSearchComponent extends AppComponentBase implements OnInit {
    loading = false;
    search: any = { filter: '', UserType: null };
    positions = [
        { text: '零售客户', value: 1 },
        { text: '内部员工', value: 2 },
        { text: '消费者', value: 4 },
    ];
    ngOnInit(): void {
        this.refreshData();
    }
    integralDetails: IntegralDetails[] = [];
    constructor(injector: Injector, private integralService: IntegralServiceProxy, private router: Router) {
        super(injector);
    }
    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { filter: '', UserType: null };
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.integralService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfIntegralDetails) => {
            this.loading = false;
            this.integralDetails = result.items;
            this.query.total = result.totalCount;
        })
    }

    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Filter', value: this.search.filter }));
        arry.push(Parameter.fromJS({ key: 'UserType', value: this.search.UserType }));
        return arry;

    }

    editIntegral(integral: IntegralDetails) {
        this.router.navigate(['admin/member/integral-search-detail', integral.openId])
    }
}
