///<reference path="../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Injector, OnInit, ViewEncapsulation} from '@angular/core';
import {AppComponentBase} from '../../../components/app-component-base';
import {ArticleService} from '../../../../services';
import {Router} from '@angular/router';
import {JWeiXinService} from 'ngx-weui';

@Component({
    selector: 'share-success',
    templateUrl: './share-success.component.html',
    styleUrls: ['./share-success.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ShareSuccessComponent extends AppComponentBase implements OnInit {
    ngOnInit(): void {
    }

    constructor(injector: Injector) {
        super(injector);
    }

}
