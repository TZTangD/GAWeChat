import { NgModule } from '@angular/core';
import { HttpClient } from './httpclient';
import { WechatUserService, SettingsService, ShopService, ArticleService } from './index';

@NgModule({
    providers: [
        HttpClient,
        WechatUserService,
        SettingsService,
        ShopService,
        ArticleService,
    ]
})
export class ServiceModule { }