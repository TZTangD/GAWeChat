import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";

import { SharedModule } from "@shared/shared.module";
import { RetailCustomerComponent } from "./retail-customer/retail-customer.component";
import { RetailCustomerDetailComponent } from "./retail-customer/retail-customer-detail/retail-customer-detail.component";
import { StoreManagementComponent } from "./store-management/store-management.component";
import { EmployeeModalComponent } from "./retail-customer/retail-customer-detail/employee-modal/employee-modal.component";
import { CommodityManagementComponent } from "./commodity-management/commodity-management.component";
import { SourceGoodsLevelComponent } from "./source-goods-level/source-goods-level.component";
import { AccountManagementComponent } from "./account-management/account-management.component";
import { LayoutModule } from "../../layout/layout.module";
import { CustomerRoutingModule } from "./customer-routing.module";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        CustomerRoutingModule
    ],
    declarations: [
        RetailCustomerComponent,
        RetailCustomerDetailComponent,
        EmployeeModalComponent,
        StoreManagementComponent,
        CommodityManagementComponent,
        SourceGoodsLevelComponent,
        AccountManagementComponent,
    ],
    providers: [
        AppRouteGuard  
    ]

})
export class CustomerModule { }