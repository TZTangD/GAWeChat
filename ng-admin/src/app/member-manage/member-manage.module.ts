import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";

import { MemberManageRoutingModule } from "./member-manage-routing.module";
import { SharedModule } from "@shared/shared.module";
import { LayoutModule } from "../layout/layout.module";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        MemberManageRoutingModule
    ],
    declarations: [

    ],
    providers: [
        AppRouteGuard  
    ]

})
export class MemberManageModule { }