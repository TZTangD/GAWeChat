import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { PageComponent } from './page/page.component';

const COMPONENTS = [ PageComponent];

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: COMPONENTS,
    entryComponents: [
        PageComponent
    ],
    exports: COMPONENTS
})
export class ComponentsModule {}
