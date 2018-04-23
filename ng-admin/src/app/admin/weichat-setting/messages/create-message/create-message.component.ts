import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MessageServiceProxy } from '@shared/service-proxies/service-proxies';
import { Messagess } from '@shared/service-proxies/entity/messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
    moduleId: module.id,
    selector: 'create-message-modal',
    templateUrl: 'create-message.component.html',
})
export class CreateMessageComponent extends AppComponentBase implements OnInit {
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    //模态框是否可见
    modalVisible = false;
    // 加载效果  
    isConfirmLoading = false;
    messages: Messagess = new Messagess();
    formc: FormGroup;
    // msgTypes:[
    //     {text:'文字消息',value:1}
    // ]
    msyTypes = [
        { value: 1, text: '文字消息' },
        // { value: 2, text: '图文消息' },
    ];
    matchModes = [
        { value: 1, text: '精准匹配' },
        { value: 2, text: '模糊匹配' },
    ];
    constructor(injector: Injector, private messageService: MessageServiceProxy, private fb: FormBuilder) {
        super(injector);

    }
    /**
     * 页面初始加载
     */
    ngOnInit(): void {
        this.formc = this.fb.group({
            keyWord: [null, [Validators.compose([Validators.required, Validators.maxLength(50)])]],
            matchMode: [null, Validators.required],
            msgType: [null, Validators.required],
            content: [null, [Validators.compose([Validators.required])]]
        });
    }
    /**
     * 显示模态框（进入新增页）
     */
    show() {
        this.reset();
        this.messages = new Messagess();
        this.messages.msgType = 1;
        this.messages.matchMode=1;
        this.modalVisible = true;
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
        this.formc.reset();
        for (const key in this.formc.controls) {
            this.formc.controls[key].markAsPristine();
        }
    }

    /**
     * 
     * @param name 
     */
    getcFormControl(name: string) {
        return this.formc.controls[name];
    }

    /**
     * 保存关键字回复信息
     */
    save(): void {
        for (const i in this.formc.controls) {
            this.formc.controls[i].markAsDirty();
        }
        this.isConfirmLoading = true;
        this.messageService.update(this.messages)
            .finally(() => {
                this.isConfirmLoading = false;
            })
            .subscribe(() => {
                this.notify.info(this.l('保存成功！'));
                this.modalVisible = false;
                this.modalSave.emit(null);
            });
    }

}
