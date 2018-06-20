import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { Parameter } from '@shared/service-proxies/entity';
import { IntegralDetails } from '@shared/entity/member';
import { Router } from '@angular/router';
import { WechatUserServiceProxy, PagedResultDtoOfWeChatUser } from '@shared/service-proxies/wechat-service';
import { WechatUser } from '@shared/entity/wechat';

@Component({
    moduleId: module.id,
    selector: 'integral-search',
    templateUrl: 'integral-search.component.html',
})
export class IntegralSearchComponent extends AppComponentBase implements OnInit {
    loading = false;
    sortValue = null;
    search: any = { name: '', UserType: null, phone: '' };
    positions = [
        { text: '零售客户', value: 1 },
        { text: '内部员工', value: 2 },
        { text: '消费者', value: 4 },
    ];
    ngOnInit(): void {
        this.refreshData();
    }
    sort(value) {
        this.sortValue = value;
        this.refreshData();
    }
    integralDetails: IntegralDetails[] = [];
    weChatUsers: WechatUser[] = [];
    constructor(injector: Injector, private wechatUserService: WechatUserServiceProxy, private router: Router) {
        super(injector);
    }
    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { filter: '', UserType: null, phone: '' };
            this.sortValue = null;
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.wechatUserService.getIntegralList(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfWeChatUser) => {
            this.loading = false;
            this.weChatUsers = result.items;
            this.query.total = result.totalCount;
        })
    }

    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'UserType', value: this.search.UserType }));
        arry.push(Parameter.fromJS({ key: 'Phone', value: this.search.phone }));
        arry.push(Parameter.fromJS({ key: 'SortValue', value: this.sortValue }));
        return arry;

    }

    editIntegral(openId: string) {
        this.router.navigate(['admin/member/integral-search-detail', openId])
    }
}
