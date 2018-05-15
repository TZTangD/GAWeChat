// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { IntegralComponent } from './integral.component';
import { SharedModule } from '../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { IntegralDetailService } from '../../../services';

const COMPONENTS = [IntegralComponent];

const routes: Routes = [
    { path: '', redirectTo: 'integral' },
    { path: 'integral', component: IntegralComponent },
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
    exports: [
        IntegralComponent,
    ],
    providers: [
        IntegralDetailService
    ]
})
export class IntegralModule {

}
