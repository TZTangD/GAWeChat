import { Component, Injector, OnInit } from '@angular/core';
import { WechatUser } from '@shared/entity/wechat';
import { WechatUserServiceProxy, PagedResultDtoOfWeChatUser } from '@shared/service-proxies/wechat-service';
import { NzModalService } from 'ng-zorro-antd';
import { AppComponentBase } from '@shared/app-component-base';
import { Parameter } from '@shared/service-proxies/entity';

@Component({
    moduleId: module.id,
    selector: 'member-management',
    templateUrl: 'member-management.component.html',
})
export class MemberManagementComponent extends AppComponentBase implements OnInit {
    search: any = { name: '', UserType: 5 };
    loading = false;
    weChatUsers: WechatUser[] = [];
    positions = [
        { text: '全部', value: 5 },
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
            this.search = { name: '', UserType: 5 };
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
        arry.push(Parameter.fromJS({ key: 'UserType', value: this.search.UserType === 5 ? null : this.search.UserType }));
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
