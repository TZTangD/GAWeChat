import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { MemberCardComponent } from './member-card.component';

import { WechatUserService } from '../../../services';

// region: components

const COMPONENTS = [MemberCardComponent];

const routes: Routes = [
    { path: 'member-card', component: MemberCardComponent },
    { path: 'member-card/:openId/:tenantId', component: MemberCardComponent }
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
export class MemberCardModule {

}
