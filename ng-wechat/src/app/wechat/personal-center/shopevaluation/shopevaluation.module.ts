// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SharedModule } from '../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { ShopEvaluationService, PurchaserecordService } from '../../../services';
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';

const COMPONENTS = [EvaluationDetailComponent];

const routes: Routes = [
    { path: '', redirectTo: 'shopevaluation' },
    { path: 'evaluation-detail', component: EvaluationDetailComponent },
];

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
    exports: [
        EvaluationDetailComponent
    ],

    providers: [
        ShopEvaluationService,
        PurchaserecordService
    ]
})
export class ShopEvaluationModule {

}
