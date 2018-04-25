import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

import { AdminRoutingModule } from './admin-routing.module';
import { TenantComponent } from './tenant/tenant.component';
import { CreateTenantComponent } from './tenant/create-tenant/create-tenant.component';
import { EditTenantComponent } from './tenant/edit-tenant/edit-tenant.component';
import { AuthSettingComponent } from './weichat-setting/auth-setting/auth-setting.component';
import { MessagesComponent } from './weichat-setting/messages/messages.component';
import { EditMessageComponent } from './weichat-setting/messages/edit-message/edit-message.component';
import { CreateMessageComponent } from './weichat-setting/messages/create-message/create-message.component';
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
    AuthSettingComponent,
    MessagesComponent,
    EditMessageComponent,
    CreateMessageComponent,
   ],
   providers: [ AppRouteGuard ]
})
export class AdminModule { }
