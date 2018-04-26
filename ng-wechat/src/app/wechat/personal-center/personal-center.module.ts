import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { PersonalComponent } from './personal/personal.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

// region: components

const COMPONENTS = [PersonalComponent];

const routes: Routes = [
    { path: '', redirectTo: 'personal' },
    { path: 'personal', component: PersonalComponent },
    { path: 'personal/:openId/:tenantId', component: PersonalComponent },
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
