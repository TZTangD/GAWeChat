import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivityFormDto, Parameter } from '@shared/service-proxies/entity';
import { ActivityFormServiceProxy, PagedResultDtoOfActivityForm } from '@shared/service-proxies/marketing-service/activity-form-service';

import { AppComponentBase } from '@shared/app-component-base';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-activity-form',
    templateUrl: './activity-form.component.html'
})
export class ActivityFormComponent extends AppComponentBase implements OnInit {
    data: ActivityFormDto[] = [];
    loading = false;
    parameters: any = { beginDate: null, endDate: null };

    statusList = [
        { text: '提交申请', value: 1, type: 'error' },
        { text: '初审通过', value: 2, type: 'processing' },
        { text: '资料回传已审核', value: 4, type: 'processing' },
        { text: '拒绝', value: 3, type: 'default' },
        { text: '取消', value: 5, type: 'default' },
        { text: '营销中心已审核', value: 6, type: 'success' }
    ];

    constructor(injector: Injector, public msg: NzMessageService, private _ActivityFormService: ActivityFormServiceProxy, private _router: Router) {
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

        this._ActivityFormService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfActivityForm) => {
            this.loading = false;
            let status = 0;
            this.query.total = result.totalCount;
            this.data = result.items;
        })
    };

    getParameter(): Parameter[] {
        let parray = [];
        parray.push(Parameter.fromJS({ key: 'FormCode', value: this.parameters.formCode }));
        parray.push(Parameter.fromJS({ key: 'BeginDate', value: this.dateFormat(this.parameters.beginDate) }));
        parray.push(Parameter.fromJS({ key: 'EndDate', value: this.dateFormat(this.parameters.endDate) }));
        parray.push(Parameter.fromJS({ key: 'Status', value: this.parameters.status }));
        parray.push(Parameter.fromJS({ key: 'Filter', value: this.parameters.filter }));
        return parray;
    }

    goDetail(id: string) {
        this._router.navigate(['admin/activity-form-detail', id]);
    }
}
