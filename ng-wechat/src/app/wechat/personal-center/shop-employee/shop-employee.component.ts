import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUserService } from '../../../services';
import { WechatUser } from '../../../services/model';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogConfig, DialogService } from 'ngx-weui';

@Component({
    moduleId: module.id,
    selector: 'shop-employee',
    templateUrl: 'shop-employee.component.html',
    styleUrls: ['shop-employee.component.scss']
})
export class ShopEmployeeComponent extends AppComponentBase implements OnInit {
    @ViewChild('auto') autoAS: DialogComponent;
    shopEmployees: WechatUser[] = [];
    user: WechatUser;
    userId = '';
    private DEFCONFIG: DialogConfig = <DialogConfig>{
        // title: '弹窗标题',
        // content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
        skin: 'auto',
        backdrop: true,
        cancel: '取消',
        confirm: '确认',
    };
    config: DialogConfig = {};
    constructor(injector: Injector, private wechatUserService: WechatUserService, private actRouter: ActivatedRoute,
        private srv: DialogService, private router: Router) {
        super(injector);
        this.userId = this.actRouter.snapshot.params['userId'];
    }

    ngOnInit(): void {
        this.getShopEmployees();
    }

    getShopEmployees() {
        this.wechatUserService.getShopemployee({ tenantId: this.settingsService.tenantId, userId: this.userId }).subscribe(data => {
            this.shopEmployees = data;
        });
    }
    checkShopEmployee(input: WechatUser) {
        this.wechatUserService.checkShopEmployee(input).subscribe(data => {
            this.router.navigate(['/feedbacks/feedback-success', { successType: 'check' }])
        });
    }
    unbindShopEmployee(input: WechatUser) {
        this.wechatUserService.unBindShopEmployee(input).subscribe(data => {
            this.router.navigate(['/feedbacks/feedback-success', { successType: 'unbind' }])
        })
    }

    onShowBySrv(input: WechatUser, isCheck: boolean) {
        var alertText = isCheck ? '是否审核' + input.nickName : '是否解除' + input.nickName + '的绑定';
        this.config = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
            content: alertText,
        });
        this.srv.show(this.config).subscribe((res: any) => {
            if (res.value) {
                if (isCheck) {
                    this.checkShopEmployee(input);
                } else {
                    this.unbindShopEmployee(input);
                }
            } else {
            }
        });
        return false;
    }
}
