import { Component, ViewEncapsulation, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUserService, AppConsts } from '../../../services';
import { WechatUser } from '../../../services/model';
import 'jsbarcode';

@Component({
    selector: 'wechat-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MemberCardComponent extends AppComponentBase implements OnInit {

    user: WechatUser;

    constructor(injector: Injector, private wechatUserService: WechatUserService) { 
        super(injector);
    }

    ngOnInit() {
        this.generateBarcode('barcode','986625505077755904');
    }

    generateBarcode(id: string, code: string) {
        var barcode = document.getElementById(id),
          options = {
            format: 'CODE128',
            displayValue: true,
            background:'#FAFAFA',
            fontSize: 20,
            height: 100,
            font: 'sans-serif'//,
            //fontOptions: 'bold'
          };
        JsBarcode(barcode, code, options);
      }
    
} 
