import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { InfiniteLoaderComponent } from 'ngx-weui';
import { GoodSourceService } from '../../../services/personal-center/good-source.service';
import { GoodSource } from '../../../services/model';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'good-source',
    templateUrl: 'good-source.component.html',
    styleUrls: ['good-source.component.scss']
})
export class GoodSourceComponent extends AppComponentBase implements OnInit {
    @ViewChild(InfiniteLoaderComponent) il;
    search: any = [];
    goodSources: GoodSource[] = [];
    custCode = '';
    isLastPage = false;
    constructor(injector: Injector, private goodSourceService: GoodSourceService, private actRouter: ActivatedRoute) {
        super(injector);
        this.custCode = this.actRouter.snapshot.params['code'];
    }
    ngOnInit(): void {
        // this.isLastPage=false;
        this.getGoodSource();
    }

    onLoadMore(comp: InfiniteLoaderComponent) {
        this.query.pageIndex++;
        this.getGoodSource();
        if (this.isLastPage) {
            comp.setFinished();
            return;
        }
        comp.resolveLoading();

    }

    getGoodSource() {
        this.search.tenantId = this.settingsService.tenantId;
        this.search.pageSize = this.query.pageSize;
        this.search.skipCount = this.query.skipCount();
        this.search.CustCode = this.custCode;
        this.goodSourceService.getSource(this.search).subscribe(data => {
            if (data) {
                this.goodSources.push(...data);
            }
            if (data && data.length <= this.query.pageSize) {
                this.isLastPage = true;
            }
        });
    }
}
