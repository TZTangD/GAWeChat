import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { WechatUser } from '@shared/entity/wechat';
import { WechatUserServiceProxy, PagedResultDtoOfWeChatUser } from '@shared/service-proxies/wechat-service';
import { NzModalService } from 'ng-zorro-antd';
import { Parameter } from '@shared/service-proxies/entity';
import { AppConsts } from '@shared/AppConsts';

@Component({
    moduleId: module.id,
    selector: 'member-management',
    templateUrl: 'member-management.component.html',
})
export class MemberManagementComponent extends AppComponentBase implements OnInit {
    search: any = { name: '', UserType: null };
    loading = false;
    exportLoading = false;
    weChatUsers: WechatUser[] = [];
    positions = [
        { text: '零售客户', value: 1 },
        { text: '内部员工', value: 2 },
        { text: '消费者', value: 4 },
        { text: '取消关注', value: 5 },
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
                // wechatUser.userType = 4;
                // wechatUser.bindStatus = 0;
                // wechatUser.userId=null;
                // wechatUser.userName=null;
                this.wechatUserService.update(wechatUser).subscribe(() => {
                    this.notify.info(this.l('解除绑定成功！'));
                    this.refreshData();
                });
            }
        })
    }
    exportExcelAll() {
        this.exportLoading = true;
        this.wechatUserService.exportExcel({}).subscribe(result => {
            if (result.code == 0) {
                var url = AppConsts.remoteServiceBaseUrl + result.data;
                document.getElementById('aMemberExcelUrl').setAttribute('href', url);
                document.getElementById('btnMemberHref').click();
            } else {
                this.notify.error(result.msg);
            }
            this.exportLoading = false;
        });
    }
}
