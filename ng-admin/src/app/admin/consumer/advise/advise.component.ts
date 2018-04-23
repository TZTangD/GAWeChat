import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Advise, Parameter } from '@shared/service-proxies/entity';
import { AdviseService, PagedResultDtoOfAdvise } from '@shared/service-proxies/consumer-service';

import { AppComponentBase } from '@shared/app-component-base';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-advise',
    templateUrl: './advise.component.html'
})
export class AdviseComponent extends AppComponentBase implements OnInit {
    data: Advise[] = [];
    loading = false;
    parameters: any = { beginDate: null, endDate: null };

    constructor(injector: Injector, public msg: NzMessageService, private _adviseService: AdviseService, private _router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.refreshData();
    }

    refreshData(reset = false) {
        if (reset) {
            this.query.pageIndex = 1;
        }
        this.loading = true;

        this._adviseService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfAdvise) => {
            this.loading = false;
            let status = 0;
            this.query.total = result.totalCount;
            this.data = result.items;
        })
    };

    getParameter(): Parameter[] {
        let parray = [];
        parray.push(Parameter.fromJS({ key: 'Filter', value: this.parameters.filter }));
        return parray;
    }
}
