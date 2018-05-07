import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

import { AdminRoutingModule } from './admin-routing.module';
import { TenantComponent } from './tenant/tenant.component';
import { CreateTenantComponent } from './tenant/create-tenant/create-tenant.component';
import { EditTenantComponent } from './tenant/edit-tenant/edit-tenant.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';


//权限判断

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    SharedModule,
    LayoutModule,
    AdminRoutingModule
  ],
  declarations: [ 
    
    TenantComponent,
    CreateTenantComponent,
    EditTenantComponent,
   ],
   providers: [ AppRouteGuard ]
})
export class AdminModule { }
