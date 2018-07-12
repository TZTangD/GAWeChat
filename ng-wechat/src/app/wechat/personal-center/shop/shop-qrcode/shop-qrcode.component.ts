import { Component, OnInit, Injector, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '../../../components/app-component-base';
import { DialogConfig, DialogService } from 'ngx-weui';
import { AppConsts, ShopService } from '../../../../services';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../../../../services/model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs';
import { LoaderService } from 'ngx-weui/utils/loader.service';
import { isAndroid } from 'ngx-weui/utils/browser';

@Component({
    selector: 'shop-qrcode',
    templateUrl: 'shop-qrcode.component.html',
    styleUrls: ['shop-qrcode.component.scss']
})
export class ShopQrcodeComponent extends AppComponentBase implements OnInit {
    @Input() config: DialogConfig;
    @Output() close = new EventEmitter<ShopQrcodeComponent>();
    private observer: Observer<any>;
    shop: Shop = new Shop();
    qrCodeUrl = '';
    _shown = false;
    isExist = false;
    constructor(injector: Injector, private shopService: ShopService, private activeRoute: ActivatedRoute,
        private load: LoaderService) {
        super(injector);
    }
    ngOnInit(): void {

    }
    show(shop: Shop): Observable<any> {
        if (this.config.skin === 'auto') {
            this.config.skin = isAndroid() ? 'android' : 'ios';
        }
        this.shop = shop;
        console.log(this.shop);
        if (!this.isExist) {
            this.getQrCode();
        }
        this._shown = true;
        return Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        });
    }
    generateQRcode(id: string, url: any) {
        let qrShopCode = new QRCode(id, {
            text: url,
            width: 230,
            height: 230,
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    /**
    * 隐藏
    *
    * @param is_backdrop 是否从背景上点击
    */
    hide(is_backdrop: boolean = false) {
        if (is_backdrop === true && this.config.backdrop === false) return false;

        this._shown = false;
        this.close.emit(this);
    }
    getQrCode() {
        console.log(this.shop.id)
        this.load.loadScript('assets/libs/qrcode.min.js').then((res) => {
            this.shopService.GetQrCodeUrl({shopId:this.shop.id}).subscribe(data => {
                //生成微信二维码
                this.generateQRcode('wechat_qrcode', data);
                this.isExist = true;
            });
        })
    }


}
