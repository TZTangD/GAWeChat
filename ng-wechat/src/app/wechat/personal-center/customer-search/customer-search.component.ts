import { Component, ViewChild, OnInit, Injector } from '@angular/core';
import { InfiniteLoaderComponent } from 'ngx-weui';
import { timer } from 'rxjs/observable/timer';
import { AppComponentBase } from '../../components/app-component-base';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services';
import { Customers } from '../../../services/model';

@Component({
    moduleId: module.id,
    selector: 'customer-search',
    templateUrl: 'customer-search.component.html',
    styleUrls: ['customer-search.component.scss']
})
export class CustomerSearchComponent extends AppComponentBase implements OnInit {
    @ViewChild(InfiniteLoaderComponent) il;
    search: any = [];
    customers: Customers[] = [];
    isLastPage = false;
    //是否显示更多组件
    showMore = false;
    //是否查询所有符合条件的
    isMore = false;
    test = false;
    constructor(injector: Injector, private router: Router, private customerService: CustomerService) {
        super(injector);
    }
    ngOnInit(): void {
        this.isLastPage = false;
        // this.getCustomer(false);
    }

    onLoadMore(comp: InfiniteLoaderComponent) {
        this.query.pageIndex++;
        this.getCustomer(false,this.search.filter);
        if (this.isLastPage) {
            comp.setFinished();
            return;
        }
        comp.resolveLoading();

    }
    getCustomer(initialize: boolean, filter?: string) {
        //初始查询
        if (initialize) {
            this.query.pageIndex = 1;
            this.customers = [];
            this.showMore = false;
            this.isMore = false;
        }
        this.search.tenantId = this.settingsService.tenantId;
        this.search.pageSize = this.query.pageSize;
        this.search.skipCount = this.query.skipCount();
        this.search.filter = filter;
        this.search.isMore = this.isMore;
        this.customerService.getAll(this.search).subscribe(data => {
            if (data) {
                this.customers.push(...data);
            }
            if(data.length>0){
                this.showMore = this.isMore ? false : true;
            }else{
                this.showMore=false;
            }
            if (data && data.length < this.query.pageSize) {
                this.isLastPage = true;
            }
            
        });
    }
    aboutMore() {
        this.showMore = false;
        this.isMore = true;
        this.query.pageIndex = 1;
        this.customers = [];
        this.getCustomer(false,this.search.filter);
    }
    onCancel() {
        console.log('onCancel');
    }

    onClear() {
        console.log('onCancel');
    }

    /**
     * 前往台账、档级
     */
    goCustomerLeavel(customer: Customers) {
        this.router.navigate(['/account-levels/account-level', { id: customer.id,licenseKey:customer.licenseKey }]);
    }
}
