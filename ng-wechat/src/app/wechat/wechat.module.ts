import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ComponentsModule } from '../wechat/components/components.module';

import { HomeComponent } from './home/home.component';

import { routes } from './wechat.route';

@NgModule({
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forRoot(routes, { useHash: true })
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
    ],
    entryComponents: [
    ],
    exports: [
        RouterModule
    ]
})
export class WechatModule {
}
