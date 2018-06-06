import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";

import { SharedModule } from "@shared/shared.module";
import { MemberManagementComponent } from "./member-management/member-management.component";
import { IntegralSearchComponent } from "./integral-search/integral-search.component";
import { MemberSettingComponent } from "./member-setting/member-setting.component";
import { MemberRoutingModule } from "./member-routing.module";
import { LayoutModule } from "../../layout/layout.module";
import { IntegralSearchDetailComponent } from "./integral-search/integral-search-detail/integral-search-detail.component";
import { MessageEmployeeModalComponent } from "./member-setting/message-employee-modal/message-employee-modal.component";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        MemberRoutingModule,
    ],
    declarations: [
        MemberManagementComponent,
        IntegralSearchComponent,
        MemberSettingComponent,
        IntegralSearchDetailComponent,
        MessageEmployeeModalComponent,
    ],
    providers: [
        AppRouteGuard
    ]

})
export class MemberModule { }