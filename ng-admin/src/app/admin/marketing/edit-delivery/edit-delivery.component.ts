import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ActivityDeliveryInfoDto } from '@shared/service-proxies/entity';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { ActivityDeliveryInfoServiceProxy } from '@shared/service-proxies/marketing-service';

//import * as _ from "lodash";

@Component({
    selector: 'edit-delivery-modal',
    templateUrl: './edit-delivery.component.html'
})
export class EditDeliveryComponent extends AppComponentBase implements OnInit {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    title: string = '基本信息';

    modalVisible = false;
    isConfirmLoading = false;
    isDisablec = false;
    deliveryDto: ActivityDeliveryInfoDto = null;
    form: FormGroup;

    constructor(
        injector: Injector,
        private _activityDeliveryInfoService: ActivityDeliveryInfoServiceProxy,
        private fb: FormBuilder
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            userName: [null, [Validators.required, Validators.maxLength(50)]],
            address: [null, [Validators.required, Validators.maxLength(200)]],
            phone: [null, [Validators.required, Validators.maxLength(20)]],
            deliveryRemark: [null, [Validators.maxLength(500)]]
        });
    }

    show(delivery: ActivityDeliveryInfoDto): void {
        this.reset();
        this.deliveryDto = delivery;
        this.modalVisible = true;
         //对isDisablec做初始化
         this.isDisablec = false;
    }

    save(isSave = false): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this._activityDeliveryInfoService.update(this.deliveryDto)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info('保存成功！');
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }

    close(): void {
        this.modalVisible = false;
        //this.modal.hide();
    }

    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.reset(e);
    }

    getFormControl(name: string) {
        return this.form.controls[name];
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
