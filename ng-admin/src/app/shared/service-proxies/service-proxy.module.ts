import { NgModule } from '@angular/core';

import * as ApiServiceProxies from './service-proxies';
import * as MarketingServiceProxies from './marketing-service/employee-service';
import { ActivityFormServiceProxy } from './marketing-service/activity-form-service';
import { ActivityServiceProxy } from '@shared/service-proxies/marketing-service/acticity-service';
import { ActivityGoodsServiceProxy } from '@shared/service-proxies/marketing-service/activity-goods-service';
import { ActivityBanquetServiceProxy, ActivityDeliveryInfoServiceProxy, UserAnswerService, UserQuestionService } from '@shared/service-proxies/marketing-service';
import { RetailCustomerServiceProxy } from '@shared/service-proxies/customer-service/retail-cunstomer-service';
import { WechatUserServiceProxy } from '@shared/service-proxies/wechat-manager/wechat-user-service';
import { AdviseService } from '@shared/service-proxies/consumer-service';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.DriverServiceProxy,
        ApiServiceProxies.AuthSettingServiceProxy,
        ApiServiceProxies.MessageServiceProxy,
        ApiServiceProxies.SubscribeServiceProxy,
        MarketingServiceProxies.EmployeeServiceProxy,
        ApiServiceProxies.EmployeesServiceProxy,
        ActivityServiceProxy,
        ApiServiceProxies.ActivityServiceProxy,
        ActivityFormServiceProxy,
        ActivityGoodsServiceProxy,
        ActivityBanquetServiceProxy,
        ActivityDeliveryInfoServiceProxy,
        RetailCustomerServiceProxy,
        WechatUserServiceProxy,
        UserQuestionService,
        UserAnswerService,
        AdviseService
    ]
})
export class ServiceProxyModule { }