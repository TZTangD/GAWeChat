import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { NearbyShopComponent } from './nearby-shop/nearby-shop.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

// region: components

const COMPONENTS = [ NearbyShopComponent ];

const routes: Routes = [
    { path: '', redirectTo: 'nearby-shop' },
    { path: 'nearby-shop', component: NearbyShopComponent },
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
    ]
})
export class BuyModule {

}
