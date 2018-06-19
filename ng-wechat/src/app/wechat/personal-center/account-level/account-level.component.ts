import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUser, Customers, Level, Accounts, UserType } from '../../../services/model';
import { ActivatedRoute, Router } from '@angular/router';
import { WechatUserService, CustomerService, LevelAccountAccpintService } from '../../../services';

@Component({
    moduleId: module.id,
    selector: 'account-level',
    templateUrl: 'account-level.component.html',
    styleUrls: ['account-level.component.scss']
})
export class AccountLevelComponent extends AppComponentBase implements OnInit {
    user: WechatUser = new WechatUser();
    customer: Customers = new Customers();
    level: Level = new Level();
    mothAccounts: Accounts[] = [];
    preAccount: Accounts[] = [];
    accounts: Accounts[] = [];
    levelClass = '';
    defaultHed = './assets/images/timg-4.jpeg';
    headImg = '';
    id = '';
    licenseKey = '';
    verCode = '****';
    //是否显示验证码
    showCode = false;

    //台账
    isAccount = false;
    tableShow = 1;
    nowDate = '';
    //季度、年度
    qypreData = '';
    currentId = '';
    constructor(injector: Injector, private actRouter: ActivatedRoute, private router: Router,
        private weChatUserService: WechatUserService, private customerService: CustomerService,
        private levelAccountAccpintService: LevelAccountAccpintService) {
        super(injector);
        this.id = this.actRouter.snapshot.params['id'];
        this.licenseKey = this.actRouter.snapshot.params['licenseKey'];//暂时未用
        var date = new Date();
        this.nowDate = this.dateFormat(date);
    }
    ngOnInit(): void {
        this.getCurrentUser();
    }

    /**
     * 当内部员工进入当页时获取微信用户信息
     */
    // getSingleWeChatUser(id) {
    //     this.weChatUserService.getSingleWeChatUser({ userId: id, tenantId: this.settingsService.tenantId }).subscribe(data => {
    //         this.user = data;
    //         this.headImg = (data.headImgUrl == null || data.headImgUrl == '') ? this.defaultHed : data.headImgUrl;
    //     });
    // }


    getCurrentUser() {
        this.settingsService.getUser().subscribe(data => {
            this.user = data;
            this.headImg = this.user.headImgUrl;
            this.currentId = data.userId;
            if (!this.id) {
                this.id = data.userId;
            }
            this.getLevel();
            this.getAccount(1);
            if (this.user.userType == UserType.Staff || this.user.isShopkeeper) {
                this.showCode = true;
            } else {
                this.showCode = false;
            }
        });
    }
    /**
     * 获取单个零售户信息（内部员工）
     */
    // getSingleCustomer() {
    //     this.customerService.getSingle({ id: this.id }).subscribe(data => {
    //         this.customer = data;
    //         this.getSingleWeChatUser(data.id);
    //     });
    // }
    getLevel() {
        this.levelAccountAccpintService.getLevel({ tenantId: this.settingsService.tenantId, userId: this.id }).subscribe(data => {
            this.level = data;
            if (this.id !== this.user.userId) {
                this.headImg = (data.headImgUrl === '' || data.headImgUrl === null) ? this.defaultHed : data.headImgUrl;
            }

        });
    }

    showVerCode() {
        if (this.verCode == this.level.verificationCode) {
            this.verCode = '****';
        } else {
            this.verCode = this.level.verificationCode;
        }
    }
    goSourceOfGoods() {
        this.router.navigate(['/good-sources/good-source', { code: this.level.code }]);
    }
    goBack() {
        this.router.navigate(['/personals/personal']);
    }
    //#region 台账

    showTable(code) {
        this.tableShow = code;
        this.getAccount(code);
    }

    getAccount(span: number) {
        this.levelAccountAccpintService.getAccount({ tenantId: this.settingsService.tenantId, userId: this.id, span: span }).subscribe(data => {
            // this.level = data.basicInfo;
            this.mothAccounts = data.monthAccountBooks;
            this.preAccount = data.preMonthAccountBooks;
            this.accounts = data.accountBooks;
            if (this.accounts.length > 0) {
                this.qypreData = this.accounts[0].bookDate;
            }
        });
    }
    //#endregion

    dateFormat(date: any): string {
        if (date === null) {
            return null;
        }
        let d = new Date(date);
        let y = d.getFullYear().toString();
        var cm = d.getMonth();
        let m = (cm + 1) > 10 ? (cm + 1).toString() : '0' + (cm + 1).toString();
        //let day = d.getDate().toString();
        return y + "." + m;
        //let dateStr:string = this.datePipe.transform(d,'yyyy-MM-dd');
        //return dateStr;
    }
}
