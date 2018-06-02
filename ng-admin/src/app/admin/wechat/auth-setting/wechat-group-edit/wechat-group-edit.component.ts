import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { WeChatGroupServiceProxy } from '@shared/service-proxies/wechat-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WeChatGroup } from '@shared/entity/wechat';

@Component({
    moduleId: module.id,
    selector: 'wechat-group-edit',
    templateUrl: 'wechat-group-edit.component.html',
})
export class WechatGroupEditComponent extends AppComponentBase implements OnInit {
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    emodalVisible = false;
    eloading = false;
    eIsConfirmLoading = false;
    forme: FormGroup;
    wechatGroupE: WeChatGroup = new WeChatGroup();
    wechatGroupesE: WeChatGroup[] = [];

    types = [
        { text: '零售客户', value: 1 },
        { text: '内部员工', value: 2 },
        // { text: '消费者', value: 4 },
    ];
    showTypesE = [];
    id: number;

    constructor(injector: Injector, private wechatGroupService: WeChatGroupServiceProxy, private fb: FormBuilder) {
        super(injector);
    }

    ngOnInit(): void {
        this.forme = this.fb.group({
            typeCode: [null, Validators.compose([Validators.required])],
            tagName: [null, Validators.compose([Validators.required])],
        });
    }

    /**
     * 显示模态框（进入修改页）
     * @param wechatGroupes 所有分组信息
     * @param id 需要修改分组id
     */
    show(wechatGroupes: WeChatGroup[], id) {
        this.showTypesE = [
            { text: '零售客户', value: 1 },
            { text: '内部员工', value: 2 },
            // { text: '消费者', value: 4 },
        ]
        this.id = id;
        this.wechatGroupesE = wechatGroupes;
        this.reset();
        this.emodalVisible = true;

        this.getSingleWeChatGroup();
    }

   

    /**
     * 获取单个分组信息
     */
    getSingleWeChatGroup() {
        this.wechatGroupService.get(this.id).subscribe((result: WeChatGroup) => {
            this.wechatGroupE = result;
            this.getFilterArry(result);
        });
    }

    getFormControl(name: string) {
        return this.forme.controls[name];
    }
    /**
     * 取消按钮事件
     */
    ehandleCancel = (e) => {
        this.emodalVisible = false;
        this.eIsConfirmLoading = false;
        this.reset(e);
    }

    reset(e?): void {
        if (e) {
            e.preventDefault();
        }
        this.forme.reset();
        //将form表单初始化
        for (const key in this.forme.controls) {
            this.forme.controls[key].markAsPristine();
        }
    }

    /**
     * 下拉框的OnChange事件
     */
    changeValueE() {
        this.types.map(i => {
            if (i.value === this.wechatGroupE.typeCode) {
                this.wechatGroupE.tagName = i.text;
                this.wechatGroupE.typeName = i.text;
            }
        });
    }

    /**
     * 保存 
     */
    savee() {
        //检查form验证
        for (const i in this.forme.controls) {
            this.forme.controls[i].markAsDirty();
        }
        if (this.forme.valid) {
            this.eIsConfirmLoading = true;
            this.wechatGroupService.update(this.wechatGroupE)
                .finally(() => { this.eIsConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('保存成功！'));
                    this.emodalVisible = false;
                    this.modalSave.emit(null);
                });
        }
    }

    getFilterArry(result: WeChatGroup) {
        if(this.wechatGroupesE.length>0){
            this.wechatGroupesE.forEach(item => {
                for (let index = 0; index < this.showTypesE.length; index++) {
                    if (item.typeCode === this.showTypesE[index].value) {
                        this.showTypesE.splice(index, 1);
                        return;
                    }
                }
            });
        }
       
        this.types.forEach(j => {
            if (result.typeCode === j.value) {
                this.showTypesE.push(j);
            }
        });
    }

}
