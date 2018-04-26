import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppComponentBase } from '../../components/app-component-base';

@Component({
    selector: 'wechat-bind-member',
    templateUrl: './bind-member.component.html',
    styleUrls: [ './bind-member.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class BindMemberComponent extends AppComponentBase {

    res: any = {};

    constructor(injector: Injector) { 
        super(injector);
    }

    onSave() {
        alert('请求数据：' + JSON.stringify(this.res));
    }
}
