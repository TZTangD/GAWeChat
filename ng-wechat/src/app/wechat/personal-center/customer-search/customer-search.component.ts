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

    constructor(injector: Injector, private router: Router, private customerService: CustomerService) {
        super(injector);
    }
    ngOnInit(): void {
        this.isLastPage = false;

        // this.query.pageSize = 5;
        // this.onLoadMore();
        this.getCustomer(false);
    }

    // items: any[] = Array(20)
    //     .fill(0)
    //     .map((v: any, i: number) => i);


    onLoadMore(comp: InfiniteLoaderComponent) {
        // this.restartBtn = false;
        // timer(1500).subscribe(() => {
        //     this.items.push(
        //         ...Array(10)
        //             .fill(this.items.length)
        //             .map((v, i) => v + i),
        //     );

        //     if (this.items.length >= 50) {
        //         this.restartBtn = true;
        //         comp.setFinished();
        //         return;
        //     }
        //     comp.resolveLoading();
        // });
        this.query.pageIndex++;
        this.getCustomer(false);
        if (this.isLastPage) {
            comp.setFinished();
            return;
        }
        comp.resolveLoading();

    }


    getCustomer(initialize:boolean) {
        if(initialize){
            this.query.pageIndex = 1;
            this.customers=[];
        }
        this.search.tenantId = this.settingsService.tenantId;
        this.search.skipCount = this.query.skipCount();
        this.search.pageSize = this.query.pageSize;
        this.customerService.getAll(this.search).subscribe(data => {
            if(data){
                this.customers.push(...data);
            }
            if (data && data.length < this.query.pageSize) {
                this.isLastPage = true;
            }
        });
    }


    /**
     * 前往台账、档级
     */
    goCustomerLeavel() {
        this.router.navigate(['']);
    }
}
