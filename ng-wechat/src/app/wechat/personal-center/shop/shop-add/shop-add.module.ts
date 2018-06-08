import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../../../shared/shared.module';
import { ComponentsModule } from '../../../components/components.module';
import { ShopAddComponent } from './shop-add.component';
import { ImageCropperModule } from 'ngx-img-cropper';

import { ShopService } from '../../../../services';

// region: components

const COMPONENTS = [ShopAddComponent];

const routes: Routes = [
    { path: 'shop-add', component: ShopAddComponent } 
];
// endregion

@NgModule({
    imports: [
        SharedModule,
        ImageCropperModule,
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
export class ShopAddModule {

}
