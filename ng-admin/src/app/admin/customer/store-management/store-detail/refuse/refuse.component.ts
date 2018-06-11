import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { AppComponentBase } from '@shared/app-component-base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopServiceProxy } from '@shared/service-proxies/customer-service';

@Component({
    moduleId: module.id,
    selector: 'refuse-nodal',
    templateUrl: 'refuse.component.html',
})
export class RefuseComponent extends AppComponentBase implements OnInit {
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    modalVisible = false;
    isConfirmLoading = false;
    form: FormGroup;
    refusal = '';
    id = '';
    constructor(injector: Injector, private fb: FormBuilder, private shopService: ShopServiceProxy) {
        super(injector);
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            refusal: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
        });
    }
    show(id: string) {
        this.reset();
        this.id=id;
        this.modalVisible = true;

    }

    getFormControl(name: string) {
        return this.form.controls[name];
    }

    /**
    * 取消按钮事件
    */
    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.reset(e);
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

    save() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this.isConfirmLoading = true;
            this.shopService.CheckShop({ id: this.id, status: 0, reason: this.refusal })
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(data => {
                    this.modalVisible = false;
                    this.modalSave.emit(null);
                    this.notify.info(this.l('店铺状态更新成功！'));
                });
        }
    }
}
