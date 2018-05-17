// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SharedModule } from '../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { ShopEvaluationService, PurchaserecordService } from '../../../services';
import { ShopEvaluationComponent } from './shopevaluation.component';

const COMPONENTS = [ShopEvaluationComponent];

const routes: Routes = [
    { path: '', redirectTo: 'shopevaluation' },
    { path: 'shopevaluation', component: ShopEvaluationComponent },
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
    ],

    providers: [
        ShopEvaluationService,
        PurchaserecordService
    ]
})
export class ShopEvaluationModule {

}
