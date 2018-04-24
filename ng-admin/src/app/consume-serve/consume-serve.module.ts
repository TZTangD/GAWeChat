import { NgModule } from "@angular/core";
import { ConsumeServeRoutingModule } from "./consume-serve-routing.module";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "../layout/layout.module";
import { FileUploadModule } from "ng2-file-upload";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        // FileUploadModule,
        SharedModule,
        LayoutModule,
        ConsumeServeRoutingModule
    ],
    declarations: [

    ],
    providers: [
        AppRouteGuard  
    ]

})
export class ConsumeServeModule { }