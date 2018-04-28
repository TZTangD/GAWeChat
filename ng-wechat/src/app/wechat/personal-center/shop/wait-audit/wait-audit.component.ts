import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppComponentBase } from '../../../components/app-component-base';
import { WechatUser } from '../../../../services/model';

@Component({
    selector: 'wechat-wait-audit',
    templateUrl: './wait-audit.component.html',
    styleUrls: [ './wait-audit.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class WaitAuditComponent extends AppComponentBase implements OnInit {

    user: WechatUser;

    constructor(injector: Injector) { 
        super(injector);
    }

    ngOnInit() {
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
        });
    }
    
}
