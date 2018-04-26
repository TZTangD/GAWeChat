import { Injector, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

export abstract class AppComponentBase {

    activatedRoute: ActivatedRoute;
    openId: string;
    tenantId: string;

    query: any = {
        pageIndex: 1,
        pageSize: 10,
        skipCount: function () { return (this.pageIndex - 1) * this.pageSize; },
        total: 0,
        sorter: ''
    };

    constructor(injector: Injector) {
        this.activatedRoute = injector.get(ActivatedRoute);
        this.activatedRoute.params.subscribe((params: Params) => {
            this.openId = params['openId'];
            this.tenantId = params['tenantId'];

            console.log('openId:' + this.openId);
            console.log('tenantId:' + this.tenantId);
        });
    }
}
