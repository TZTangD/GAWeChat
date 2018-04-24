import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutDefaultComponent } from "../layout/default/default.component";
import { MemberManagementComponent } from "./member-management/member-management.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { IntegralSearchComponent } from "./integral-search/integral-search.component";
import { MemberSettingComponent } from "./member-setting/member-setting.component";

const routes: Routes = [{
    path: '',
    component: LayoutDefaultComponent,
    children: [
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'member-management', component: MemberManagementComponent, data: { translate: 'member-management', permission: 'Pages' }, canActivate: [AppRouteGuard] },
        { path: 'integral-search', component: IntegralSearchComponent, data: { translate: 'integral-search', permission: 'Pages' }, canActivate: [AppRouteGuard] },
        { path: 'member-setting', component: MemberSettingComponent, data: { translate: 'member-setting', permission: 'Pages' }, canActivate: [AppRouteGuard] },
        
    ]
  }];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MemberManageRoutingModule { }