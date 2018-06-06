import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { Manuscript } from '@shared/entity/marketting';
import { ManuscriptServiceProxy, PagedResultDtoOfManuscript } from '@shared/service-proxies/marketing-service';
import { Parameter } from '@shared/service-proxies/entity';
import { Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';

@Component({
    moduleId: module.id,
    selector: 'contribute-management',
    templateUrl: 'contribute-management.component.html',
})
export class ContributeManagementComponent extends AppComponentBase implements OnInit {
    search: any = { status: 2 };
    Status = [
        { text: '全部', value: 2 },
        { text: '未处理', value: 0 },
        { text: '已处理', value: 1 },
    ];
    manuscripts: Manuscript[] = [];
    exportLoading = false;
    loading = false;
    constructor(injector: Injector, private manuscriptService: ManuscriptServiceProxy,
        private router: Router) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
    }
    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { status: 2 };
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.manuscriptService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfManuscript) => {
            this.loading = false;
            this.manuscripts = result.items;
            this.query.total = result.totalCount;
        });
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Title', value: this.search.title }));
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Phone', value: this.search.phone }));
        arry.push(Parameter.fromJS({ key: 'Status', value: this.search.status === 2 ? null : this.search.status }));
        return arry;
    }
    /**
    * 编辑活动
    * @param manuscript 
    */
    editManuscript(manuscript: Manuscript) {
        this.router.navigate(['admin/marketting/contribute-detail', manuscript.id])
    }

    exportExcelAll() {
        this.exportLoading = true;
        this.manuscriptService.exportExcel({}).subscribe(result => {
            if (result.code == 0) {
                var url = AppConsts.remoteServiceBaseUrl + result.data;
                document.getElementById('aManuscriptExcelUrl').setAttribute('href', url);
                document.getElementById('btnManuscriptHref').click();
            } else {
                this.notify.error(result.msg);
            }
            this.exportLoading = false;
        });
    }
}
