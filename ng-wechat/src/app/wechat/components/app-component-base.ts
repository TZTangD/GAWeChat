import { Injector, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SettingsService } from '../../services';

export abstract class AppComponentBase {

    activatedRoute: ActivatedRoute;
    settingsService: SettingsService;

    query: any = {
        pageIndex: 1,
        pageSize: 10,
        skipCount: function () { return (this.pageIndex - 1) * this.pageSize; },
        total: 0,
        sorter: ''
    };

    constructor(injector: Injector) {
        this.activatedRoute = injector.get(ActivatedRoute);
        this.settingsService = injector.get(SettingsService);
        this.activatedRoute.params.subscribe((params: Params) => {
            let openId = params['openId'];
            let tenantId = params['tenantId'];
            if(openId){
                this.settingsService.setUserId(openId, tenantId);
            }
            //console.log('openId:' + openId);
            //console.log('tenantId:' + tenantId);
        });
    }

    get WUserParams() {
        var params: any = {};
        if(this.settingsService.tenantId){
            params.tenantId = this.settingsService.tenantId;
        }
        if(this.settingsService.openId){
            params.openId = this.settingsService.openId;
        }
        return params;
    }
}
