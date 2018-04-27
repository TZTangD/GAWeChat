import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { PersonalComponent } from './personal/personal.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { MemberCardComponent } from './member-card/member-card.component';
import { BindMemberComponent } from './bind-member/bind-member.component';
import { BindRetailerComponent } from './bind-retailer/bind-retailer.component';
import { ShopComponent } from './shop/shop.component';

// region: components

const COMPONENTS = [PersonalComponent, 
    MemberCardComponent, 
    BindMemberComponent,
    BindRetailerComponent,
    ShopComponent];

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
