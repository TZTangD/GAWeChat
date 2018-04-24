import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { NgModule } from "@angular/core";
import { WeChatManageRoutingModule } from "./wechat-manage-routing.module";

@NgModule({
    imports: [
        WeChatManageRoutingModule
    ],
    declarations: [

    ],
    providers: [
        AppRouteGuard  
    ]

})
export class WeChatManageModule { }