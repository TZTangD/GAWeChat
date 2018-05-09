import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../wechat/components/components.module';
import { HomeComponent } from './home/home.component';
import { routes } from './wechat.route';

import { SettingsService, HttpClient, WechatUserService } from '../services';

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
        HttpClient,
        SettingsService,
        WechatUserService
    ],
    entryComponents: [
    ],
    exports: [
        RouterModule
    ]
})
export class WechatModule {
}
