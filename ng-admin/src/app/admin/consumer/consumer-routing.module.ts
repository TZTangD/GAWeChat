import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CommoditySearchComponent } from "./commodity-search/commodity-search.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { AdviseComponent } from "./advise/advise.component";
import { LayoutDefaultComponent } from "../../layout/default/default.component";

const routes: Routes = [
  { path: '', redirectTo: 'commodity-search', pathMatch: 'full' },
  { path: 'commodity-search', component: CommoditySearchComponent, data: { translate: 'commodity-search', permission: 'Pages' }, canActivate: [AppRouteGuard] },
  { path: 'advise', component: AdviseComponent, data: { translate: 'advise', permission: 'Pages' }, canActivate: [AppRouteGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerRoutingModule { }