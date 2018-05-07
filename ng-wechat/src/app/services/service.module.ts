import { NgModule } from '@angular/core';
import { HttpClient } from './httpclient';
import { WechatUserService, SettingsService, ShopService } from './index';

@NgModule({
    providers: [
        HttpClient,
        WechatUserService,
        SettingsService,
        ShopService
    ]
})
export class ServiceModule { }