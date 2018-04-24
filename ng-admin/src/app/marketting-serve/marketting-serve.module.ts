import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { MarkettingServeRoutingModule } from "./marketting-serve-routing.module";
import { SharedModule } from "@shared/shared.module";
import { LayoutModule } from "../layout/layout.module";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        MarkettingServeRoutingModule
    ],
    declarations: [

    ],
    providers: [
        AppRouteGuard  
    ]

})
export class MarkettingServeModule { }