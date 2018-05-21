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
    constructor(injector: Injector, private router: Router, private route: ActivatedRoute) {
        super(injector);
    }
    successType: string = this.route.snapshot.params['successType'];
    result: any;
    ngOnInit(): void {
        if (this.successType == 'evaluation') {
            this.successType = 'evaluation'
            this.result = ['apple'];
        } else {
            this.successType = 'feedback'
            this.result = ['apple', 'banana'];
        }
    }
}
