import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

import { GoodsComponent } from './goods.component';

// region: components

const COMPONENTS = [GoodsComponent];

const routes: Routes = [
    { path: 'goods', component: GoodsComponent },
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
        //ShopService
    ]
})
export class GoodsModule {

}
