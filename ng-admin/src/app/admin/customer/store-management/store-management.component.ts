import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ShopServiceProxy, PagedResultDtoOfShop } from '@shared/service-proxies/customer-service';
import { Parameter } from '@shared/service-proxies/entity';
import { Shop } from '@shared/entity/customer';
import { Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';

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

    sortMap = {
        sale: null,
        read: null,
        single: null
    };
    host = AppConsts.remoteServiceBaseUrl;
    loading = false;
    exportLoading = false;
    sortSaleTotal = null;
    sortReadTotal = null;
    sortSingleTotal = null;
    constructor(injector: Injector, private shopServie: ShopServiceProxy,
        private router: Router) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
    }

    sort(value, para: string) {
        if (para == 'sale') {
            this.sortSaleTotal = value;
            this.sortReadTotal = null;
            this.sortSingleTotal = null;
            this.sortMap.read = null;
            this.sortMap.single = null;
            this.refreshData();
        } else if (para == 'single') {
            // console.log(value + para)
            this.sortSingleTotal = value;
            this.sortReadTotal = null;
            this.sortSaleTotal = null;
            this.sortMap.read = null;
            this.sortMap.sale = null;
            this.refreshData();
        }
        else {
            this.sortReadTotal = value;
            this.sortSaleTotal = null;
            this.sortSingleTotal = null;
            this.sortMap.sale = null;
            this.sortMap.single = null;
            this.refreshData();
        }
    }
    // _checked = true;

    // _console(value) {
    //     console.log(value);
    // }
    allChecked = false;
    indeterminate = true;
    checkOptionsOne = [
        { label: '', value: '', checked: true },
    ];
    updateAllChecked() {
        this.indeterminate = false;
        if (this.allChecked) {
            this.checkOptionsOne.forEach(item => item.checked = true);
        } else {
            this.checkOptionsOne.forEach(item => item.checked = false);
        }
    }

    updateSingleChecked() {
        if (this.checkOptionsOne.every(item => item.checked === false)) {
            this.allChecked = false;
            this.indeterminate = false;
        } else if (this.checkOptionsOne.every(item => item.checked === true)) {
            this.allChecked = true;
            this.indeterminate = false;
        } else {
            this.indeterminate = true;
        }
    }
    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { status: 4 };
            this.sortSaleTotal = null;
            this.sortReadTotal = null;
            this.sortSingleTotal = null;
            this.sortMap = {
                sale: null,
                read: null,
                single: null
            };
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
    pic(url: string, name: string) {
        var a = document.createElement('a');
        var event = new MouseEvent('click');
        a.download = name;
        a.href = this.host + url;
        a.dispatchEvent(event);
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Tel', value: this.search.tel }));
        arry.push(Parameter.fromJS({ key: 'Status', value: this.search.status === 4 ? null : this.search.status }));
        arry.push(Parameter.fromJS({ key: 'sortSaleTotal', value: this.sortSaleTotal }));
        arry.push(Parameter.fromJS({ key: 'sortReadTotal', value: this.sortReadTotal }));
        arry.push(Parameter.fromJS({ key: 'sortSingleTotal', value: this.sortSingleTotal }));
        arry.push(Parameter.fromJS({ key: 'RetailCode', value: this.search.code }));
        return arry;
    }
    editShop(shop: Shop) {
        this.router.navigate(['admin/customer/store-detail', shop.id]);
    }

    /**
     * 导出店铺信息
     */
    exportExcel() {
        this.exportLoading = true;
        this.shopServie.ExportExcel({ name: this.search.name, tel: this.search.tel, status: this.search.status === 4 ? null : this.search.status, sortSaleTotal: this.sortSaleTotal, sortReadTotal: this.sortReadTotal, sortSingleTotal: this.sortSingleTotal }).subscribe(data => {
            if (data.code == 0) {
                var url = AppConsts.remoteServiceBaseUrl + data.data;
                document.getElementById('aShopExcelUrl').setAttribute('href', url);
                document.getElementById('btnShopHref').click();
            } else {
                this.notify.error(data.msg);
            }
            this.exportLoading = false;
        });
    }
}
