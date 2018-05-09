import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

import { ScanComponent } from './scan.component';

import { ShopService } from '../../../services';

// region: components

const COMPONENTS = [ScanComponent];

const routes: Routes = [
    { path: 'scan', component: ScanComponent },
    { path: 'scan/:openId/:tenantId', component: ScanComponent }
];
// endregion

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
    providers: [
        ShopService
    ]
})
export class ScanModule {

}
