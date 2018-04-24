
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutDefaultComponent } from "../layout/default/default.component";

const routes: Routes = [{
    path: '',
    component: LayoutDefaultComponent,
    children: [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        // { path: 'index', component: IndexComponent, data: { translate: 'index' }, canActivate: [AppRouteGuard] },
    ]
  }];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class WeChatManageRoutingModule { }