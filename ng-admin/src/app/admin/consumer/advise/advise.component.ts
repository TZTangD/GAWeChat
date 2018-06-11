import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { Parameter } from '@shared/service-proxies/entity';
import { NzMessageService } from 'ng-zorro-antd';
import { AdviseService, PagedResultDtoOfAdvise } from '@shared/service-proxies/consumer-service';
import { Router } from '@angular/router';
import { Advise } from '@shared/entity/consumer';
import { AppConsts } from '@shared/AppConsts';

@Component({
    moduleId: module.id,
    selector: 'advise',
    templateUrl: 'advise.component.html',
})
export class AdviseComponent extends AppComponentBase implements OnInit {
    data: Advise[] = [];
    loading = false;
    parameters: any = { beginDate: null, endDate: null };
    exportLoading = false;

    constructor(injector: Injector, public msg: NzMessageService, private _adviseService: AdviseService, private _router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.refreshData();
    }

    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
        }
        if (search) {
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
        parray.push(Parameter.fromJS({ key: 'Name', value: this.parameters.name }));
        return parray;
    }

    adviseDetail(advise: Advise) {
        this._router.navigate(['admin/consumer/advise-detail', advise.id]);
    }

    exportExcelAll() {
        this.exportLoading = true;
        this._adviseService.exportExcel({}).subscribe(result => {
            if (result.code == 0) {
                var url = AppConsts.remoteServiceBaseUrl + result.data;
                document.getElementById('aAdviseExcelUrl').setAttribute('href', url);
                document.getElementById('btnAdviseHref').click();
            } else {
                this.notify.error(result.msg);
            }
            this.exportLoading = false;
        });
    }
}
