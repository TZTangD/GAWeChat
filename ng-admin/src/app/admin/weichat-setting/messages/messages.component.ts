import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { MessageServiceProxy, PagedResultDtoOfMessage, SubscribeServiceProxy } from '@shared/service-proxies/service-proxies';
import { Messagess } from '@shared/service-proxies/entity/messages';
import { Subscribess } from '@shared/service-proxies/entity/subscribe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { EditMessageComponent } from './edit-message/edit-message.component';
import { CreateMessageComponent } from './create-message/create-message.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'messages',
    templateUrl: 'messages.component.html',
})
export class MessagesComponent extends AppComponentBase implements OnInit {
    @ViewChild('editMessageModal') editMessageModal: EditMessageComponent;
    @ViewChild('createMessageModal') createMessageModal: CreateMessageComponent;

    q: any = {
        pi: 1,
        ps: 10,
        total: 0,
        sorter: '',
        status: -1,
        statusList: []
    };
    loading = false;
    mesText: string = '';
    //用于显示删除框关键字
    mesT: string = '';
    isConfirmLoading = false;
    messagess: Messagess[] = [];
    subscribes: Subscribess = new Subscribess();
    form: FormGroup;
    msyTypes = [
        { value: 1, text: '文字消息' },
        // { value: 2, text: '图文消息' },
    ];
    constructor(injector: Injector, private messageService: MessageServiceProxy,
        private subscribeService: SubscribeServiceProxy, private fb: FormBuilder,
        private modal: NzModalService
    ) {
        super(injector);
    }
    /**
     * 页面初始加载
     */
    ngOnInit(): void {
        this.getMessgeAll();
        this.getSubscribe();
        this.form = this.fb.group({
            msgType: [null, [Validators.compose([Validators.required])]],
            content: [null, [Validators.compose([Validators.required])]]
        }, );
    }
    //#region 自动回复消息

    /**
     * 获取自动回复消息信息
     * @param reset 
     */
    getMessgeAll(reset = false) {
        if (reset) {
            this.q.pi = 1;
        }
        this.loading = true;
        this.messageService.getAll(this.query.skipCount(), this.query.pageSize, this.mesText).subscribe((result: PagedResultDtoOfMessage) => {
            this.loading = false;
            let status = 0;
            this.messagess = result.items;
            this.query.total = result.totalCount;
        });
    }
    /**
     * 重置
     */
    ResetSearch(): void {
        this.mesText = '';
        this.getMessgeAll(true);
    }

    /**
     * 新建自动回复消息
     */
    createMessage() {
        this.createMessageModal.show();
    }

    /**
     * 更新自动回复消息
     */
    editMessage(message: Messagess) {
        this.editMessageModal.show(message.id);
    }

    /**
     * 删除单条关键字回复
     * @param messages 关键字回复信息
     * @param contentTpl 删除框id
     */
    delete(messages: Messagess, contentTpl): void {
        this.mesT = messages.keyWord;
        this.modal.confirm({
            content: contentTpl,
            okText: '是',
            cancelText: '否',
            onOk: () => {
                this.messageService.delete(messages.id)
                    .subscribe(() => {
                        this.notify.info(this.l('删除成功！'));
                        this.getMessgeAll();
                    });
            },
            onCancel: () => {
            }
        });
    }

    //#endregion

    //#region  关注回复消息 
    /**
     * 获取关注回复消息
     */
    getSubscribe() {
        this.subscribeService.get().subscribe((result: Subscribess) => {
            this.subscribes = result;
            if (!result.id) {
                this.subscribes.msgType = 1;
            }
        });
    }
    /**
     * 
     * @param name 
     */
    getFormControl(name: string) {
        return this.form.controls[name];
    }

    /**
     * 保存关注回复消息
     */
    save(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this.subscribeService.update(this.subscribes)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('保存成功'));
                    this.getSubscribe();
                });
        }
    }
    deletes(contentTpl) {
        this.modal.confirm({
            content: contentTpl,
            okText: '是',
            cancelText: '否',
            onOk: () => {
                this.subscribeService.delete(this.subscribes.id)
                    .subscribe(() => {
                        this.getSubscribe();
                        this.form.reset();
                        this.notify.info(this.l('删除成功！'));
                    });
            },
            onCancel: () => {
            }
        });
    }
    //#endregion
}
