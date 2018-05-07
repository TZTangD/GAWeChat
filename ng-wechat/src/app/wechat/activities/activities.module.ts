import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { ActivityComponent } from './activity/activity.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
// region: components

const COMPONENTS = [ ActivityComponent ];

const routes: Routes = [
    { path: '', redirectTo: 'activity' },
    { path: 'activity', component: ActivityComponent },
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
export class ActivitiesModule {

}
