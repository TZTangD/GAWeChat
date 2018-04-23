import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { UserQuestion, Parameter } from '@shared/service-proxies/entity';
import { UserQuestionService, PagedResultDtoOfUserQuestion } from '@shared/service-proxies/marketing-service';

import { AppComponentBase } from '@shared/app-component-base';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-user-question',
    templateUrl: './user-question.component.html'
})
export class UserQuestionComponent extends AppComponentBase implements OnInit {
    data: UserQuestion[] = [];
    loading = false;
    parameters: any = { beginDate: null, endDate: null };

    constructor(injector: Injector, public msg: NzMessageService, private _userQuestionService: UserQuestionService, private _router: Router) {
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

        this._userQuestionService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfUserQuestion) => {
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

    goDetail(id: string) {
        this._router.navigate(['admin/user-question-detail', id]);
    }
}
