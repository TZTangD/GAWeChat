import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { AuthSettingComponent } from "./auth-setting/auth-setting.component";
import { MessagesComponent } from "./messages/messages.component";
import { CreateMessageComponent } from "./messages/create-message/create-message.component";
import { EditMessageComponent } from "./messages/edit-message/edit-message.component";
import { CustomizeMenuComponent } from "./customize-menu/customize-menu.component";
import { WechatMassComponent } from "./wechat-mass/wechat-mass.component";
import { MaterialManagementComponent } from "./material-management/material-management.component";
import { PhotoWarehouseComponent } from "./photo-warehouse/photo-warehouse.component";
import { LayoutModule } from "../../layout/layout.module";
import { WeChatRoutingModule } from "./wechat-routing.module";
import { WechatGroupCreateComponent } from "./auth-setting/wechat-group-create/wechat-group-create.component";
import { WechatGroupEditComponent } from "./auth-setting/wechat-group-edit/wechat-group-edit.component";

@NgModule({
    imports: [
        SharedModule,
        LayoutModule,
        WeChatRoutingModule
    ],
    declarations: [
        AuthSettingComponent,
        MessagesComponent,
        CreateMessageComponent,
        EditMessageComponent,
        CustomizeMenuComponent,
        WechatMassComponent,
        MaterialManagementComponent,
        PhotoWarehouseComponent,
        WechatGroupCreateComponent,
        WechatGroupEditComponent,

    ],
    providers: [
        AppRouteGuard
    ]

})
export class WeChatModule { }