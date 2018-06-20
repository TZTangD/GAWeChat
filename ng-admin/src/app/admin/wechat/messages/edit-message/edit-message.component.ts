import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageServiceProxy } from '@shared/service-proxies/service-proxies';
import { Messagess } from '@shared/entity/wechat';

@Component({
    moduleId: module.id,
    selector: 'edit-message-modal',
    templateUrl: 'edit-message.component.html',
})
export class EditMessageComponent extends AppComponentBase implements OnInit {
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    messages: Messagess = new Messagess();
    modalVisible = false;
    isConfirmLoading = false;
    forme: FormGroup;
    linkVal: any;
    msyTypes = [
        { value: 1, text: '文字消息' },
        { value: 2, text: '图文消息' },
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
        this.forme = this.fb.group({
            keyWord: [null, [Validators.compose([Validators.required, Validators.maxLength(50)])]],
            matchMode: [null, Validators.required],
            msgType: [null, Validators.required],
            content: [null, [Validators.compose([Validators.required])]],
            title: [null],
            desc: [null],
            picLink: [null],
        });
    }

    /**
     * 进入编辑页方法
     * @param id 
     */
    show(id: number) {
        this.getMessageById(id);
        this.modalVisible = true;
    }

    cleanText() {
        if (this.linkVal != this.messages.msgType) {
            this.messages.content = null;
            this.linkVal = JSON.stringify(this.messages.msgType);
        }
    }

    /**
    * 
    * @param name 
    */
    geteFormControl(name: string) {
        return this.forme.controls[name];
    }
    /**
     * 取消按钮
     */
    handleCancel = (e) =>  {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.reset(e);
    }
    reset(e?): void {
        if (e) {
            e.preventDefault();
        }
        this.forme.reset();
        for (const key in this.forme.controls) {
            this.forme.controls[key].markAsPristine();
        }

    }

    /**
     * 获取单条自动回复消息
     * @param id 自动回复消息id
     */
    getMessageById(id: number) {
        this.messageService.get(id).subscribe((result: Messagess) => {
            this.messages = result;
            this.linkVal = JSON.stringify(this.messages.msgType);
        })
    }

    /**
     * 保存自动回复信息
     */
    save(): void {
        //将控件标记为已编辑过
        for (const i in this.forme.controls) {
            this.forme.controls[i].markAsDirty();
        }
        if (this.forme.valid) {
            this.messageService.update(this.messages)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('保存成功！'));
                    this.modalVisible = false;
                    this.modalSave.emit(null);
                });
        }
    }
}
