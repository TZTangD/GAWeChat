import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { Observable } from 'rxjs';

@Component({
    selector: 'wechat-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoodsComponent extends AppComponentBase implements OnInit {

    items: Observable<string[]>;
    value: string;

    constructor(injector: Injector) {
        super(injector);
    }

    onSearch(term: string) {
        this.value = term;
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

    ngOnInit() {
       
    }
} 
