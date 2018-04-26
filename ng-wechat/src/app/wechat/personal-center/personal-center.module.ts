import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { PersonalComponent } from './personal/personal.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { MemberCardComponent } from './member-card/member-card.component';

// region: components

const COMPONENTS = [PersonalComponent, MemberCardComponent];

const routes: Routes = [
    { path: '', redirectTo: 'personal' },
    { path: 'personal', component: PersonalComponent },
    { path: 'personal/:openId/:tenantId', component: PersonalComponent },
    { path: 'member-card', component: MemberCardComponent },
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
