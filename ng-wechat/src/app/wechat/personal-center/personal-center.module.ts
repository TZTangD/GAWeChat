import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { PersonalComponent } from './personal/personal.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { MemberCardComponent } from './member-card/member-card.component';
import { BindMemberComponent } from './personal/bind-member/bind-member.component';
import { BindRetailerComponent } from './personal/bind-retailer/bind-retailer.component';
import { ShopComponent } from './shop/shop.component';
import { BindStaffComponent } from './personal/bind-staff/bind-staff.component';
import { WaitAuditComponent } from './shop/wait-audit/wait-audit.component';
import { ShopAddComponent } from './shop/shop-add/shop-add.component';
import { ScanComponent } from './scan/scan.component';

// region: components

const COMPONENTS = [PersonalComponent, 
    MemberCardComponent, 
    BindMemberComponent,
    BindRetailerComponent,
    ShopComponent,
    BindStaffComponent,
    WaitAuditComponent,
    ShopAddComponent,
    ScanComponent];

const routes: Routes = [
    { path: '', redirectTo: 'personal' },
    { path: 'personal', component: PersonalComponent },
    { path: 'personal/:openId/:tenantId', component: PersonalComponent },
    { path: 'member-card', component: MemberCardComponent },
    { path: 'member-card/:openId/:tenantId', component: MemberCardComponent },
    { path: 'bind-member', component: BindMemberComponent },
    { path: 'bind-retailer', component: BindRetailerComponent },
    { path: 'bind-retailer/:openId/:tenantId', component: BindRetailerComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'shop/:openId/:tenantId', component: ShopComponent },
    { path: 'bind-staff', component: BindStaffComponent },
    { path: 'wait-audit', component: WaitAuditComponent },
    { path: 'shop-add', component: ShopAddComponent },
    { path: 'scan', component: ScanComponent },
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
export class PersonalCenterModule {

}
