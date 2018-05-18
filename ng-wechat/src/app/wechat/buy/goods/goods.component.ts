import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { Observable } from 'rxjs';
import { ShopService, AppConsts } from '../../../services';
import { ShopProduct, Shop } from '../../../services/model';
import { Router } from '@angular/router';

@Component({
    selector: 'wechat-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoodsComponent extends AppComponentBase implements OnInit {
    value: string;
    goodes: Observable<ShopProduct[]>;
    shops: Shop[];
    sgoods: ShopProduct;
    lineDesc: string = '搜索并选择特色商品';
    hostUrl: string = AppConsts.remoteServiceBaseUrl;

    constructor(injector: Injector,
        private shopService: ShopService,
        private router: Router) {
        super(injector);
    }

    ngOnInit() {

    }

    onSearch(term: string) {
        this.value = term;
        if (term) {
            this.goodes = this.shopService.GetRareProductByKeyAsync({ tenantId: this.settingsService.tenantId, key: term });
        }
    }

    onCancel() {
        console.log('onCancel');
    }

    onClear() {
        console.log('onCancel');
    }

    onSelectGoods(gds: ShopProduct) {
        this.value = '';
        this.sgoods = gds;
        this.shopService.GetShopListByGoodsIdAsync({tenantId: this.settingsService.tenantId, goodsId: gds.id}).subscribe(res =>{
            this.shops = res;
            if(!this.shops || this.shops.length == 0){
                this.lineDesc = '没有售卖【'+ this.sgoods.specification +'】的店铺';
            }
        });
    }

    goShop(id) {
        this.router.navigate(['/shops/shop', { shopId: id }]);
    }
} 
