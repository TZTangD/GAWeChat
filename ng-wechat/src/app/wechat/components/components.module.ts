import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { PageComponent } from './page/page.component';
import { PhoneFormatPipe } from './phone-format/phone-format.pipe';
import { HostUrlPipe } from './host-url/host-url.pipe';
import { DefaultHeadImgPipe } from './pipe/default-headimg';

const COMPONENTS = [ PageComponent, PhoneFormatPipe, HostUrlPipe,DefaultHeadImgPipe];

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
