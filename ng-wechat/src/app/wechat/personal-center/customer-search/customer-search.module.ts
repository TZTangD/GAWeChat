// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { CustomerSearchComponent } from './customer-search.component';
import { RouterModule, Router, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { ComponentsModule } from '../../components/components.module';
import { CustomerService } from '../../../services';
const COMPONENTS = [CustomerSearchComponent];
const routes:Routes=[
    {path:'customer-search',component:CustomerSearchComponent}
]
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
        ...COMPONENTS
    ],
    providers:[
        CustomerService,
    ]
})
export class CustomerSearchModule {

}
