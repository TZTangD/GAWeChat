// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ShopQrcodeComponent } from './shop-qrcode.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../../components/components.module';

const COMPONENTS =[ShopQrcodeComponent];
const routes: Routes =[
    {path:'shop-qrcode',component:ShopQrcodeComponent}
]
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
        ...COMPONENTS
    ],
    providers:[
        ...COMPONENTS
    ]
})
export class ShopQrcodeModule {

}
