import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../../components/app-component-base';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'feedback-success',
    templateUrl: 'feedback-success.component.html',
    styleUrls: ['feedback-success.component.scss']
})
export class FeedbackSuccessComponent extends AppComponentBase implements OnInit {
    constructor(injector:Injector,private router:Router){
        super(injector);
    }
    ngOnInit(): void {
        
    }
}
