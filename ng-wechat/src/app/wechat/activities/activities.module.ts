import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { ArticleComponent } from './activity/activity.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ArticleService } from '../../services';
import { ActivityDetailComponent } from './activity/activity-detail/activity-detail.component';
// region: components

const COMPONENTS = [ArticleComponent, ActivityDetailComponent];

const routes: Routes = [
    { path: '', redirectTo: 'activity' },
    { path: 'activity', component: ArticleComponent },
    { path: 'activity-detail', component: ActivityDetailComponent }
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
        ArticleService
    ]
})
export class ActivitiesModule {

}
