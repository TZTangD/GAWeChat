import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

import { ScanComponent } from './scan.component';
import { ScanSuccessComponent } from './scan-success/scan-success.component';

import { ShopService, WechatUserService } from '../../../services';

// region: components

const COMPONENTS = [ScanComponent, ScanSuccessComponent];

const routes: Routes = [
    { path: 'scan', component: ScanComponent },
    { path: 'scan-success', component: ScanSuccessComponent },
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
        ShopService,
        WechatUserService
    ]
})
export class ScanModule {

}
