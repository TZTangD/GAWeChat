import { Component, Output, EventEmitter, Injector, OnInit } from '@angular/core';
import { CreateTenantDto, TenantServiceProxy } from '@shared/service-proxies/service-proxies';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    moduleId: module.id,
    selector: 'create-tenant-modal',
    templateUrl: 'create-tenant.component.html',
})
export class CreateTenantComponent extends AppComponentBase implements OnInit {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    //模态框是否可用
    modalVisible = false;
    isConfirmLoading = false;

    tenant: CreateTenantDto = null;

    form: FormGroup;
    constructor(injector: Injector, private _tenantService: TenantServiceProxy, private fb: FormBuilder) {
        super(injector);
    }
    /**
     * 页面初始加载
     */
    ngOnInit(): void {
        this.form = this.fb.group({
            tenancyName: [null, [Validators.compose([Validators.required, Validators.maxLength(64)])]],
            name: [null, [Validators.compose([Validators.required, Validators.maxLength(128)])]],
            adminEmailAddress: [null, [Validators.email]],
            connectionString: [null],
            isactive: [true]
        }, );
    }

    /**
     * 
     */
    show(): void {
        this.reset();
        this.tenant = new CreateTenantDto();
        this.tenant.init({ isActive: true });
        this.modalVisible = true;
    }

    /**
     * 
     * @param name 
     */
    getFormControl(name: string) {
        return this.form.controls[name];
    }
    /**
     * 
     * @param e 
     */
    reset(e?): void {
        if (e) {
            e.preventDefault();
        }
        this.form.reset();
        for (const key in this.form.controls) {
            this.form.controls[key].markAsPristine();
        }
    }
    /**
     * 取消按钮事件
     */
    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.reset(e);
    }
    /**
     * 保存租户信息
     */
    save(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this._tenantService.create(this.tenant)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('保存成功'));
                    this.modalVisible = false;
                    this.modalSave.emit(null);
                });
        }

    }
}
