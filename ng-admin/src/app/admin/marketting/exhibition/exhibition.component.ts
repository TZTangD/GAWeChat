import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ExhibitionShopServiceProxy, PagedResultDtoOfExhibitionShop } from '@shared/service-proxies/marketing-service';
import { Parameter } from '@shared/service-proxies/entity';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ExhibitionShop } from '@shared/entity/marketting';

@Component({
    moduleId: module.id,
    selector: 'exhibition',
    templateUrl: 'exhibition.component.html',
})
export class ExhibitionComponent extends AppComponentBase implements OnInit {
    exhibitionShopList: ExhibitionShop[] = [];
    loading = false;
    exportLoading = false;
    search: any = {};

    constructor(injector: Injector,
        private router: Router, private modal: NzModalService,
        private exhibitionShopService: ExhibitionShopServiceProxy, ) {
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
        this.exhibitionShopService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfExhibitionShop) => {
            this.loading = false;
            this.exhibitionShopList = result.items;
            this.query.total = result.totalCount;
        })
    }

    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.shopName }));
        return arry;
    }
}
