import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { AppComponentBase } from '../../components/app-component-base';
import { WechatUser, UserType, Shop } from '../../../services/model';
import { Router } from '@angular/router';
import { ShopService } from '../../../services';

@Component({
    selector: 'wechat-shop',
    templateUrl: './shop.component.html',
    styleUrls: [ './shop.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class ShopComponent extends AppComponentBase implements OnInit {

    user: WechatUser;
    shop: Shop;

    constructor(injector: Injector, 
        private router: Router,
        private shopService: ShopService) {
        super(injector);
    }

    ngOnInit() {
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
            if (this.user) {
                //console.table(this.user);
                if(this.user.userType != UserType.Retailer){ //不是零售客户需先绑定
                    this.router.navigate(["/center/bind-retailer"]);
                } else {
                    if(!this.user.isShopkeeper && this.user.status == 0){//不是店主 且 未审核
                        this.router.navigate(["/center/wait-audit"]);
                    }else {
                        
                        this.shopService.GetShopByOpenId(this.WUserParams)
                        .subscribe(result =>{
                            this.shop = result;
                            if(!this.shop){//如果没有店铺 需要新增
                                this.router.navigate(["/center/shop-add"]);
                             } 
                        });
                    }
                }
            }
        });
    }
}
