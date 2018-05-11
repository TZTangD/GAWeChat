import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { PersonalComponent } from './personal.component';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { BindMemberComponent } from './bind-member/bind-member.component';
import { BindRetailerComponent } from './bind-retailer/bind-retailer.component';
import { BindStaffComponent } from './bind-staff/bind-staff.component';
import { WechatUserService } from '../../../services';

// region: components

const COMPONENTS = [PersonalComponent,
    BindMemberComponent,
    BindRetailerComponent,
    BindStaffComponent];

const routes: Routes = [
    { path: 'personal', component: PersonalComponent },
    { path: 'bind-member', component: BindMemberComponent },
    { path: 'bind-retailer', component: BindRetailerComponent },
    { path: 'bind-staff', component: BindStaffComponent }
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
        WechatUserService
    ]
})
export class PersonalModule {

}
