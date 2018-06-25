import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { LotterySettingServiceProxy } from '@shared/service-proxies/member';
import { LuckyDraw } from '@shared/entity/member';

@Component({
    moduleId: module.id,
    selector: 'lottery-setting',
    templateUrl: 'lottery-setting.component.html',
})
export class LotterySettingComponent extends AppComponentBase implements OnInit {

    form: FormGroup;
    name = '';
    qty = '';
    luckyDraw = new LuckyDraw();
    isConfirmLoading = false;
    constructor(injector: Injector, private fb: FormBuilder, private router: Router, private lotterySettingService: LotterySettingServiceProxy) {
        super(injector);
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
            consume: [null],
            frequency: [null],
        });
        this.refreshData();

    }
    refreshData() {
        this.lotterySettingService.get().subscribe(data => {
            this.luckyDraw = data;
            console.log(data);
            if (!this.luckyDraw.id) {
                console.log('aa')
                this.luckyDraw.init({ consume: 20, frequency: 5 });
                // this.luckyDraw.frequency = 5;
            }
        });
    }

    save() {
        //检查form验证
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this.isConfirmLoading = true;
            this.lotterySettingService.update(this.luckyDraw)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(data => {
                    this.luckyDraw = data;
                    this.notify.info(this.l('保存成功！'));
                });
        }

    }
    getFormControl(name: string) {
        return this.form.controls[name];
    }

    detail(id: string) {
        this.router.navigate(["admin/member/lottery-record-detail", { id: id }])
    }

}
