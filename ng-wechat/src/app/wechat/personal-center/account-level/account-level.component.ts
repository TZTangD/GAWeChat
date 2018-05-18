import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUser, Customers } from '../../../services/model';
import { ActivatedRoute, Router } from '@angular/router';
import { WechatUserService, CustomerService } from '../../../services';

@Component({
    moduleId: module.id,
    selector: 'account-level',
    templateUrl: 'account-level.component.html',
    styleUrls: ['account-level.component.scss']
})
export class AccountLevelComponent extends AppComponentBase implements OnInit {
    user: WechatUser = new WechatUser();
    customer: Customers = new Customers();
    levelClass = '';
    defaultHed = './assets/images/default-head.png';
    headImg = '';
    id = '';
    verCode='****';

    //台账
    isAccount = true;
    // isLevel = false;
    tableShow = 1;
    constructor(injector: Injector, private actRouter: ActivatedRoute, private router: Router,
        private weChatUserService: WechatUserService, private customerService: CustomerService) {
        super(injector);
        this.id = this.actRouter.snapshot.params['id'];
    }
    ngOnInit(): void {
        if (this.customer) {
            this.getSingleCustomer();
        } else {
            this.getCurrentUser();
        }
        console.log(this.isAccount)
    }

    /**
     * 当内部员工进入当页时获取微信用户信息
     */
    getSingleWeChatUser(id) {
        this.weChatUserService.getSingleWeChatUser({ userId: id, tenantId: this.settingsService.tenantId }).subscribe(data => {
            this.user = data;
            this.headImg = (data.headImgUrl == null || data.headImgUrl == '') ? this.defaultHed : data.headImgUrl;
        });
    }
    /**
     * 当零售户进入当页时获取微信用户信息
     */
    getCurrentUser() {
        this.settingsService.getUser().subscribe(data => {
            this.user = data;
            this.headImg = (data.headImgUrl == null || data.headImgUrl == '') ? this.defaultHed : data.headImgUrl;
        });
    }
    /**
     * 获取单个零售户信息（内部员工）
     */
    getSingleCustomer() {
        this.customerService.getSingle({id:this.id}).subscribe(data => {
            this.customer = data;
            this.getSingleWeChatUser(data.id);
        });
    }
    showVerCode(){
        this.verCode='12345';
    }
    goSourceOfGoods() {
        this.router.navigate(['']);
    }
    goBack(){
        this.router.navigate(['/personals/personal']);
    }
    //#region 台账

    showTable(code) {
        this.tableShow = code;
    }
    //#endregion
}
