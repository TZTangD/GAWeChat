import { NgModule } from "@angular/core";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { SharedModule } from "@shared/shared.module";
import { EmployeesComponent } from "./employees/employees.component";
import { CreateEmployeeComponent } from "./employees/create-employee/create-employee.component";
import { EditEmployeeComponent } from "./employees/edit-employee/edit-employee.component";
import { ActivityComponent } from "./activity/activity.component";
import { ExperienceShareComponent } from "./experience-share/experience-share.component";
import { ContributeManagementComponent } from "./contribute-management/contribute-management.component";
import { MarkettingRoutingModule } from "./marketting-routing.module";
import { LayoutModule } from "../../layout/layout.module";
import { ActivityDetailComponent } from "./activity/activity-detail/activity-detail.component";
import { ExperienceDetailComponent } from "./experience-share/experience-detail/experience-detail.component";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        MarkettingRoutingModule
    ],
    declarations: [
        EmployeesComponent,
        CreateEmployeeComponent,
        EditEmployeeComponent,
        ActivityComponent,
        ActivityDetailComponent,
        ExperienceShareComponent,
        ExperienceDetailComponent,
        ContributeManagementComponent,
    ],
    providers: [
        AppRouteGuard  
    ]

})
export class MarkettingModule { }