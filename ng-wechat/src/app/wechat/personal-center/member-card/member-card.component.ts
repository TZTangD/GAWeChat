import { Component, ViewEncapsulation, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { AppConsts } from '../../../services';
import { WechatUser } from '../../../services/model';
import 'jsbarcode';
import { Router } from '@angular/router';

@Component({
    selector: 'wechat-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MemberCardComponent extends AppComponentBase implements OnInit {

    user: WechatUser;

    constructor(injector: Injector, private router: Router) {
        super(injector);
    }

    ngOnInit() {
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
            if (!this.user || !this.user.phone || !this.user.memberBarCode) {//没有电话号码和会员卡号 都需要重新绑定
                this.router.navigate(["/personals/bind-member"]);
            } else {
                this.generateBarcode('barcode', this.user.memberBarCode);
            }
        });
    }

    generateBarcode(id: string, code: string) {
        var barcode = document.getElementById(id),
            options = {
                format: 'CODE128',
                displayValue: true,
                background: '#FAFAFA',
                fontSize: 20,
                height: 100,
                font: 'sans-serif'//,
                //fontOptions: 'bold'
            };
        JsBarcode(barcode, code, options);
    }

} 
