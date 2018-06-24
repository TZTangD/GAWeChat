import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

import { LotteryComponent } from './lottery.component';

// region: components

const COMPONENTS = [LotteryComponent];

const routes: Routes = [
    { path: 'lottery', component: LotteryComponent },
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
    ]
})
export class LotteryModule {

}
