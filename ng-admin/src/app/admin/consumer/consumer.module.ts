import { NgModule } from "@angular/core";
import { ConsumerRoutingModule } from "./consumer-routing.module";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { CommonModule } from "@angular/common";
import { FileUploadModule } from "ng2-file-upload";
import { SharedModule } from "@shared/shared.module";
import { CommoditySearchComponent } from "./commodity-search/commodity-search.component";
import { AdviseComponent } from "./advise/advise.component";
import { LayoutModule } from "../../layout/layout.module";
import { AdviseDetailComponent } from "./advise/advise-detail/advise-detail.component";

@NgModule({
    imports: [
        CommonModule,
        // FileUploadModule,
        SharedModule,
        LayoutModule,
        ConsumerRoutingModule,
    ],
    declarations: [
        CommoditySearchComponent,
        AdviseComponent,
        AdviseDetailComponent,
    ],
    providers: [
        AppRouteGuard  
    ]

})
export class ConsumerModule { }