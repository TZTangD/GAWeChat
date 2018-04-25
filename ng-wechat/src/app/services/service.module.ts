import { NgModule } from '@angular/core';
import { HttpClient } from './httpclient';
import { WechatUserService } from './index';

@NgModule({
    providers: [
        HttpClient,
        WechatUserService
    ]
})
export class ServiceModule { }