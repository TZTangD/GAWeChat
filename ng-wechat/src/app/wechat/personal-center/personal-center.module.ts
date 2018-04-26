import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { PersonalComponent } from './personal/personal.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { MemberCardComponent } from './member-card/member-card.component';
import { BindMemberComponent } from './bind-member/bind-member.component';

// region: components

const COMPONENTS = [PersonalComponent, 
    MemberCardComponent, 
    BindMemberComponent];

const routes: Routes = [
    { path: '', redirectTo: 'personal' },
    { path: 'personal', component: PersonalComponent },
    { path: 'personal/:openId/:tenantId', component: PersonalComponent },
    { path: 'member-card', component: MemberCardComponent },
    { path: 'bind-member', component: BindMemberComponent },
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
