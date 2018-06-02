// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ShopEmployeeComponent } from './shop-employee.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../components/components.module';
import { WechatUserService } from '../../../services';

const COMPONENTS = [ShopEmployeeComponent,];
const routes: Routes = [
    { path: 'shop-employee', component: ShopEmployeeComponent },
];
@NgModule({
    imports: [
        SharedModule,
        AngularSplitModule,
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        ...COMPONENTS,
    ],
    providers:[
        WechatUserService,
    ]
    
})
export class ShopEmployeeModule {

}
