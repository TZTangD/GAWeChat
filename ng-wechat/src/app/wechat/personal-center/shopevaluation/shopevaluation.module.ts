// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SharedModule } from '../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { ShopEvaluationService, PurchaserecordService } from '../../../services';
import { ShopEvaluationComponent } from './shopevaluation.component';
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';

const COMPONENTS = [ShopEvaluationComponent, EvaluationDetailComponent];

const routes: Routes = [
    { path: '', redirectTo: 'shopevaluation' },
    { path: 'shopevaluation', component: ShopEvaluationComponent },
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
        ShopEvaluationComponent,
        EvaluationDetailComponent
    ],

    providers: [
        ShopEvaluationService,
        PurchaserecordService
    ]
})
export class ShopEvaluationModule {

}
