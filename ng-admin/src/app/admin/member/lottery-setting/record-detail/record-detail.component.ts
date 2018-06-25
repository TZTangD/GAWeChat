import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'record-detail',
    templateUrl: 'record-detail.component.html',
})
export class RecordDetailComponent extends AppComponentBase implements OnInit {
    id = '';
    constructor(injector: Injector, private Actrouter: ActivatedRoute) {
        super(injector);
        this.id = this.Actrouter.snapshot.params['id'];
    }
    ngOnInit(): void {
        this.getSingleRecord();
    }
    getSingleRecord() {

    }
}
