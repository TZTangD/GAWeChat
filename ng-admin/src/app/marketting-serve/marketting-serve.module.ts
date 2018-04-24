import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { MarkettingServeRoutingModule } from "./marketting-serve-routing.module";

@NgModule({
    imports: [
        MarkettingServeRoutingModule
    ],
    declarations: [

    ],
    providers: [
        AppRouteGuard  
    ]

})
export class MarkettingServeModule { }