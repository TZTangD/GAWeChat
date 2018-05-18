// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { AccountLevelComponent } from './account-level.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../components/components.module';
import { WechatUserService, CustomerService } from '../../../services';

const COMPONENTS=[
    AccountLevelComponent
];
 const routes:Routes=[
    {path:'account-level',component:AccountLevelComponent}

 ];
@NgModule({
    imports: [
        SharedModule,
        AngularSplitModule,
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ],
    providers:[
        WechatUserService,
        CustomerService,
    ]
})
export class AccountLevelModule {

}
