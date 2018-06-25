import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { LotterySettingServiceProxy, WinningRecordServiceProxy, PagedResultDtoOfWinningRecord } from '@shared/service-proxies/member';
import { LuckyDraw, WinningRecord } from '@shared/entity/member';
import { Parameter } from '@shared/service-proxies/entity';

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

    winningRecords: WinningRecord[]=[];
    loading=false;
    search: any = { status: 2};

    constructor(injector: Injector, private fb: FormBuilder, private router: Router, private lotterySettingService: LotterySettingServiceProxy,
    private winningRecordService:WinningRecordServiceProxy) {
        super(injector);
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
            consume: [null],
            frequency: [null],
        });
        this.getSingleLotterySetting();
        this.refreshData();

    }
    //#region  抽奖设置
    getSingleLotterySetting() {
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
    //#endregion
    refreshData(reset = false, search?: boolean){
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { status: 2 };
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.winningRecordService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfWinningRecord) => {
            this.loading = false;
            this.winningRecords = result.items;
            this.query.total = result.totalCount;
        })
    }

    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Author', value: this.search.author }));
        arry.push(Parameter.fromJS({ key: 'Status', value: this.search.status === 2 ? null : this.search.status }));
        return arry;
    }
    //#region  中奖记录

    //#endregion
    detail(id: string) {
        this.router.navigate(["admin/member/lottery-record-detail", { id: id }])
    }

}
