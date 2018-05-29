import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MemberConfigs } from '@shared/entity/member/memberconfig';
import { Router } from '@angular/router';
import { MemberConfigsServiceProxy, PagedResultDtoOfMemberConfigs } from '@shared/service-proxies/member/memberconfigs-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { ConfigCode } from '@shared/entity/member/configcode';
import { MessageEmployeeModalComponent } from './message-employee-modal/message-employee-modal.component';
import { WechatUser } from '@shared/entity/wechat';

@Component({
    moduleId: module.id,
    selector: 'member-setting',
    templateUrl: 'member-setting.component.html',
})
export class MemberSettingComponent extends AppComponentBase implements OnInit {
    @ViewChild('selectsEmployeeModal') selectsEmployeeModal: MessageEmployeeModalComponent;
    modalVisible = false;
    isDisablec = false;
    userNameIds: WechatUser[];

    loading = false;
    form: FormGroup;
    config: MemberConfigs[] = [];
    configCode: ConfigCode = new ConfigCode();
    constructor(injector: Injector, private fb: FormBuilder,
        private modal: NzModalService, private memberconfigsService: MemberConfigsServiceProxy) {
        super(injector);
    }
    ngOnInit(): void {
        this.configCode.init({ rcCode: 3, cCode: 1, eCode: 2 });
        this.form = this.fb.group({
            cValue: [null, [Validators.compose([Validators.required, Validators.pattern(/^([1-9]\d*|0)(\.\d*[1-9])?$/)])]],
            rcValue: [null, [Validators.compose([Validators.required, Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/)])]],
            eValue: [null, [Validators.compose([Validators.required, Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/), Validators.min(0)])]]

        });
        this.getMemberConfigsByTenantId();
    }
    getFormControl(id: string) {
        return this.form.controls[id];
    }

    /**
     * 通过租户id获取积分配置
     */
    getMemberConfigsByTenantId() {
        this.memberconfigsService.getMemberConfigs().subscribe((result: PagedResultDtoOfMemberConfigs) => {
            this.config = result.items;
            this.config.map(i => {
                if (i.code == 3) {
                    this.configCode.rcValue = i.value;
                    this.configCode.rcId = i.id;
                }
                if (i.code == 2) {
                    this.configCode.eValue = i.value;
                    this.configCode.eId = i.id;
                }
                if (i.code == 1) {
                    this.configCode.cValue = i.value;
                    this.configCode.cId = i.id;
                }
            })
        });
    }

    save() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this.memberconfigsService.update(this.configCode).subscribe(() => {
                this.notify.info(this.l('保存成功！'));
                this.getMemberConfigsByTenantId();
            });
        }
        abp.multiTenancy.setTenantIdCookie();
    }

    /**
 * 显示员工列表模态框
 */
    employee(): void {
        // this.modalVisible=true;
        this.selectsEmployeeModal.show();
    }
    /**
     * 模态框返回
     */
    getSelectData = (employee?: WechatUser[]) => {
        var employeeIds = employee.map(v => {
            return v;
        }).join(',');
        // this.userNameIds = this.userNameIds.concat(employeeIds:any);
    }

}
