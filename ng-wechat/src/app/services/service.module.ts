import { NgModule } from '@angular/core';
import { HttpClient } from './httpclient';
import { WechatUserService, SettingsService, ShopService, ArticleService, IntegralDetailService } from './index';

@NgModule({
    providers: [
        HttpClient,
        WechatUserService,
        SettingsService,
        ShopService,
        ArticleService,
        IntegralDetailService,
    ]
})
export class ServiceModule { }