import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { WeChatGroupServiceProxy } from '@shared/service-proxies/wechat-service';
import { WeChatGroup } from '@shared/entity/wechat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'wechat-group-create',
    templateUrl: 'wechat-group-create.component.html',
    styleUrls: ['wechat-group-create.component.scss']
})
export class WechatGroupCreateComponent extends AppComponentBase implements OnInit {
    cdalVisible = false;
    isConfirmLoading = false;
    wechatGroup: WeChatGroup = new WeChatGroup();
    formc: FormGroup;
    constructor(injector: Injector, private wechatGroupService: WeChatGroupServiceProxy, private fb: FormBuilder) {
        super(injector);
    }
    ngOnInit(): void {
        this.formc = this.fb.group({
            typeCode: [null, Validators.compose([Validators.required])],
            tagName: [null, Validators.compose([Validators.required])],
        });
    }
    show() {
        this.reset();
        this.cdalVisible = true;
    }
    chandleCancel=(e)=>{

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
}
