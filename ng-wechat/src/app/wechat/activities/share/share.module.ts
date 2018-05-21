import {ShareComponent} from './share.component';
import {RouterModule, Routes} from '@angular/router';
import {AngularSplitModule} from 'angular-split';
import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {ComponentsModule} from '../../components/components.module';
import {ShareService} from '../../../services/share/share.services';

const COMPONENTS = [ShareComponent];

const routes: Routes = [
    { path: 'share', component: ShareComponent },
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
        ShareService
    ]
})
export class ShareModule {

}
