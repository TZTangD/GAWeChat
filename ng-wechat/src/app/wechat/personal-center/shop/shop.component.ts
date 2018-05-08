import { Component, ViewEncapsulation, Injector, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUser, UserType, Shop, ShopProduct } from '../../../services/model';
import { Router } from '@angular/router';
import { ShopService, AppConsts } from '../../../services';

import { PopupComponent } from "ngx-weui/popup";
import { ToptipsService } from "ngx-weui/toptips";

@Component({
    selector: 'wechat-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShopComponent extends AppComponentBase implements OnInit {

    user: WechatUser;
    shop: Shop;
    shopProducts: ShopProduct[];
    shopProductIds: string[];
    @ViewChild('product') productPopup: PopupComponent;
    cigaretteProducts: ShopProduct[];//卷烟类
    specialProducts: ShopProduct[];//特产类
    host: string;

    constructor(injector: Injector,
        private router: Router,
        private shopService: ShopService,
        private srv: ToptipsService) {
        super(injector);
        this.host = AppConsts.remoteServiceBaseUrl;
    }

    ngOnInit() {
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
            if (this.user) {
                //console.table(this.user);
                if (this.user.userType != UserType.Retailer) { //不是零售客户需先绑定
                    this.router.navigate(['/center/bind-retailer']);
                } else {
                    if (!this.user.isShopkeeper && this.user.status == 0) {//不是店主 且 未审核
                        this.router.navigate(['/center/wait-audit']);
                    } else {
                        this.shopService.GetShopByOpenId(this.WUserParams)
                            .subscribe(result => {
                                this.shop = result;
                                if (!this.shop) {//如果没有店铺 需要新增 
                                    this.router.navigate(['/center/shop-add']);
                                }
                            });
                    }
                }
            }
        });
    }

    goEditShop() {
        this.router.navigate(['/center/shop-add', { id: '1' }]);
        //this.router.navigateByUrl('/center/shop-add');
    }

    onSelectProducts() {
        if (!this.shopProducts) {
            let params: any = { shopId: this.shop.id };
            if (this.settingsService.tenantId) {
                params.tenantId = this.settingsService.tenantId;
            }

            this.shopService.GetShopProductsByShopId(params).subscribe(result => {
                this.shopProducts = result.map(result => {
                    result.photoUrl = this.host + result.photoUrl;
                    return result;
                });
                this.shopProductIds = this.shopProducts.map(s => { return s.id });
            });

            let params2: any = {};
            if (this.settingsService.tenantId) {
                params2.tenantId = this.settingsService.tenantId;
            }

            this.shopService.GetRareProduct(params2).subscribe(data => {
                this.cigaretteProducts = data.cigaretteProducts;
                this.specialProducts = data.specialProducts;
            });
        }
    }

    onProductPopup() {
        this.productPopup.show();
    }

    save() {
        console.table(this.shopProductIds);
        if (this.shopProductIds.length <= 0) {
            this.srv['warn']('请选择特色产品');
        } else {
            let params: any = { shopId: this.shop.id, productIds: this.shopProductIds };
            if (this.settingsService.tenantId) {
                params.tenantId = this.settingsService.tenantId;
            }
            this.shopService.SaveShopProducts(params).subscribe(result => {
                if (result && result.code == 0) {
                    this.shopProducts = ShopProduct.fromJSArray(result.data);
                    this.srv['success']('保存成功');
                    this.productPopup.close();
                } else {
                    this.srv['warn']('保存异常');
                }
            });
        }
    }
}
