import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MemberConfigs } from '@shared/entity/member/memberconfig';
import { Router } from '@angular/router';
import { MemberConfigsServiceProxy } from '@shared/service-proxies/member/memberconfigs-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'member-setting',
    templateUrl: 'member-setting.component.html',
})
export class MemberSettingComponent extends AppComponentBase implements OnInit {
    loading = false;
    form: FormGroup;
    authSet: MemberConfigs = new MemberConfigs();
    constructor(injector: Injector, private fb: FormBuilder,
        private modal: NzModalService, private memberconfigsService: MemberConfigsServiceProxy) {
        super(injector);
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null, [Validators.compose([Validators.maxLength(50), Validators.required])]],
            appOrgId: [null, [Validators.compose([Validators.required, Validators.maxLength(250)])]],
            appType: [null, [Validators.required]],
            appId: [null, [Validators.compose([Validators.required, Validators.maxLength(250)])]],
            cValue: [null, [Validators.maxLength(250)]],
            rcValue: [null, [Validators.compose([Validators.required, Validators.maxLength(250)])]],
            eValue: [null, [Validators.compose([Validators.maxLength(500)])]]
        });
        // this.getAuthSetByTenantId();
        // this.refreshData();
    }
    getFormControl(name: string) {
        return this.form.controls[name];
    }

    /**
     * 通过租户id获取积分配置
     */
    getMemberConfigsByTenantId() {
        this.memberconfigsService.getMemberConfigs().subscribe((result: MemberConfigs) => {
            this.authSet = result;
            if (!this.authSet.id) {
                // this.authSet.appType = 3;
            }
        });
    }
}
