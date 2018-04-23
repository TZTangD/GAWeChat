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
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }