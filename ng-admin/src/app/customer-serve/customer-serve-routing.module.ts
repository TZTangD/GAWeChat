import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutDefaultComponent } from "../layout/default/default.component";
import { RetailCustomerComponent } from "./retail-customer/retail-customer.component";
import { RetailCustomerDetailComponent } from "./retail-customer/retail-customer-detail/retail-customer-detail.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { StoreManagementComponent } from "./store-management/store-management.component";
import { CommodityManagementComponent } from "./commodity-management/commodity-management.component";
import { SourceGoodsLevelComponent } from "./source-goods-level/source-goods-level.component";
import { AccountManagementComponent } from "./account-management/account-management.component";

const routes: Routes = [{
    path: '',
    component: LayoutDefaultComponent,
    children: [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'retail-customer', component: RetailCustomerComponent, data: { translate: 'retail-customer', permission: 'Pages'}, canActivate: [AppRouteGuard] },
        { path: 'retail-detail', component: RetailCustomerDetailComponent, data: { translate: 'retail-detail', permission: 'Pages',title:'新增零售用户'}, canActivate: [AppRouteGuard] },
        { path: 'retail-detail/:id', component: RetailCustomerDetailComponent, data: { translate: 'retail-detail', permission: 'Pages',title:'零售户详情'}, canActivate: [AppRouteGuard] },
        { path: 'store-management', component: StoreManagementComponent, data: { translate: 'store-management', permission: 'Pages'}, canActivate: [AppRouteGuard] },
        { path: 'commodity-management', component: CommodityManagementComponent, data: { translate: 'commodity-management', permission: 'Pages'}, canActivate: [AppRouteGuard] },
        { path: 'source-goods-level', component: SourceGoodsLevelComponent, data: { translate: 'source-goods-level', permission: 'Pages'}, canActivate: [AppRouteGuard] },
        { path: 'account-management', component: AccountManagementComponent, data: { translate: 'account-management', permission: 'Pages'}, canActivate: [AppRouteGuard] },
        
    ]
  }];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CustomerServeRoutingModule { }