import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { LayoutModule } from "../../layout/layout.module";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { SystemRoutingModule } from "./system-routing.module";
import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";
import { SysConfigComponent } from "./sys-config/sys-config.component";
import { DataDictionaryComponent } from "./data-dictionary/data-dictionary.component";
import { EditUserComponent } from "./users/edit-user/edit-user.component";
import { CreateUserComponent } from "./users/create-user/create-user.component";
import { CreateRoleComponent } from "./roles/create-role/create-role.component";
import { EditRoleComponent } from "./roles/edit-role/edit-role.component";
import { EmployeeModalComponent } from "./users/employee-modal/employee-modal.component";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        SystemRoutingModule
    ],
    declarations: [
        UsersComponent,
        CreateUserComponent,
        EditUserComponent,
        EmployeeModalComponent,
        RolesComponent,
        CreateRoleComponent,
        EditRoleComponent,
        SysConfigComponent,
        DataDictionaryComponent,
    ],
    providers: [
        AppRouteGuard
    ]

})
export class SystemModule { }