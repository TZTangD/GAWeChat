import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
    selector: 'wechat-scan',
    templateUrl: './scan.component.html',
    styleUrls: [ './scan.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class ScanComponent {

    res: any = {
        cho2: true,
        worldpost: '1',
        contact: '1',
        country: '1',
        agree: true,
        card:''
    };

    num: number = 1;

    constructor() {

    }

    onSave() {
        alert('请求数据：' + JSON.stringify(this.res));
    }
}
