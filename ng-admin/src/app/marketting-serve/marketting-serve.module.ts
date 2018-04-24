import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { MarkettingServeRoutingModule } from "./marketting-serve-routing.module";
import { SharedModule } from "@shared/shared.module";
import { LayoutModule } from "../layout/layout.module";
import { EmployeesComponent } from "./employees/employees.component";
import { CreateEmployeeComponent } from "./employees/create-employee/create-employee.component";
import { EditEmployeeComponent } from "./employees/edit-employee/edit-employee.component";
import { ActivityComponent } from "./activity/activity.component";
import { ExperienceShareComponent } from "./experience-share/experience-share.component";
import { ContributeManagementComponent } from "./contribute-management/contribute-management.component";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        MarkettingServeRoutingModule
    ],
    declarations: [
        EmployeesComponent,
        CreateEmployeeComponent,
        EditEmployeeComponent,
        ActivityComponent,
        ExperienceShareComponent,
        ContributeManagementComponent,
    ],
    providers: [
        AppRouteGuard  
    ]

})
export class MarkettingServeModule { }