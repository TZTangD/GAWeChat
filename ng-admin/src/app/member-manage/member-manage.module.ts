import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";

import { MemberManageRoutingModule } from "./member-manage-routing.module";

@NgModule({
    imports: [
        MemberManageRoutingModule
    ],
    declarations: [

    ],
    providers: [
        AppRouteGuard  
    ]

})
export class MemberManageModule { }