import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index.component';
//权限判断
import { AppRouteGuard } from '../shared/auth/auth-route-guard';

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    HomeRoutingModule
  ],
  declarations: [IndexComponent],
  providers: [ AppRouteGuard ]
})
export class HomeModule { }
