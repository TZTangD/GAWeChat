import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { PageComponent } from './page/page.component';
import { PhoneFormatPipe } from './phone-format/phone-format.pipe';
import { HostUrlPipe } from './host-url/host-url.pipe';

const COMPONENTS = [ PageComponent, PhoneFormatPipe, HostUrlPipe];

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
