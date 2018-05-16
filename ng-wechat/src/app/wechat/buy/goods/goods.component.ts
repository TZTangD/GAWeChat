import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { Observable } from 'rxjs';
import { ShopService } from '../../../services';
import { ShopProduct } from '../../../services/model';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'wechat-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoodsComponent extends AppComponentBase implements OnInit {

    items: Observable<string[]>;
    value: string;
    goodes: ShopProduct[] = [];

    constructor(injector: Injector,
        private shopService: ShopService) {
        super(injector);
    }

    ngOnInit() {
        this.commonService.config(switchMap<string, ShopProduct[]>(word => {
            this.shopService.GetRareProductByKey({ tenantId: this.settingsService.tenantId, key: word }).subscribe(res => {
                this.goodes = res;
            });
            return null;
        }));
    }

    onSearch(term: string) {
        this.value = term;
        this.commonService.search(this.value);
    }

    onCancel() {
        console.log('onCancel');
    }

    onClear() {
        console.log('onCancel');
    }

    onSubmit(value: string) {
        console.log('onSubmit', value);
    }
} 
