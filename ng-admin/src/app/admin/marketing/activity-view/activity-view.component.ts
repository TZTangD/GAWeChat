import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivityViewDto, Parameter } from '@shared/service-proxies/entity';
import { ActivityFormServiceProxy, PagedResultOfActivityView } from '@shared/service-proxies/marketing-service/activity-form-service';

import { AppComponentBase } from '@shared/app-component-base';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-activity-view',
    templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent extends AppComponentBase implements OnInit {
    data: ActivityViewDto[] = [];
    loading = false;
    parameters: any = { beginDate: null, endDate: null, activityArea: '0' };
    areas = [
        { text: '全部', value: '0' },
        { text: '南溪区', value: '南溪区' },
        { text: '宜宾县', value: '宜宾县' },
        { text: '江安县', value: '江安县' },
        { text: '长宁县', value: '长宁县' },
        { text: '高县', value: '高县' },
        { text: '筠连县', value: '筠连县' },
        { text: '珙县', value: '珙县' },
        { text: '兴文县', value: '兴文县' },
        { text: '屏山县', value: '屏山县' },
    ]

    constructor(injector: Injector, public msg: NzMessageService, private _ActivityFormService: ActivityFormServiceProxy, private _router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.refreshData();
    }

    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.parameters = { beginDate: null, endDate: null, activityArea: '0' };
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;

        this._ActivityFormService.getView(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultOfActivityView) => {
            this.loading = false;
            let status = 0;
            this.query.total = result.totalCount;
            this.data = result.items;
        })
    };

    getParameter(): Parameter[] {
        let parray = [];
        parray.push(Parameter.fromJS({ key: 'BeginDate', value: this.dateFormat(this.parameters.beginDate) }));
        parray.push(Parameter.fromJS({ key: 'EndDate', value: this.dateFormat(this.parameters.endDate) }));
        parray.push(Parameter.fromJS({ key: 'ActivityArea', value: this.parameters.activityArea == '0' ? null : this.parameters.activityArea }));
        parray.push(Parameter.fromJS({ key: 'ManagerName', value: this.parameters.managerName }));
        parray.push(Parameter.fromJS({ key: 'GoodsSpecification', value: this.parameters.goodsSpecification }));
        return parray;
    }
}
