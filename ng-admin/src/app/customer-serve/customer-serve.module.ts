import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";

import { CustomerServeRoutingModule } from "./customer-serve-routing.module";

@NgModule({
    imports: [
        CustomerServeRoutingModule
    ],
    declarations: [

    ],
    providers: [
        AppRouteGuard  
    ]

})
export class CustomerServeModule { }