import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { WechatUserServiceProxy, PagedResultDtoOfWeChatUser } from '@shared/service-proxies/wechat-manager/wechat-user-service';
import { Parameter } from '@shared/service-proxies/entity';
import { WechatUser } from '@shared/service-proxies/entity/wechat-user';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'wechat-user',
    templateUrl: 'wechat-user.component.html',
})
export class WechatUserComponent extends AppComponentBase implements OnInit {
    search: any = { name: '', UserType: null };
    loading = false;
    weChatUsers: WechatUser[] = [];
    positions = [
        { text: '客户经理', value: 2 },
        { text: '营销人员', value: 3 },
        { text: '零售客户', value: 1 },
        { text: '消费者', value: 4 },
    ];
    WechatUserName = '';
    constructor(injector: Injector, private wechatUserService: WechatUserServiceProxy, private modal: NzModalService) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
    }
    refreshData(reset = false) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { name: '', UserType: null };
        }
        this.loading = true;
        this.wechatUserService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfWeChatUser) => {
            this.weChatUsers = result.items;
            this.loading = false;
            this.query.total = result.totalCount;
        });
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'UserType', value: this.search.UserType }));
        return arry;

    }

    /**
     * 解除绑定
     * @param wechatUser 微信用户实体
     */
    unBinding(wechatUser: WechatUser, TplContent) {
        this.WechatUserName = wechatUser.nickName;
        this.modal.confirm({
            content: TplContent,
            cancelText: '取消',
            okText: '确定',
            onOk: () => {
                wechatUser.userType = 4;
                wechatUser.bindStatus = 0;
                wechatUser.unBindTime = new Date;
                this.wechatUserService.update(wechatUser).subscribe(() => {
                    this.notify.info(this.l('解除绑定成功！'));
                    this.refreshData();
                });
            }
        })

    }
}
