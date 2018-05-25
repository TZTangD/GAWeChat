import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../../components/app-component-base';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'feedback-success',
    templateUrl: 'feedback-success.component.html',
    styleUrls: ['feedback-success.component.scss']
})
export class FeedbackSuccessComponent extends AppComponentBase implements OnInit {
    successType = '';
    constructor(injector: Injector, private router: Router, private route: ActivatedRoute) {
        super(injector);
        this.successType = this.route.snapshot.params['successType'];
    }

    result: any;
    ngOnInit(): void {
    }
}
