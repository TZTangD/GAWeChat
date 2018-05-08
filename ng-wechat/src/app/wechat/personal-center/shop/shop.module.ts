import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { ShopComponent } from './shop.component';
import { WaitAuditComponent } from './wait-audit/wait-audit.component';
import { ShopAddComponent } from './shop-add/shop-add.component';

import { ShopService } from '../../../services';

// region: components

const COMPONENTS = [ShopComponent,
    WaitAuditComponent,
    ShopAddComponent];

const routes: Routes = [
    { path: 'shop', component: ShopComponent },
    { path: 'shop/:openId/:tenantId', component: ShopComponent },
    { path: 'wait-audit', component: WaitAuditComponent },
    { path: 'shop-add', component: ShopAddComponent } 
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
export class ShopModule {

}
