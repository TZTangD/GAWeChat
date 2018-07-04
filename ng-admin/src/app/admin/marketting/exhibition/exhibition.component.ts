import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ExhibitionShopServiceProxy, PagedResultDtoOfExhibitionShop } from '@shared/service-proxies/marketing-service';
import { Parameter } from '@shared/service-proxies/entity';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ExhibitionShop, Exhibition } from '@shared/entity/marketting';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

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
    exhibition: Exhibition = new Exhibition();
    form: FormGroup;

    constructor(injector: Injector, private fb: FormBuilder,
        private router: Router, private modal: NzModalService,
        private exhibitionService: ExhibitionShopServiceProxy, ) {
        super(injector);
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            // beginTime: [null, [Validators.compose([Validators.required, Validators.pattern(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/)])]],
            // endTime: [null, [Validators.compose([Validators.required, Validators.pattern(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/)])]],
            topTotal: [null, [Validators.compose([Validators.required, Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/), Validators.min(0)])]],
            frequency: [null, [Validators.compose([Validators.required, Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/), Validators.min(0)])]],
            desc: [null],
            content: [null],
            endTime: [null, Validators.compose([Validators.required])],
            beginTime: [null, Validators.compose([Validators.required])],
        });
        this.refreshData();
        this.getExhibitionConfig();
    }

    getFormControl(id: string) {
        return this.form.controls[id];
    }

    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.exhibitionService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfExhibitionShop) => {
            this.loading = false;
            this.exhibitionShopList = result.items;
            this.query.total = result.totalCount;
        })
    }

    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'ShopName', value: this.search.shopName }));
        return arry;
    }

    exhibitionDetails(id: string) {
        this.router.navigate(['admin/marketting/exhibition-detail', id]);
    }
    getExhibitionConfig() {
        this.exhibitionService.get().subscribe((result: Exhibition) => {
            this.exhibition = result;
        });
    }
    save() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this.loading = true;
            this.exhibition.beginTime = this.dateFormat(this.exhibition.beginTime);
            this.exhibition.endTime = this.dateFormat(this.exhibition.endTime);
            this.exhibitionService.update(this.exhibition).subscribe(() => {
                this.notify.info('保存成功！');
                this.getExhibitionConfig();
                this.loading = false;
            });
        }
    }
}
