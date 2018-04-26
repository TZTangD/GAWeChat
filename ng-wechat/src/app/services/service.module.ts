import { NgModule } from '@angular/core';
import { HttpClient } from './httpclient';
import { WechatUserService, SettingsService } from './index';

@NgModule({
    providers: [
        HttpClient,
        WechatUserService,
        SettingsService
    ]
})
export class ServiceModule { }