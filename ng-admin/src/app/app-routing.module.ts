import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home/index', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule', //Lazy load account module
        data: { preload: true }
    },
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule', //Lazy load account module
        data: { preload: true }
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule', //Lazy load account module
        data: { preload: true }
    },
    {
        path: 'consume-serve',
        loadChildren: './consume-serve/consume-serve.module#ConsumeServeModule', //Lazy load account module
        data: { preload: true }
    },
    {
        path: 'customer-serve',
        loadChildren: './customer-serve/customer-serve.module#CustomerServeModule', //Lazy load account module
        data: { preload: true }
    },
    {
        path: 'marketting-serve',
        loadChildren: './marketting-serve/marketting-serve.module#MarkettingServeModule', //Lazy load account module
        data: { preload: true }
    },
    {
        path: 'member-manage',
        loadChildren: './member-manage/member-manage.module#MemberManageModule', //Lazy load account module
        data: { preload: true }
    },
    {
        path: 'wechat-manage',
        loadChildren: './wechat-manage/wechat-manage.module#WeChatManageModule', //Lazy load account module
        data: { preload: true }
    },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }