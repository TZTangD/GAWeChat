import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { Observable } from 'rxjs';
import { TaobaoService } from '../../../example/searchbar/tb.service';

@Component({
    moduleId: module.id,
    selector: 'exhibition',
    templateUrl: 'exhibition.component.html',
    styleUrls: ['exhibition.component.scss']
})
export class ExhibitionComponent extends AppComponentBase implements OnInit {
    items: Observable<string[]>;
    value: string;
    constructor(injector: Injector
    ) {
        super(injector);
    }
    ngOnInit() {
    }
    onSearch(term: string) {
        this.value = term;
        // if (term) this.items = this.tbService.search(term);
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
