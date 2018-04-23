import { Component, ViewChild, ElementRef, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { IsTenantAvailableInput, AccountServiceProxy } from "@shared/service-proxies/service-proxies";
import { AppTenantAvailabilityState } from "@shared/AppEnums";

@Component({
    selector: 'tenant-change-modal',
    templateUrl: 'tenant.component.html',
})
export class TenantComponent extends AppComponentBase {
    @ViewChild('tenancyNameInput') tenancyNameInput: ElementRef;

    tenancyName: string = '';
    modalVisible: boolean = false;
    saving: boolean = false;

    constructor(injector: Injector, private accountService: AccountServiceProxy) {
        super(injector);
        this.tenancyName='';
    }
    /**
     * 显示模态框
     * @param tenancyName 租户名字
     */
    show(tenancyName: string) {
        this.tenancyName = tenancyName;
        this.modalVisible = true;
        // $(this.tenancyNameInput.nativeElement).focus().select();
    }
    /**
     * 关闭模态框
     */
    close() {
        this.modalVisible = false;
    }
    handleCancel = (e?) => {
        this.modalVisible = false;
    }

    /**
     * 保存当前租户
     */
    save() {
        if (!this.tenancyName) {
            abp.multiTenancy.setTenantIdCookie(undefined);
            this.handleCancel();
            location.reload();
            return;
        }
        var input = new IsTenantAvailableInput();
        input.tenancyName = this.tenancyName;
        this.saving = true;
        this.accountService.isTenantAvailable(input)
            .finally(() => { this.saving = false; })
            .subscribe((result) => {
                switch (result.state) {
                    case AppTenantAvailabilityState.Available:
                        abp.multiTenancy.setTenantIdCookie(result.tenantId);
                        this.handleCancel();
                        location.reload();
                        return;
                    case AppTenantAvailabilityState.InActive:
                        this.message.warn(this.l('TenantIsNotActive', this.tenancyName));
                        break;
                    case AppTenantAvailabilityState.NotFound:
                        this.message.warn(this.l('ThereIsNoTenantDefinedWithName{0}', this.tenancyName));
                        break;
                }
            });
    }
}