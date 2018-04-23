import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RetailCustomerServiceProxy, PagedResultDtoOfRetailCustomer } from '@shared/service-proxies/customer-service';
import { Parameter, RetailCustomer } from '@shared/service-proxies/entity';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'retail-customer',
    templateUrl: 'retail-customer.component.html',
})
export class RetailCustomerComponent extends AppComponentBase implements OnInit {
    loading = false;
    search: any = {};
    status = [
        { text: '有效', value: false, type: 'success' },
        { text: '无效', value: false, type: 'default' },
    ];
    scales = [
        { text: '小', value: 1 },
        { text: '中', value: 2 },
        { text: '大', value: 3 },
    ];
    markets = [
        { text: '乡村', value: 1 },
        { text: '城镇', value: 2 },
    ];
    retailCustomer: RetailCustomer[] = [];
    constructor(injector: Injector, private retailService: RetailCustomerServiceProxy, private router: Router,
        private modal: NzModalService, ) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
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
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Scale', value: this.search.scale }));
        arry.push(Parameter.fromJS({ key: 'Markets', value: this.search.market }));
        return arry;
    }
    editRetail(retail: RetailCustomer) {
        this.router.navigate(['admin/retail-detail', retail.id])
    }
    /**
     * 
     */
    delete(retail: RetailCustomer, TplContent) {
        this.modal.confirm({
            content: TplContent,
            cancelText: '否',
            okText: '是',
            onOk: () => {
                this.retailService.delete(retail.id).subscribe(() => {
                    this.notify.info(this.l('删除成功！'));
                    this.refreshData();
                });
            }
        })
    }
    createRetail() {
        this.router.navigate(['admin/retail-detail']);
    }
}
