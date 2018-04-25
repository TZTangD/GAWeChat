import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'consumer', pathMatch: 'full' },
      { path: 'consumer', loadChildren: './consumer/consumer.module#ConsumerModule' },
      { path: 'customer', loadChildren: './customer/customer.module#CustomerModule' },
      { path: 'marketting', loadChildren: './marketting/marketting.module#MarkettingModule' },
      { path: 'member', loadChildren: './member/member.module#MemberModule' },
      { path: 'wechat', loadChildren: './wechat/wechat.module#WeChatModule' },
      { path: 'system', loadChildren: './system/system.module#SystemModule' },
      
      /*{ path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent, data: { translate: 'users', permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
      { path: 'roles', component: RolesComponent, data: { translate: 'roles', permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
      { path: 'tenant', component: TenantComponent, data: { translate: 'tenant', permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
      { path: 'authsetting', component: AuthSettingComponent, data: { translate: 'authsetting', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'message', component: MessagesComponent, data: { translate: 'message', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'employee', component: EmployeesComponent, data: { translate: 'employee', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'activity', component: ActivityComponent, data: { translate: 'activity', permission: 'Pages' ,title:'新增活动'}, canActivate: [AppRouteGuard] },
      { path: 'activity-form', component: ActivityFormComponent, data: { translate: 'activity-form', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'activity-form-detail/:id', component: ActivityFormDetailComponent, data: { translate: 'activity-form-detail', permission: 'Pages', title: '申请单明细' }, canActivate: [AppRouteGuard] },
      { path: 'activity-list', component: ActivityListComponent, data: { translate: 'activity-list', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'activity/:id', component: ActivityComponent, data: { translate: 'activity', permission: 'Pages' ,title:'活动详情'}, canActivate: [AppRouteGuard] },
      { path: 'retail-customer', component: RetailCustomerComponent, data: { translate: 'retail-customer', permission: 'Pages'}, canActivate: [AppRouteGuard] },
      { path: 'wechat-user', component: WechatUserComponent, data: { translate: 'wechat-user', permission: 'Pages'}, canActivate: [AppRouteGuard] },
      { path: 'retail-detail', component: RetailCustomerDetailComponent, data: { translate: 'retail-detail', permission: 'Pages',title:'新增零售用户'}, canActivate: [AppRouteGuard] },
      { path: 'retail-detail/:id', component: RetailCustomerDetailComponent, data: { translate: 'retail-detail', permission: 'Pages',title:'零售户详情'}, canActivate: [AppRouteGuard] },
      { path: 'user-question', component: UserQuestionComponent, data: { translate: 'user-question', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'user-question-detail/:id', component: UserAnswerComponent, data: { translate: 'user-question-detail', permission: 'Pages',title:'问卷调查详细'}, canActivate: [AppRouteGuard] },
      { path: 'advise', component: AdviseComponent, data: { translate: 'advise', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'activity-query', component: ActivityViewComponent, data: { translate: 'activity-query', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'post-query', component: PostInfoComponent, data: { translate: 'post-query', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'sys-config', component: SysConfigComponent, data: { translate: 'sys-config', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'data-dictionary', component: DataDictionaryComponent, data: { translate: 'data-dictionary', permission: 'Pages' }, canActivate: [AppRouteGuard] },*/
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
