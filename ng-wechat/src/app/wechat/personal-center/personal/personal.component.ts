import { Component, ViewEncapsulation, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { AppConsts } from '../../../services';
import { WechatUser } from '../../../services/model';
import { Router } from '@angular/router';

@Component({
    selector: 'wechat-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PersonalComponent extends AppComponentBase implements OnInit {

    user: WechatUser;

    constructor(injector: Injector, private router: Router) { 
        super(injector);
    }

    ngOnInit() {
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
        });
    }

    goShowCard(){
        alert(this.user.phone)
        if(!this.user.phone || this.user.phone == null || this.user.phone == ''){
            this.router.navigate(["/center/bind-member"]);
        } else {
            this.router.navigate(["/center/member-card"]);
        }
    }
} 
