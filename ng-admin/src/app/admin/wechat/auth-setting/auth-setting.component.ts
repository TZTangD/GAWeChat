import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AuthSettingServiceProxy } from '@shared/service-proxies/service-proxies';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { AuthSetting } from '@shared/entity/wechat';
import { WeChatGroup } from '@shared/entity/wechat/wechat-group';
import { WeChatGroupServiceProxy, PagedResultDtoOfWeChatGroup } from '@shared/service-proxies/wechat-service';
import { Parameter } from '@shared/service-proxies/entity';
import { WechatGroupCreateComponent } from './wechat-group-create/wechat-group-create.component';

@Component({
    moduleId: module.id,
    selector: 'auth-setting',
    templateUrl: 'auth-setting.component.html',
})
export class AuthSettingComponent extends AppComponentBase implements OnInit {
    // @ViewChild('editMessageModal') editMessageModal: EditMessageComponent;
    @ViewChild('createWeChatGroupModal') createWeChatGroupModal: WechatGroupCreateComponent;

    form: FormGroup;
    authSet: AuthSetting = new AuthSetting();
    weChatGroups: WeChatGroup[] = [];
    appTypes = [
        { text: '订阅号', value: 1 },
        { text: '认证订阅号', value: 2 },
        { text: '服务号', value: 3 },
        { text: '认证服务号', value: 4 },

    ]
    search: any = {};
    loading = false;
    constructor(injector: Injector, private fb: FormBuilder, private service: AuthSettingServiceProxy,
        private modal: NzModalService, private WeChatGroupService: WeChatGroupServiceProxy) {
        super(injector);
    }

    /**
     * 页面初始加载
     */
    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null, [Validators.compose([Validators.maxLength(50), Validators.required])]],
            appOrgId: [null, [Validators.compose([Validators.required, Validators.maxLength(250)])]],
            appType: [null, [Validators.required]],
            appId: [null, [Validators.compose([Validators.required, Validators.maxLength(250)])]],
            appSecret: [null, [Validators.compose([Validators.required, Validators.maxLength(250)])]],
            encodingAESKey: [null, [Validators.compose([Validators.maxLength(500)])]],
            qrCodeUrl: [null, [Validators.maxLength(250)]],
            token: [null, [Validators.compose([Validators.required, Validators.maxLength(250)])]]
            // accessToken: [null, [Validators.maxLength(255)]],
            // expiresIn: [null],
            // nextGettime: [null]
        });
        this.getAuthSetByTenantId();
        this.refreshData();
    }
    /**
     * 
     * @param name 
     */
    getFormControl(name: string) {
        return this.form.controls[name];
    }

    /**
     * 更新新增微信配置
     */
    save(Tplcontent) {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            if (this.authSet.id) {
                this.modal.confirm({
                    content: Tplcontent,
                    okText: '继续',
                    cancelText: '取消',
                    onOk: () => {
                        this.service.update(this.authSet).subscribe(() => {
                            this.notify.info(this.l('保存成功！'));
                            this.getAuthSetByTenantId();
                        });
                    }
                });
            } else {
                this.service.update(this.authSet).subscribe(() => {
                    this.notify.info(this.l('保存成功！'));
                    this.getAuthSetByTenantId();
                });
            }
        }
        abp.multiTenancy.setTenantIdCookie();

    }

    /**
     * 通过租户id获取微信配置
     */
    getAuthSetByTenantId() {
        this.service.get().subscribe((result: AuthSetting) => {
            this.authSet = result;
            if (!this.authSet.id) {
                this.authSet.appType = 3;
            }
        });
    }
    //#region 分组

    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = {}
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.WeChatGroupService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfWeChatGroup) => {
            this.loading = false;
            this.weChatGroups = result.items;
            this.query.total = result.totalCount;
        });
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'name', value: this.search.name }));
        // arry.push(Parameter.fromJS({ key: 'Position', value: this.search.position }));
        return arry;
    }

    editMessage() {

    }
    
    createWeChatGroup() {
        this.createWeChatGroupModal.show(this.weChatGroups);
    }

    batchMark(){
         this.WeChatGroupService.BatchMarkWeChatUser().subscribe(()=>{
             this.notify.info(this.l('分组成功！'))
         });
    }
    //#endregion
}
