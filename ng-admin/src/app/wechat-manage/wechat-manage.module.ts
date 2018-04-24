import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { NgModule } from "@angular/core";
import { WeChatManageRoutingModule } from "./wechat-manage-routing.module";
import { SharedModule } from "@shared/shared.module";
import { LayoutModule } from "../layout/layout.module";
import { AuthSettingComponent } from "./auth-setting/auth-setting.component";
import { MessagesComponent } from "./messages/messages.component";
import { CreateMessageComponent } from "./messages/create-message/create-message.component";
import { EditMessageComponent } from "./messages/edit-message/edit-message.component";
import { WechatUserComponent } from "./wechat-user/wechat-user.component";
import { CustomizeMenuComponent } from "./customize-menu/customize-menu.component";
import { WechatMassComponent } from "./wechat-mass/wechat-mass.component";
import { MaterialManagementComponent } from "./material-management/material-management.component";
import { PhotoWarehouseComponent } from "./photo-warehouse/photo-warehouse.component";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        WeChatManageRoutingModule
    ],
    declarations: [
        AuthSettingComponent,
        MessagesComponent,
        CreateMessageComponent,
        EditMessageComponent,
        WechatUserComponent,
        CustomizeMenuComponent,
        WechatMassComponent,
        MaterialManagementComponent,
        PhotoWarehouseComponent

    ],
    providers: [
        AppRouteGuard
    ]

})
export class WeChatManageModule { }