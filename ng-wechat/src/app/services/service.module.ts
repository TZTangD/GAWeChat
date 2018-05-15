import { NgModule } from '@angular/core';
import { HttpClient } from './httpclient';
import { WechatUserService, SettingsService, ShopService, FeedBackService } from './index';

@NgModule({
    providers: [
        HttpClient,
        WechatUserService,
        SettingsService,
        ShopService,
        FeedBackService,
    ]
})
export class ServiceModule { }