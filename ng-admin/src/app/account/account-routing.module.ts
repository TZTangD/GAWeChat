import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account.component';

const routes: Routes = [{
  path: '',
  component: AccountComponent,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'login/:id', component: LoginComponent }
    //{ path: 'register', component: RegisterComponent }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
