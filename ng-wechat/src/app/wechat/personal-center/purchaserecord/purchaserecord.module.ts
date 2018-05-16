// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { PurchaserecordComponent } from './purchaserecord.component';
import { SharedModule } from '../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { PurchaserecordService } from '../../../services';

const COMPONENTS = [PurchaserecordComponent];

const routes: Routes = [
    { path: '', redirectTo: 'purchaserecord' },
    { path: 'purchaserecord', component: PurchaserecordComponent },
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
        PurchaserecordComponent,
    ],
    providers: [
        PurchaserecordService
    ]
})
export class PurchaserecordModule {

}
