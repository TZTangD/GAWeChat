import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUser, UserType } from '../../../services/model';
import { Router } from '@angular/router';

@Component({
    selector: 'wechat-shop',
    templateUrl: './shop.component.html',
    styleUrls: [ './shop.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class ShopComponent extends AppComponentBase implements OnInit {

    user: WechatUser;

    res: any = {
        cho2: true,
        worldpost: '1',
        contact: '1',
        country: '1',
        agree: true
    };

    radio: any[] = [
        { id: 1, name: 'asdf1' },
        { id: 2, name: 'asdf2' }
    ];
    checkbox: any[] = [ 'A', 'B' ];

    constructor(injector: Injector, private router: Router) {
        super(injector);
        this.res.radio = this.radio[0];
        this.res.checkbox = [ this.checkbox[0] ];
    }

    ngOnInit() {
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
            if (this.user) {
                if(this.user.userType != UserType.Retailer){ //不是零售客户需先绑定
                    this.router.navigate(["/center/bind-retailer"]);
                } else {
                    if(!this.user.isShopkeeper && this.user.status == 0){//不是店主 且 未审核
                        this.router.navigate(["/center/wait-audit"]);
                    }
                }
            }
        });
    }

    onAddCheckbox() {
        this.checkbox.push(String.fromCharCode(65 + this.checkbox.length));
    }

    onSendCode(): Observable<boolean> {
        return Observable.timer(1000).map((v, i) => true);
    }

    onSave() {
        alert('请求数据：' + JSON.stringify(this.res));
    }
}
