import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RetailCustomer, Parameter } from '@shared/service-proxies/entity';
import { RetailCustomerServiceProxy, PagedResultDtoOfRetailCustomer } from '@shared/service-proxies/customer-service';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
@Component({
    moduleId: module.id,
    selector: 'source-goods-level',
    templateUrl: 'source-goods-level.component.html',
})
export class SourceGoodsLevelComponent extends AppComponentBase implements OnInit {
    constructor(injector: Injector, private retailService: RetailCustomerServiceProxy, private router: Router,
        private modal: NzModalService, ) {
        super(injector);
    }
    loading = false;
    exportExcelUrl: string;
    exportLoading = false;
    search: any = {};
    retailCustomer: RetailCustomer[] = [];

    status = [
        { text: '有效', value: false, type: 'success' },
        { text: '无效', value: false, type: 'default' },
    ];
    ngOnInit(): void {
        this.refreshData();
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Scale', value: this.search.scale }));
        arry.push(Parameter.fromJS({ key: 'Markets', value: this.search.market }));
        return arry;
    }
    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = {};
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.retailService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfRetailCustomer) => {
            this.loading = false;
            let status = 0;
            this.retailCustomer = result.items.map(i => {
                if (i.isAction) {
                    status = 0;
                } else {
                    status = 1;
                }
                const statusItem = this.status[status];
                i.activeText = statusItem.text;
                i.activeType = statusItem.type;
                return i;
            });
            this.query.total = result.totalCount;
        })
    }
}
