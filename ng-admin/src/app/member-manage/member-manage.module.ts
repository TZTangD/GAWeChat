import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";

import { MemberManageRoutingModule } from "./member-manage-routing.module";
import { SharedModule } from "@shared/shared.module";
import { LayoutModule } from "../layout/layout.module";
import { MemberManagementComponent } from "./member-management/member-management.component";
import { IntegralSearchComponent } from "./integral-search/integral-search.component";
import { MemberSettingComponent } from "./member-setting/member-setting.component";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        MemberManageRoutingModule
    ],
    declarations: [
        MemberManagementComponent,
        IntegralSearchComponent,
        MemberSettingComponent,
    ],
    providers: [
        AppRouteGuard  
    ]

})
export class MemberManageModule { }