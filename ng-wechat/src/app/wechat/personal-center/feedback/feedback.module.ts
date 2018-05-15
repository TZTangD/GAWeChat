// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { FeedbackComponent } from './feedback.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../components/components.module';
import { FeedBackService } from '../../../services';
import { FeedbackSuccessComponent } from './feedback-success/feedback-success.component';
const COMPONENTS = [FeedbackComponent, FeedbackSuccessComponent];

const routes: Routes = [
    { path: 'feedback', component: FeedbackComponent },
    { path: 'feedback-success', component: FeedbackSuccessComponent },

]
@NgModule({
    imports: [
        SharedModule,
        AngularSplitModule,
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ...COMPONENTS
    ],
    // exports: [
    //     ...COMPONENTS
    // ],
    providers: [
        FeedBackService
    ]

})
export class FeedbackModule {

}
