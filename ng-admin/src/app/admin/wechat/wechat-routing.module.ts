
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { AuthSettingComponent } from "./auth-setting/auth-setting.component";
import { MessagesComponent } from "./messages/messages.component";
import { CustomizeMenuComponent } from "./customize-menu/customize-menu.component";
import { WechatMassComponent } from "./wechat-mass/wechat-mass.component";
import { MaterialManagementComponent } from "./material-management/material-management.component";
import { PhotoWarehouseComponent } from "./photo-warehouse/photo-warehouse.component";

const routes: Routes = [
  { path: '', redirectTo: 'authsetting', pathMatch: 'full' },
  { path: 'authsetting', component: AuthSettingComponent, data: { translate: 'authsetting', permission: 'Pages' }, canActivate: [AppRouteGuard] },
  { path: 'message', component: MessagesComponent, data: { translate: 'message', permission: 'Pages' }, canActivate: [AppRouteGuard] },
  // { path: 'wechat-user', component: WechatUserComponent, data: { translate: 'wechat-user', permission: 'Pages' }, canActivate: [AppRouteGuard] },
  { path: 'customize-menu', component: CustomizeMenuComponent, data: { translate: 'customize-menu', permission: 'Pages' }, canActivate: [AppRouteGuard] },
  { path: 'wechat-mass', component: WechatMassComponent, data: { translate: 'wechat-mass', permission: 'Pages' }, canActivate: [AppRouteGuard] },
  { path: 'material-management', component: MaterialManagementComponent, data: { translate: 'material-management', permission: 'Pages' }, canActivate: [AppRouteGuard] },
  { path: 'photo-warehouse', component: PhotoWarehouseComponent, data: { translate: 'photo-warehouse', permission: 'Pages' }, canActivate: [AppRouteGuard] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeChatRoutingModule { }