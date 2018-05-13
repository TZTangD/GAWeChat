import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

import { NearbyShopComponent } from './nearby-shop.component';
import { ShopService } from '../../../services';

// region: components

const COMPONENTS = [NearbyShopComponent];

const routes: Routes = [
    { path: 'nearby', component: NearbyShopComponent },
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
export class NearbyShopModule {

}
