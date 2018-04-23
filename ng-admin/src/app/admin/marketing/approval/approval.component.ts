import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ActivityFormStatusDto } from '@shared/service-proxies/entity';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { ActivityFormServiceProxy } from '@shared/service-proxies/marketing-service';

//import * as _ from "lodash";

@Component({
    selector: 'approval-modal',
    templateUrl: './approval.component.html'
})
export class ApprovalComponent extends AppComponentBase implements OnInit {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    modalVisible = false;
    isConfirmLoading = false;
    isDisablec = false;
    formStatus: ActivityFormStatusDto = null;
    form: FormGroup;

    constructor(
        injector: Injector,
        private _activityFormService: ActivityFormServiceProxy,
        private fb: FormBuilder
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            opinion: [null, [Validators.required, Validators.maxLength]]
        });
    }

    show(status: ActivityFormStatusDto): void {
        this.reset();
        this.formStatus = status;
        this.modalVisible = true;
         //对isDisablec做初始化
         this.isDisablec = false;
    }

    save(isSave = false): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this._activityFormService.changeStatus(this.formStatus)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info('提交成功！');
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
