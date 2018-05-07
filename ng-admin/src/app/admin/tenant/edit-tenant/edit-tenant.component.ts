import { Component, Output, EventEmitter, OnInit, Injector } from '@angular/core';
import { TenantDto, TenantServiceProxy } from '@shared/service-proxies/service-proxies';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    moduleId: module.id,
    selector: 'edit-tenant-modal',
    templateUrl: 'edit-tenant.component.html',
})
export class EditTenantComponent extends AppComponentBase implements OnInit {


    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    modalVisible = false;
    isConfirmLoading = false;
    tenant: TenantDto;
    form: FormGroup;
    constructor(injector: Injector, private _tenantService: TenantServiceProxy, private fb: FormBuilder) {
        super(injector);//来自AppComponentBase
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            tenancyName: [null, [Validators.compose([Validators.required, Validators.maxLength(64)])]],
            name: [null, [Validators.compose([Validators.required, Validators.maxLength(128)])]],
            isactive: [null]
        });
    }

    /**
     * 
     * @param id 租户id
     */
    show(id: number) {
        this.modalVisible = true;
        this.tenant = new TenantDto();
        this._tenantService.get(id).subscribe((result: TenantDto) => {
            this.tenant = result;
        });
    }
    /**
     * 
     * @param name 
     */
    getFormControl(name: string) {
        return this.form.controls[name];
    }

    /**
     * 保存租户更新信息
     */
    save(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this.isConfirmLoading = true;
            this._tenantService.update(this.tenant)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('保存成功'));//来自AppComponentBase
                    this.modalVisible = false;
                    this.modalSave.emit(null);
                })

        }
    }

    /**
     * 取消按钮事件
     */
    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.reset();
    }
    reset(e?): void {
        if (e) {
            e.preventDefault();
        }
        this.form.reset();
        for (const key in this.form.controls) {
            this.form.controls[key].markAsPristine();
        }

    }
}


