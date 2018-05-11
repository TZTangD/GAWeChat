import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

// region: components

const COMPONENTS = [];

const routes: Routes = [
    { path: 'members', loadChildren: './member-card/member-card.module#MemberCardModule'  },
    { path: 'personals', loadChildren: './personal/personal.module#PersonalModule' },
    { path: 'shops', loadChildren: './shop/shop.module#ShopModule' },
    { path: 'scans', loadChildren: './scan/scan.module#ScanModule' }
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
export class PersonalCenterModule {

}
