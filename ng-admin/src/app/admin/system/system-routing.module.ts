import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";
import { SysConfigComponent } from "./sys-config/sys-config.component";
import { DataDictionaryComponent } from "./data-dictionary/data-dictionary.component";

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'users', component: UsersComponent, data: { translate: 'users', permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
    { path: 'roles', component: RolesComponent, data: { translate: 'roles', permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
    { path: 'sys-config', component: SysConfigComponent, data: { translate: 'sys-config', permission: 'Pages' }, canActivate: [AppRouteGuard] },
    { path: 'data-dictionary', component: DataDictionaryComponent, data: { translate: 'data-dictionary', permission: 'Pages' }, canActivate: [AppRouteGuard] },
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SystemRoutingModule { }