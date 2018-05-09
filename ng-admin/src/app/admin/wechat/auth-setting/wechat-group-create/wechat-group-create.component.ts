import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { WeChatGroupServiceProxy } from '@shared/service-proxies/wechat-service';
import { WeChatGroup } from '@shared/entity/wechat';

@Component({
    moduleId: module.id,
    selector: 'wechat-group-create',
    templateUrl: 'wechat-group-create.component.html',
    styleUrls: ['wechat-group-create.component.scss']
})
export class WechatGroupCreateComponent extends AppComponentBase implements OnInit {
    cdalVisible=false;
    isConfirmLoading=false;
    wechatGroup:WeChatGroup=new WeChatGroup(); 
    constructor(injector: Injector, private wechatGroupService: WeChatGroupServiceProxy) {
        super(injector);
    }
    ngOnInit(): void {

    }
    show() {
this.cdalVisible=true;

    }
}
