// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { GoodSourceComponent } from './good-source.component';
import { SharedModule } from '../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { GoodSourceService } from '../../../services/personal-center/good-source.service';
const COMPONENTS = [GoodSourceComponent];
const routes:Routes=[
    {path:'good-source',component:GoodSourceComponent}
]
@NgModule({
    imports: [
        SharedModule,
        AngularSplitModule,
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        ...COMPONENTS,
    ],
    providers:[
        GoodSourceService,
    ]
})
export class GoodSourceModule {

}
