import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ShopServiceProxy, PagedResultDtoOfShop } from '@shared/service-proxies/customer-service';
import { Parameter } from '@shared/service-proxies/entity';
import { Shop } from '@shared/entity/customer';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'store-management',
    templateUrl: 'store-management.component.html',
})
export class StoreManagementComponent extends AppComponentBase implements OnInit {
    shops: Shop[] = [];
    search: any = { status: 4 };
    statusList = [
        { text: '已拒绝', value: 0, type: 'error' },
        { text: '待审核', value: 1, type: 'processing' },
        { text: '已审核', value: 2, type: 'success' },
        // { text: '已关闭店铺', value: 3, type: 'error' },
    ];
    statues = [
        { text: '全部', value: 4 },
        { text: '已拒绝', value: 0 },
        { text: '待审核', value: 1 },
        { text: '已审核', value: 2 },
        // { text: '已关闭店铺', value: 3 },
    ];
    loading = false;
    constructor(injector: Injector, private shopServie: ShopServiceProxy,
        private router: Router) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
    }

    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { status: 4 };
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.shopServie.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfShop) => {
            this.loading = false;
            this.shops = result.items.map(i => {
                const statusItem = this.statusList[i.status];
                i.statusType = statusItem.type;
                return i;
            });
            this.query.total = result.totalCount;
        })
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Tel', value: this.search.tel }));
        arry.push(Parameter.fromJS({ key: 'Status', value: this.search.status === 4 ? null : this.search.status }));
        return arry;
    }
    editShop(shop: Shop) {
        this.router.navigate(['admin/customer/store-detail', shop.id]);
    }
}
