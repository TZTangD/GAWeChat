import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutDefaultComponent } from "../layout/default/default.component";
import { CommoditySearchComponent } from "./commodity-search/commodity-search.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { AdviseComponent } from "./advise/advise.component";

const routes: Routes = [{
    path: '',
    component: LayoutDefaultComponent,
    children: [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'commodity-search', component: CommoditySearchComponent, data: { translate: 'commodity-search', permission: 'Pages' }, canActivate: [AppRouteGuard] },
        { path: 'advise', component: AdviseComponent, data: { translate: 'advise', permission: 'Pages' }, canActivate: [AppRouteGuard] },
        // { path: 'index', component: IndexComponent, data: { translate: 'index' }, canActivate: [AppRouteGuard] },
    ]
  }];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ConsumeServeRoutingModule { }