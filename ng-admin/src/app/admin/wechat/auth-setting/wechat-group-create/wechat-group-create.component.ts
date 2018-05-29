import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { WeChatGroupServiceProxy } from '@shared/service-proxies/wechat-service';
import { WeChatGroup } from '@shared/entity/wechat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'wechat-group-create',
    templateUrl: 'wechat-group-create.component.html',
})
export class WechatGroupCreateComponent extends AppComponentBase implements OnInit {
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    cdalVisible = false;
    isConfirmLoading = false;
    cloading = false;
    wechatGroup: WeChatGroup = new WeChatGroup();
    wechatGroupes: WeChatGroup[] = [];

    formc: FormGroup;
    types = [
        { text: '零售客户', value: 1 },
        { text: '内部员工', value: 2 },
        // { text: '消费者', value: 4 },
    ]
    showTypes = [
       
    ];
    constructor(injector: Injector, private wechatGroupService: WeChatGroupServiceProxy, private fb: FormBuilder) {
        super(injector);
    }

    ngOnInit(): void {
        this.formc = this.fb.group({
            typeCode: [null, Validators.compose([Validators.required])],
            tagName: [null, Validators.compose([Validators.required])],
        });
    }


    /**
     * 显示模态框（进入新增页）
     */
    show(wechatGroupes: WeChatGroup[]) {
        this.showTypes = [
            { text: '零售客户', value: 1 },
            { text: '内部员工', value: 2 },
            // { text: '消费者', value: 4 },
        ];
        this.wechatGroupes = wechatGroupes;
        this.reset();
        this.cdalVisible = true;
        this.wechatGroup = new WeChatGroup();
       
        this.getFilterArry();
    }

    /**
     * 过滤已经存在的类型
     */
    // filterType() {
    //     if (this.wechatGroupes.length > 0) {
    //         // this.wechatGroupes.map(i => {
    //             this.showTypes = this.types.filter((item, index, arry) => {
    //                 this.wechatGroupes.map(i=>{
    //                     return item.value != i.typeCode;
    //                 });
    //             });
    //         // });
    //     } else {
    //         this.showTypes = this.types;
    //     }
    // }


    getFormControl(name: string) {
        return this.formc.controls[name];
    }

    /**
     * 取消按钮事件
     */
    chandleCancel = (e) => {
        this.cdalVisible = false;
        this.isConfirmLoading = false;
        this.reset(e);
    }

    reset(e?): void {
        if (e) {
            e.preventDefault();
        }
        this.formc.reset();
        for (const key in this.formc.controls) {
            this.formc.controls[key].markAsPristine();
        }
    }

    /**
     * 保存
     */
    savec() {
        //检查form验证
        for (const i in this.formc.controls) {
            this.formc.controls[i].markAsDirty();
        }
        if (this.formc.valid) {
            this.isConfirmLoading = true;
            this.wechatGroupService.Create(this.wechatGroup)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('保存成功！'));
                    this.cdalVisible = false;
                    this.modalSave.emit(null);
                });
        }
    }
    changeValue() {
        this.types.map(i => {
            if (i.value === this.wechatGroup.typeCode) {
                this.wechatGroup.tagName = i.text;
                this.wechatGroup.typeName = i.text;
            }
        });
    }

  
    getFilterArry() {
        if (this.wechatGroupes.length > 0) {
            this.wechatGroupes.forEach((item) =>{
                for (let index = 0; index < this.showTypes.length; index++) {
                    if (item.typeCode === this.showTypes[index].value) {
                        this.showTypes.splice(index, 1);
                        return;
                    }
                }
            });
        }
    }
}
