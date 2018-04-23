import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ActivityFormDto, ActivityGoods } from '@shared/service-proxies/entity';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { ActivityFormServiceProxy, ActivityGoodsServiceProxy } from '@shared/service-proxies/marketing-service';

//import * as _ from "lodash";

@Component({
    selector: 'edit-form-modal',
    templateUrl: './edit-form.component.html'
})
export class EditFormComponent extends AppComponentBase implements OnInit {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    modalVisible = false;
    isConfirmLoading = false;
    isDisablec = false;
    formDto: ActivityFormDto = null;
    form: FormGroup;
    goodsList: ActivityGoods[];

    constructor(
        injector: Injector,
        private _activityFormService: ActivityFormServiceProxy,
        private _activityGoodsService: ActivityGoodsServiceProxy,
        private fb: FormBuilder
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            activityGoodsId: [null, [Validators.required]],
            num: [null, [Validators.required]]
        });
    }

    show(fdto: ActivityFormDto): void {
        this.reset();
        this.formDto = fdto;
        this.getGoodList();
        this.modalVisible = true;
         //对isDisablec做初始化
         this.isDisablec = false;
    }

    getGoodList(){
        this._activityGoodsService.getByActivityId(this.formDto.activityId)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(result => {
                    this.goodsList = result;
                });
    }

    setGoodsSpecification(){
        this.goodsList.forEach(goods =>{
            if (goods.id == this.formDto.activityGoodsId) {
                this.formDto.goodsSpecification = goods.specification;
                return;
            }
        });
    }

    save(isSave = false): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        this.setGoodsSpecification();
        if (this.form.valid) {
            this._activityFormService.update(this.formDto)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info('修改成功！');
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
