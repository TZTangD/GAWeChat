import {ShareComponent} from './share.component';
import {RouterModule, Routes} from '@angular/router';
import {AngularSplitModule} from 'angular-split';
import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {ComponentsModule} from '../../components/components.module';
import {ShareDetailComponent} from './share-details/share-details.component';
import {ArticleService} from '../../../services';
import {ShareWriteComponent} from './share-write/share-write.component';
import {ShareSuccessComponent} from './share-success/share-success.component';

const COMPONENTS = [ShareComponent, ShareDetailComponent, ShareWriteComponent,ShareSuccessComponent];

const routes: Routes = [
    {path: '', redirectTo: 'share'},
    {path: 'share', component: ShareComponent},
    {path: 'share-details', component: ShareDetailComponent},
    {path: 'share-write', component: ShareWriteComponent},
    {path: 'share-success', component: ShareSuccessComponent}
];

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
        // ShareService
        ArticleService
    ]
})
export class ShareModule {

}
