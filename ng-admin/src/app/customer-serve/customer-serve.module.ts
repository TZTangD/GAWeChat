import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";

import { CustomerServeRoutingModule } from "./customer-serve-routing.module";
import { SharedModule } from "@shared/shared.module";
import { LayoutModule } from "../layout/layout.module";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        CustomerServeRoutingModule
    ],
    declarations: [

    ],
    providers: [
        AppRouteGuard  
    ]

})
export class CustomerServeModule { }